import { MainLayout } from '@/components/layout/MainLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <MainLayout
      title="Asistente IA"
      subtitle="Tu copiloto financiero inteligente"
    >
      <div className="h-full -m-8">
        <div className="h-full glass-card rounded-none border-0" style={{ height: 'calc(100vh - 72px)' }}>
          <ChatInterface />
        </div>
      </div>
    </MainLayout>
  );
}
