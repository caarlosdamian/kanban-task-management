import { Content } from '@/components/content/Content';
import { Navbar } from '@/components/navbar/Navbar';
import { Sidebar } from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <main className="bg-content min-w-screen min-h-screen transition-all ease-in-out">
      <Navbar />
      <div className="flex w-screen h-[calc(100vh-72px)]">
        <Sidebar />
        <Content />
      </div>
    </main>
  );
}
