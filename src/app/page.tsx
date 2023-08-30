import { Content, Sidebar } from '@/components';
import { Navbar } from '@/components/navbar/Navbar';

export default function Home() {
  return (
    <main className="bg-content min-w-screen min-h-screen">
      <Navbar />
      <div className="flex w-screen h-[calc(100vh-72px)]">
         <Sidebar/>
        <Content />
      </div>
    </main>
  );
}
