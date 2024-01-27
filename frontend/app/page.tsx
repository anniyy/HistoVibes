import Image from "next/image";
import Sidebar from "@/components/sidebar";
import Timeline from "./timeline/pages";

export default function Home() {
  return (
    <>
      <main className="overflow-y-hidden">
        <Sidebar />
        <Timeline />
      </main>
    </>
  );
}
