'use client';
import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import {
  Send,
  Sparkles,
  Wallet,
  Lock,
  FileText,
  MapPin,
  Check,
  X,
  Bot,
} from 'lucide-react';
import { clsx } from 'clsx';
import {
  mockChatMessages,
  formatTime,
  aiResponses,
} from '@/lib/mock-data';
import { ChatMessage, QuickAction } from '@/types';
import { useVoiceChat } from '@/hooks/useVoiceChat';
import { VoiceButton } from '@/components/chat/VoiceButton';

const iconMap: Record<string, React.ElementType> = {
  wallet: Wallet,
  lock: Lock,
  'file-text': FileText,
  'map-pin': MapPin,
  check: Check,
  x: X,
};

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className={line === '' ? 'h-2' : ''}>
        {parts.map((part, j) =>
          j % 2 === 1 ? (
            <strong key={j} className="font-semibold text-white">
              {part}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </p>
    );
  });
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={clsx(
        'flex gap-3 animate-fade-in',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600/80 to-blue-600/80 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-purple-300" />
        </div>
      )}

      <div
        className={clsx(
          'flex flex-col gap-2 max-w-[75%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={clsx(
            'px-4 py-3 rounded-2xl text-sm leading-relaxed',
            isUser
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm shadow-lg shadow-blue-500/20'
              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
          )}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="space-y-1">{renderMarkdown(message.content)}</div>
          )}
        </div>

        <span className="text-[10px] text-slate-600 px-1">
          {formatTime(message.timestamp)}
        </span>

        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.actions.map((action) => (
              <QuickActionButton key={action.id} action={action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickActionButton({
  action,
  onAction,
}: {
  action: QuickAction;
  onAction?: (action: string, label: string) => void;
}) {
  const Icon = action.icon ? iconMap[action.icon] : null;

  return (
    <button
      onClick={() => onAction?.(action.action, action.label)}
      className={clsx(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border',
        action.action === 'cancel'
          ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
          : action.action === 'confirm_block'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      )}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {action.label}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600/80 to-blue-600/80 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-purple-300" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
        </div>
      </div>
    </div>
  );
}

const defaultActions: QuickAction[] = [
  { id: 'qa_1', label: 'Ver saldo', action: 'check_balance', icon: 'wallet' },
  { id: 'qa_2', label: 'Bloquear tarjeta', action: 'block_card', icon: 'lock' },
  { id: 'qa_3', label: 'Estado de cuenta', action: 'request_statement', icon: 'file-text' },
  { id: 'qa_4', label: 'Actualizar dirección', action: 'update_address', icon: 'map-pin' },
];

export const ChatInterface = () => {
  // ── Core chat state ────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Voice integration refs ─────────────────────────────────────────────────
  // Tracks whether the last user interaction was triggered by voice
  const voiceTriggeredRef = useRef(false);
  // Stable ref to sendMessage — avoids stale closures in voice callbacks
  const sendMessageRef = useRef<((text: string, action?: string) => Promise<void>) | null>(null);
  // Tracks last assistant message ID spoken — prevents double-speak on re-renders
  const lastSpokenMsgIdRef = useRef<string>('');

  // Stable callback passed to the hook — reads sendMessageRef at call time
  const handleVoiceTranscript = useCallback((text: string) => {
    voiceTriggeredRef.current = true;
    sendMessageRef.current?.(text);
  }, []);

  const {
    isListening,
    isSpeaking,
    transcript,
    isSupported,
    startListening,
    speak,
    stopSpeaking,
  } = useVoiceChat({ onTranscript: handleVoiceTranscript });

  // ── Send message logic (unchanged) ─────────────────────────────────────────
  const sendMessage = async (text: string, action?: string) => {
    if (!text.trim() && !action) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text || defaultActions.find((a) => a.action === action)?.label || text,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));

    const responseKey = action || 'default';
    const responseContent = aiResponses[responseKey] ?? aiResponses.default;

    const aiMessage: ChatMessage = {
      id: `msg_${Date.now() + 1}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toISOString(),
      status: 'read',
      actions:
        responseKey === 'block_card'
          ? [
              { id: 'confirm', label: 'Confirmar bloqueo', action: 'confirm_block', icon: 'check' },
              { id: 'cancel', label: 'Cancelar', action: 'cancel', icon: 'x' },
            ]
          : undefined,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMessage]);
  };

  // Keep ref in sync every render so handleVoiceTranscript always calls latest sendMessage
  sendMessageRef.current = sendMessage;

  // ── Speak AI response after voice-triggered interactions ───────────────────
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.id === lastSpokenMsgIdRef.current) return;

    if (lastMsg.role === 'assistant' && voiceTriggeredRef.current) {
      lastSpokenMsgIdRef.current = lastMsg.id;
      voiceTriggeredRef.current = false;
      speak(lastMsg.content);
    }
  }, [messages, speak]);

  // ── Auto-scroll on new messages or typing indicator ────────────────────────
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleAction = (action: string, label: string) => {
    sendMessage(label, action);
  };

  // Click voice button: stop speech if speaking, else toggle listening
  const handleVoiceButtonClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ── Chat header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-white flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-md shadow-purple-200">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">FinAgent AI</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-xs text-slate-500">En línea · Disponible 24/7</span>
          </div>
        </div>

        {/* Voice status indicator */}
        <div className="flex items-center gap-2 ml-3">
          {isListening && (
            <div className="flex items-center gap-1.5 animate-fade-in">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
              </span>
              <span className="text-xs text-red-600 font-medium">Escuchando...</span>
            </div>
          )}
          {isSpeaking && (
            <div className="flex items-center gap-1.5 animate-fade-in">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
              </span>
              <span className="text-xs text-cyan-700 font-medium">Hablando...</span>
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1">
            GPT-4 Turbo
          </span>
        </div>
      </div>

      {/* ── Messages ────────────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={{
              ...message,
              actions: message.actions?.map((a) => ({ ...a })),
            }}
          />
        ))}

        {/* Last assistant message quick actions with live handler */}
        {messages.length > 0 &&
          messages[messages.length - 1].role === 'assistant' &&
          messages[messages.length - 1].actions && (
            <div className="flex flex-wrap gap-2 pl-11">
              {messages[messages.length - 1].actions!.map((action) => (
                <QuickActionButton
                  key={action.id}
                  action={action}
                  onAction={handleAction}
                />
              ))}
            </div>
          )}

        {isTyping && <TypingIndicator />}
      </div>

      {/* ── Quick suggestion chips ───────────────────────────────────────────── */}
      {messages.length <= 5 && (
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {defaultActions.map((action) => {
            const Icon = action.icon ? iconMap[action.icon] : null;
            return (
              <button
                key={action.id}
                onClick={() => handleAction(action.action, action.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all duration-200"
              >
                {Icon && <Icon className="w-3 h-3" />}
                {action.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Input area ──────────────────────────────────────────────────────── */}
      <div className="px-6 pb-6 flex-shrink-0">
        <div className="flex items-end gap-3 bg-white border border-slate-200 rounded-2xl p-3 focus-within:border-blue-400 shadow-sm transition-all">
          <div className="flex-1 flex flex-col gap-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isListening && transcript
                  ? transcript
                  : 'Escribe tu consulta... (Enter para enviar)'
              }
              rows={1}
              className={clsx(
                'w-full bg-transparent text-sm text-slate-800 focus:outline-none resize-none max-h-32 leading-relaxed',
                isListening && transcript
                  ? 'placeholder:text-slate-400 placeholder:italic'
                  : 'placeholder:text-slate-400'
              )}
              style={{ minHeight: '24px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
              }}
            />
            {/* Interim transcript caption (shows below textarea while listening) */}
            {isListening && transcript && (
              <p className="text-[11px] italic text-white/40 px-0.5 animate-fade-in">
                {transcript}
              </p>
            )}
          </div>

          {/* Send button */}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className={clsx(
              'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0',
              input.trim() && !isTyping
                ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:from-blue-500 hover:to-cyan-400 active:scale-95'
                : 'bg-white/[0.04] text-slate-600 cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </button>

          {/* Voice button — sits right of send button, hidden when not supported */}
          <VoiceButton
            isListening={isListening}
            isSpeaking={isSpeaking}
            isSupported={isSupported}
            onClick={handleVoiceButtonClick}
          />
        </div>

        <p className="text-center text-[10px] text-slate-700 mt-2">
          FinAgent AI puede cometer errores. Verifica información importante.
        </p>
      </div>
    </div>
  );
};
