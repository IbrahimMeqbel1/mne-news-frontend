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

  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <Link href='/news' className='mb-8 inline-block text-sm text-zinc-500 hover:text-black'>
        ← العودة إلى الأخبار
      </Link>

      {news.publish_date && (
        <span className='mb-3 block text-sm text-zinc-400'>{formatArabicDate(news.publish_date)}</span>
      )}

      <h1 className='mb-6 text-3xl font-bold leading-tight text-black'>{news.title}</h1>

      {news.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={news.cover_image}
          alt={news.title}
          className='mb-8 w-full rounded-xl object-cover'
        />
      )}

      {news.description && <p className='mb-6 text-lg text-zinc-600'>{news.description}</p>}

      {/* المحتوى قادم كـ HTML من محرر Twill النصي، لذلك نستخدم dangerouslySetInnerHTML */}
      <div
        className='prose prose-zinc max-w-none prose-headings:font-bold prose-img:rounded-xl'
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </main>
  );
}
