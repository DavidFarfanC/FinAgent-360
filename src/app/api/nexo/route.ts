import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres Nexo, ejecutivo bancario virtual de BreBank. \
Eres profesional, amable y muy conocedor del banco.

Puedes responder preguntas sobre:
- Políticas de seguridad de BreBank (bloqueo de tarjetas en menos de 2 minutos, sin costo)
- Requisitos para productos financieros (tarjeta de crédito: 3 meses de historial, ingresos mínimos $8,000 MXN)
- Tiempos de entrega de tarjetas (5–7 días hábiles a domicilio, sin costo de envío)
- Política de bloqueos (temporal o definitivo, sin penalización)
- Devoluciones y cargos no reconocidos (resolución en 72 horas hábiles)
- Estados de cuenta (disponibles desde los últimos 12 meses en la app)

Si no conoces un detalle, invéntate uno específico y realista de BreBank.
Habla siempre en español, de forma concisa: máximo 3 oraciones por respuesta.

Cuando detectes que el usuario quiere realizar una acción concreta \
(bloquear tarjeta, ver saldo, solicitar estado de cuenta, actualizar datos), \
responde exactamente: \
"Claro, para hacer eso escríbelo en el chat y con gusto lo proceso."`;

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history }: { message: string; history?: HistoryMessage[] } =
      await req.json();

    if (!message) {
      return NextResponse.json({ error: 'message requerido' }, { status: 400 });
    }

    const messages: { role: string; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history ?? []).slice(-6),
      { role: 'user', content: message },
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[nexo] OpenAI error:', err);
      return NextResponse.json({ error: 'OpenAI error' }, { status: 500 });
    }

    const data = await res.json();
    const reply: string = data.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[nexo] error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
