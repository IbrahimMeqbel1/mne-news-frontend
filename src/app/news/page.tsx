import Link from 'next/link';
import { getNewsList } from '@/lib/api';
import { formatArabicDate } from '@/lib/format';

export const metadata = {
  title: 'الأخبار | وزارة الإقتصاد الوطني',
  description: 'آخر الأخبار والمستجدات من وزارة الإقتصاد الوطني'
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  const result = await getNewsList(currentPage).catch(() => null);

  if (!result) {
    return (
      <main className='mx-auto max-w-5xl px-6 py-24 text-center'>
        <p className='text-lg text-zinc-500'>تعذّر تحميل الأخبار حالياً، حاول مرة أخرى لاحقاً.</p>
      </main>
    );
  }

  const { data: newsItems, meta } = result;

  return (
    <main className='mx-auto max-w-5xl px-6 py-16'>
      <h1 className='mb-10 text-3xl font-bold text-black'>الأخبار</h1>

      {newsItems.length === 0 ? (
        <p className='text-zinc-500'>لا توجد أخبار منشورة حالياً.</p>
      ) : (
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className='group flex flex-col overflow-hidden rounded-xl border border-zinc-200 transition hover:shadow-lg'
            >
              <div className='relative aspect-video w-full overflow-hidden bg-zinc-100'>
                {item.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                  />
                ) : (
                  <div className='flex h-full items-center justify-center text-sm text-zinc-400'>
                    بدون صورة
                  </div>
                )}
              </div>

              <div className='flex flex-1 flex-col gap-2 p-4'>
                {item.publish_date && (
                  <span className='text-xs text-zinc-400'>{formatArabicDate(item.publish_date)}</span>
                )}
                <h2 className='line-clamp-2 text-lg font-bold text-black group-hover:text-yellow-600'>
                  {item.title}
                </h2>
                {item.description && (
                  <p className='line-clamp-2 text-sm text-zinc-500'>{item.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {meta && meta.last_page > 1 && (
        <div className='mt-12 flex items-center justify-center gap-4'>
          <PageLink page={currentPage - 1} disabled={currentPage <= 1} label='السابق' />
          <span className='text-sm text-zinc-500'>
            صفحة {meta.current_page} من {meta.last_page}
          </span>
          <PageLink page={currentPage + 1} disabled={currentPage >= meta.last_page} label='التالي' />
        </div>
      )}
    </main>
  );
}

function PageLink({ page, disabled, label }: { page: number; disabled: boolean; label: string }) {
  if (disabled) {
    return <span className='cursor-not-allowed rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-300'>{label}</span>;
  }

  return (
    <Link
      href={`/news?page=${page}`}
      className='rounded-lg border border-zinc-200 px-4 py-2 text-sm text-black transition hover:bg-zinc-50'
    >
      {label}
    </Link>
  );
}
