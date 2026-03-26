import { NextRequest, NextResponse } from 'next/server';
import { getSalesforceToken } from '@/lib/salesforce';

interface LogPayload {
  sessionId: string;
  action: string;
  userId?: string;
  details?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, action, userId, details }: LogPayload = await req.json();

    const token = await getSalesforceToken();
    const instanceUrl = process.env.SALESFORCE_INSTANCE_URL!;

    const res = await fetch(
      `${instanceUrl}/services/data/v59.0/sobjects/AgentLog__c/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SessionId__c: sessionId,
          Action__c: action,
          UserId__c: userId ?? 'anonymous',
          Details__c: details ?? '',
          Timestamp__c: new Date().toISOString(),
        }),
      }
    );

    if (!res.ok) {
      // Si el objeto custom no existe en Salesforce, solo lo logueamos
      const err = await res.text();
      console.warn('[agent/log] AgentLog__c no disponible:', err);
      return NextResponse.json({ ok: false, warning: 'AgentLog__c not found' });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error('[agent/log POST]', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
