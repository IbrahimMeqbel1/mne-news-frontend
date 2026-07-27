import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getNewsBySlug } from '@/lib/api';
import { formatArabicDate } from '@/lib/format';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) return { title: 'الخبر غير موجود' };

  return {
    title: `${news.title} | وزارة الإقتصاد الوطني`,
    description: news.description
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const hasCoverImage = Boolean(news.cover_image && !news.cover_image.startsWith('data:'));

  return (
    <div className='min-h-screen bg-[#f7f4ed] text-[#17251f]'>
      <header className='bg-[#17251f] text-white'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5'>
          <Link href='/' className='font-bold transition hover:text-[#d7b950]'>وزارة الاقتصاد الوطني</Link>
          <Link href='/news' className='text-sm text-white/70 transition hover:text-white'>العودة إلى الأخبار ←</Link>
        </div>
      </header>

      <main className='mx-auto max-w-5xl px-6 py-14 sm:py-20'>
        <nav className='mb-8 text-sm font-bold text-[#9a7921]'>
          <Link href='/' className='hover:underline'>الرئيسية</Link>
          <span className='mx-2 text-[#17251f]/25'>/</span>
          <Link href='/news' className='hover:underline'>الأخبار</Link>
        </nav>

        <article>
          <header className='max-w-4xl'>
            <p className='text-sm font-bold text-[#9a7921]'>{news.publish_date ? formatArabicDate(news.publish_date) : 'أخبار الوزارة'}</p>
            <h1 className='mt-4 text-4xl font-black leading-[1.35] sm:text-6xl'>{news.title}</h1>
            {news.description && <p className='mt-7 text-xl leading-9 text-[#17251f]/60'>{news.description}</p>}
          </header>

          <div className='relative mt-12 min-h-72 overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#d9d4c8,#ece8de)] sm:min-h-[460px]'>
            {hasCoverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={news.cover_image!} alt='' className='absolute inset-0 h-full w-full object-cover' />
            ) : (
              <div className='absolute inset-0 grid place-items-center'>
                <div className='text-center'>
                  <div className='mx-auto mb-5 h-16 w-px bg-[#c9a83e]' />
                  <p className='text-sm font-black tracking-[0.18em] text-[#17251f]/40'>وزارة الاقتصاد الوطني</p>
                </div>
              </div>
            )}
          </div>

          {news.content && (
            <div
              className='prose prose-zinc mx-auto mt-12 max-w-3xl prose-headings:font-bold prose-img:rounded-2xl'
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          )}

          <footer className='mt-14 border-t border-[#17251f]/15 pt-8'>
            <Link href='/news' className='inline-flex rounded-full bg-[#17251f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2b4438]'>العودة إلى جميع الأخبار</Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
