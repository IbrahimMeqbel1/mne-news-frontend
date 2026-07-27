import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans'>
      <main className='flex w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white sm:items-start gap-4'>
        <Image src='/assets/logo.svg' alt='Next.js logo' width={169} height={56} priority />
        <div className='flex flex-col items-center gap-6 text-center sm:items-start sm:text-left'>
          <h1 className='max-w-xs text-3xl font-bold leading-10 tracking-tight text-black'>وزارة الإقتصاد الوطني</h1>
        </div>
      </main>
    </div>
  );
}
