'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Lock } from 'lucide-react';
import { clsx } from 'clsx';

interface SalesforcePanelProps {
  suggestedInput?: string;
  onInputChange?: (value: string) => void;
}

interface MockMessage {
  id: number;
  role: 'user' | 'nexo';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: MockMessage[] = [
  {
    id: 1,
    role: 'nexo',
    text: '¡Hola! Soy Nexo, tu asistente bancario de BreBank. ¿En qué puedo ayudarte hoy?',
    time: '10:30 AM',
  },
  {
    id: 2,
    role: 'user',
    text: 'Quiero bloquear mi tarjeta',
    time: '10:31 AM',
  },
  {
    id: 3,
    role: 'nexo',
    text: 'Entendido. Para bloquear tu tarjeta Visa *4721, necesito verificar tu identidad. ¿Puedes confirmar los últimos 4 dígitos de tu cuenta?',
    time: '10:31 AM',
  },
];

export function SalesforcePanel({ suggestedInput = '', onInputChange }: SalesforcePanelProps) {
  const [messages, setMessages] = useState<MockMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // When Nexo voice panel suggests an action, pre-fill the input
  useEffect(() => {
    if (suggestedInput) {
      setInput(suggestedInput);
    }
  }, [suggestedInput]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const now = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text, time: now },
    ]);
    setInput('');
    onInputChange?.('');

    // Simulated Nexo response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'nexo',
          text: 'Gracias por tu mensaje. En cuanto la integración con Agentforce esté activa, recibirás una respuesta en tiempo real.',
          time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100">
      {/* ── Panel header ───────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-5 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Nexo — Agente BreBank</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Canal de atención digital</p>
          </div>
          <span className="text-[10px] font-semibold text-white bg-blue-600 px-2 py-1 rounded-full tracking-wide">
            Powered by Agentforce
          </span>
        </div>
      </div>

      {/* ── Simulated Messaging for Web widget ─────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden mx-4 my-4 bg-white rounded-2xl border border-slate-200 shadow-sm">

        {/* Widget header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100 flex-shrink-0">
          {/* Salesforce cloud icon (SVG inline) */}
          <svg viewBox="0 0 64 44" className="w-6 h-4 flex-shrink-0" aria-hidden="true">
            <path
              fill="#00A1E0"
              d="M26.5 3.5a9 9 0 0 1 7.8 4.5 11 11 0 0 1 5.2-1.3 11 11 0 0 1 11 11 11 11 0 0 1-.3 2.6A8 8 0 0 1 56 28a8 8 0 0 1-8 8H16a12 12 0 0 1-12-12 12 12 0 0 1 9.2-11.7A9 9 0 0 1 26.5 3.5z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-800">BreBank Assistant</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-[10px] text-slate-500">En línea</span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div className="flex flex-col gap-1 max-w-[80%]">
                <div
                  className={clsx(
                    'px-3 py-2 rounded-2xl text-xs leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200'
                  )}
                >
                  {msg.text}
                </div>
                <span
                  className={clsx(
                    'text-[10px] text-slate-400 px-1',
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  )}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-t border-slate-100 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              onInputChange?.(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="flex-1 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={clsx(
              'w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0',
              input.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-500 active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            )}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Secured badge */}
        <div className="flex items-center justify-center gap-1 py-1.5 border-t border-slate-100 flex-shrink-0">
          <Lock className="w-2.5 h-2.5 text-slate-400" />
          <span className="text-[9px] text-slate-400">Secured by Salesforce</span>
        </div>
      </div>

      {/* Integration note */}
      <p className="text-center text-[10px] text-slate-400 italic pb-3 px-4">
        Integración Agentforce en configuración — canal Messaging for Web
      </p>
    </div>
  );
}
