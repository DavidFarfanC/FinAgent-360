import { NextRequest, NextResponse } from 'next/server';
import { sendAgentMessage } from '@/lib/salesforce';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'sessionId y message son requeridos.' },
        { status: 400 }
      );
    }

    const reply = await sendAgentMessage(sessionId, message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('[agent/message POST]', error);
    return NextResponse.json(
      { error: 'Error al procesar el mensaje con el agente.' },
      { status: 500 }
    );
  }
}
