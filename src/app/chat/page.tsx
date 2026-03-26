'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { NexoVoicePanel } from '@/components/chat/NexoVoicePanel';
import SalesforcePanel from '@/components/chat/SalesforcePanel';
import { clsx } from 'clsx';

type Tab = 'voice' | 'agent';

export default function ChatPage() {
  const [suggestedInput, setSuggestedInput] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('voice');

  const handleActionDetected = (text: string) => {
    setSuggestedInput(text);
    // Switch to agent tab on mobile when action is detected
    setActiveTab('agent');
  };

  return (
    <MainLayout
      title="Asistente IA"
      subtitle="Tu copiloto financiero inteligente"
    >
      <div className="h-full -m-8" style={{ height: 'calc(100vh - 72px)' }}>
        {/* ── Mobile tab bar ──────────────────────────────────────────────────── */}
        <div className="flex md:hidden border-b border-slate-200 bg-white flex-shrink-0">
          {(['voice', 'agent'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'flex-1 py-3 text-sm font-medium transition-colors',
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {tab === 'voice' ? 'Voz' : 'Agente'}
            </button>
          ))}
        </div>

        {/* ── Two-column layout (desktop) / single panel (mobile) ─────────────── */}
        <div className="flex h-full overflow-hidden">
          {/* Left: Nexo Voice Panel */}
          <div
            className={clsx(
              'w-full md:w-1/2 md:border-r md:border-slate-200 overflow-hidden',
              activeTab === 'voice' ? 'flex' : 'hidden md:flex',
              'flex-col'
            )}
          >
            <NexoVoicePanel onActionDetected={handleActionDetected} />
          </div>

          {/* Right: Salesforce Panel */}
          <div
            className={clsx(
              'w-full md:w-1/2 overflow-hidden',
              activeTab === 'agent' ? 'flex' : 'hidden md:flex',
              'flex-col'
            )}
          >
            <SalesforcePanel suggestedInput={suggestedInput} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
