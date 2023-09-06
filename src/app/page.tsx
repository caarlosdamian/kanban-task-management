import { Content } from '@/components/content/Content';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { SidebarControl } from '@/components/sidebarControl/SidebarControl';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/navbar/Navbar'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="bg-content min-w-screen min-h-screen transition-all ease-in-out relative">
      <Navbar />
      <div className="flex w-screen h-[calc(100%-72px)]">
        <Sidebar />
        <Content />
      </div>
      <SidebarControl />
    </main>
  );
}
