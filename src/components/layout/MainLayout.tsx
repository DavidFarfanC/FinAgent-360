import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const MainLayout = ({
  children,
  title = '',
  subtitle,
}: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-[#F0F4FF]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px] overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
          <div className="mt-12 pb-2 text-center">
            <p className="text-[11px] text-slate-700 tracking-widest uppercase font-medium">
              By Kamila &amp; David
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};
export default MainLayout;
