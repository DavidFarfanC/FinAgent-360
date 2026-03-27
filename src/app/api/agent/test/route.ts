export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

const INSTANCE_URL = process.env.SALESFORCE_INSTANCE_URL!
const CLIENT_ID = process.env.SALESFORCE_CLIENT_ID!
const CLIENT_SECRET = process.env.SALESFORCE_CLIENT_SECRET!

async function getToken() {
  const res = await fetch(`${INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  })
  const text = await res.text()
  try {
    const data = JSON.parse(text)
    return data.access_token as string
  } catch {
    throw new Error(`Token parse failed: ${text.substring(0, 200)}`)
  }
}

export async function GET() {
  const token = await getToken()
  const body = JSON.stringify({
    externalSessionKey: `test-${Date.now()}`,
    instanceConfig: { endpoint: INSTANCE_URL },
  })
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const tests = [
    '0Xxaj0000023ChqCAE', // Coral Cloud Agent
    '0Xxaj0000023ChrCAE', // Coral Cloud Experience Agent
    '0Xxaj0000027lqfCAA', // CC Service Agent
    '0Xxaj000002ErzNCAS', // Nexo
  ]

  const results = await Promise.all(tests.map(async (agentId) => {
    const url = `${INSTANCE_URL}/einstein/ai-assist/v1/agents/${agentId}/sessions`
    try {
      const res = await fetch(url, { method: 'POST', headers, body })
      const text = await res.text()
      return { agentId, status: res.status, body: text.substring(0, 500) }
    } catch (e: unknown) {
      return { agentId, status: 'error', body: e instanceof Error ? e.message : String(e) }
    }
  }))

  return NextResponse.json({ token_ok: !!token, results })
}
