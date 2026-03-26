import { NextRequest, NextResponse } from 'next/server';
import { createAgentSession, deleteAgentSession } from '@/lib/salesforce';

export async function POST() {
  try {
    const sessionId = await createAgentSession();
    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('[agent/session POST] Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (sessionId) {
      await deleteAgentSession(sessionId);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[agent/session DELETE]', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
