import { Navbar } from '@/components/navbar/Navbar';
import { Sidebar } from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <main className="bg-content min-w-screen min-h-screen">
      <Navbar />
      <div className="">
        <Sidebar />
        <div className=""></div>
      </div>
    </main>
  );
}
