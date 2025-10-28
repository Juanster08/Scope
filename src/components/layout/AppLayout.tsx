import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AppLayout = () => {
  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
