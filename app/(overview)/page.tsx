import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-lg overflow-hidden">
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
      </div>
    </div>
  );
}
