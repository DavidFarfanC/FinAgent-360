import { MainLayout } from '@/components/layout/MainLayout';
import { DocumentCenter } from '@/components/documents/DocumentCenter';

export default function DocumentsPage() {
  return (
    <MainLayout
      title="Documentos"
      subtitle="Estados de cuenta y documentos financieros"
    >
      <div className="animate-fade-in">
        <DocumentCenter />
      </div>
    </MainLayout>
  );
}
