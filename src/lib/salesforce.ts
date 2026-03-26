import { randomUUID } from 'crypto';

const INSTANCE_URL = process.env.SALESFORCE_INSTANCE_URL!;
const CLIENT_ID = process.env.SALESFORCE_CLIENT_ID!;
const CLIENT_SECRET = process.env.SALESFORCE_CLIENT_SECRET!;
const AGENT_ID = process.env.AGENTFORCE_AGENT_ID!;
const RUNTIME_BASE_URL = process.env.SALESFORCE_RUNTIME_BASE_URL!;

// ── Token cache ───────────────────────────────────────────────────────────────
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

export async function getSalesforceToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const res = await fetch(`${INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  console.log('[SF Token] status:', res.status);
  const responseText = await res.text();
  console.log('[SF Token] response:', responseText);

  if (!res.ok) {
    throw new Error(`Salesforce OAuth failed: ${responseText}`);
  }

  const data = JSON.parse(responseText);
  cachedToken = data.access_token as string;
  tokenExpiresAt = Date.now() + 55 * 60 * 1000; // 55 minutos
  return cachedToken;
}

// ── Session management ────────────────────────────────────────────────────────
export async function createAgentSession(): Promise<string> {
  const token = await getSalesforceToken();

  const url = `${RUNTIME_BASE_URL}/einstein/ai-agent/v1/agents/${AGENT_ID}/sessions`;
  console.log('[SF Session] URL llamada:', url);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      externalSessionKey: randomUUID(),
      bypassUser: true,
    }),
  });

  console.log('[SF Session] status:', res.status);
  const sessionText = await res.text();
  console.log('[SF Session] response:', sessionText);

  if (!res.ok) {
    throw new Error(`createAgentSession failed: ${sessionText}`);
  }

  const data = JSON.parse(sessionText);
  console.log('[SF Session] FULL response:', JSON.stringify(data, null, 2));
  return (
    data.sessionId ||
    data.id ||
    data.sessionKey ||
    data.conversationId ||
    data.botSessionId ||
    JSON.stringify(data)
  ) as string;
}

export async function deleteAgentSession(sessionId: string): Promise<void> {
  const token = await getSalesforceToken();

  await fetch(
    `${RUNTIME_BASE_URL}/einstein/ai-agent/v1/sessions/${sessionId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

// ── Messaging ─────────────────────────────────────────────────────────────────
let messageSequenceId = 1;

export async function sendAgentMessage(
  sessionId: string,
  message: string
): Promise<string> {
  const token = await getSalesforceToken();

  const res = await fetch(
    `${RUNTIME_BASE_URL}/einstein/ai-agent/v1/sessions/${sessionId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          sequenceId: messageSequenceId++,
          type: 'Text',
          text: message,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`sendAgentMessage failed: ${err}`);
  }

  const data = await res.json();
  console.log('[SF Message] FULL response:', JSON.stringify(data, null, 2));

  const text =
    data.messages?.[0]?.message?.content?.[0]?.text ||
    data.messages?.[0]?.content ||
    data.messages?.[0]?.text ||
    data.response ||
    data.output ||
    data.text ||
    JSON.stringify(data);
  return text as string;
}
