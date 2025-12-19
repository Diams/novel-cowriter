import Image from "next/image";
import CenterPane from "@/ui/center_pane";
import ProjectMenu from "@/ui/header/project_menu";
import LeftPane from "@/ui/left_pane";
import RightPane from "@/ui/right_pane";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex w-full bg-linear-to-b from-[rgba(16,24,40,0.88)] to-[rgba(16,24,40,0.55)] backdrop-blur-[10px] border-b py-2.5 px-3.5">
        <div className="flex flex-1 items-center gap-2.5">
          <Image
            src="/favicon.ico"
            alt="Novel Co-Writer"
            width={34}
            height={34}
          />
          <h1>Novel Co-Writer</h1>
        </div>
        <ProjectMenu />
      </header>
      <main className="grid grid-cols-[320px_1fr_420px] w-full flex-1 gap-3 p-3 overflow-hidden">
        <section className="overflow-hidden">
          <LeftPane />
        </section>
        <section className="overflow-hidden">
          <CenterPane />
        </section>
        <section className="overflow-hidden">
          <RightPane />
        </section>
      </main>
    </div>
  );
}
