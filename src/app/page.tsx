import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full">
      <header className="w-full bg-linear-to-b from-[rgba(16,24,40,0.88)] to-[rgba(16,24,40,0.55)] backdrop-blur-[10px] border-b py-2.5 px-3.5">
        <div className="flex items-center gap-2.5">
          <Image
            src="/favicon.ico"
            alt="Novel Co-Writer"
            width={34}
            height={34}
          />
          <h1>Novel Co-Writer</h1>
        </div>
      </header>
    </div>
  );
}
