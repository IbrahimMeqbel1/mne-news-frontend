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
  const requestedPage = Number.parseInt(page ?? '1', 10);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const result = await getNewsList(currentPage).catch((error: unknown) => {
    console.error('تعذر جلب الأخبار:', error);
    return null;
  });

  return (
    <div className='min-h-screen bg-[#f7f4ed] text-[#17251f]'>
      <header className='border-b border-[#17251f]/10 bg-[#17251f] text-white'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5'>
          <Link href='/' className='font-bold transition hover:text-[#d7b950]'>وزارة الاقتصاد الوطني</Link>
          <Link href='/' className='text-sm text-white/70 transition hover:text-white'>العودة إلى الرئيسية ←</Link>
        </div>
      </header>

      <main className='mx-auto max-w-7xl px-6 py-16'>
        <div className='mb-12 border-b border-[#17251f]/15 pb-10'>
          <p className='mb-3 text-sm font-bold text-[#9a7921]'>المركز الإعلامي / الأخبار</p>
          <div className='flex flex-col justify-between gap-5 md:flex-row md:items-end'>
            <h1 className='text-5xl font-black sm:text-6xl'>الأخبار</h1>
            <p className='max-w-xl leading-8 text-[#17251f]/60'>تابع آخر أنشطة الوزارة والقرارات والمبادرات المتعلقة بالاقتصاد الوطني وحماية المستهلك.</p>
          </div>
        </div>

        {!result ? (
          <section className='rounded-[2rem] border border-[#b95043]/25 bg-[#fff8f5] p-8 sm:p-12'>
            <p className='text-sm font-bold text-[#a84035]'>تعذر الاتصال بخدمة الأخبار</p>
            <h2 className='mt-3 text-2xl font-black'>الأخبار غير متاحة مؤقتًا</h2>
            <p className='mt-3 max-w-2xl leading-8 text-[#17251f]/60'>حدثت مشكلة أثناء جلب البيانات من الخادم. حاول تحديث الصفحة بعد قليل.</p>
            <Link href={`/news?page=${currentPage}`} className='mt-7 inline-block rounded-full bg-[#17251f] px-6 py-3 text-sm font-bold text-white'>إعادة المحاولة</Link>
          </section>
        ) : result.data.length === 0 ? (
          <section className='rounded-[2rem] border border-dashed border-[#17251f]/25 bg-white/50 p-12 text-center'>
            <h2 className='text-2xl font-black'>لا توجد أخبار منشورة حاليًا</h2>
            <p className='mt-3 text-[#17251f]/60'>تظهر الأخبار الجديدة هنا فور نشرها.</p>
          </section>
        ) : (
          <>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {result.data.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className={`group flex min-h-96 flex-col overflow-hidden rounded-[2rem] border border-[#17251f]/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                >
                  <div className={`relative overflow-hidden bg-[#d9d4c8] ${index === 0 ? 'min-h-72' : 'min-h-52'}`}>
                    {item.cover_image && !item.cover_image.startsWith('data:') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.cover_image} alt='' className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105' />
                    ) : (
                      <div className='absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#d9d4c8,#ece8de)] text-sm font-bold text-[#17251f]/35'>وزارة الاقتصاد الوطني</div>
                    )}
                  </div>
                  <div className='flex flex-1 flex-col p-7'>
                    <p className='text-xs font-bold text-[#9a7921]'>{item.publish_date ? formatArabicDate(item.publish_date) : 'أخبار الوزارة'}</p>
                    <h2 className={`mt-3 font-black leading-snug ${index === 0 ? 'text-3xl' : 'text-2xl'}`}>{item.title}</h2>
                    {item.description && <p className='mt-4 line-clamp-3 leading-7 text-[#17251f]/60'>{item.description}</p>}
                    <span className='mt-auto pt-7 text-sm font-bold'>اقرأ الخبر ←</span>
                  </div>
                </Link>
              ))}
            </div>

            {result.meta.last_page > 1 && (
              <nav className='mt-12 flex items-center justify-center gap-4' aria-label='صفحات الأخبار'>
                <PageLink page={currentPage - 1} disabled={currentPage <= 1} label='السابق' />
                <span className='rounded-full bg-white px-5 py-3 text-sm font-bold'>صفحة {result.meta.current_page} من {result.meta.last_page}</span>
                <PageLink page={currentPage + 1} disabled={currentPage >= result.meta.last_page} label='التالي' />
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function PageLink({ page, disabled, label }: { page: number; disabled: boolean; label: string }) {
  const className = 'rounded-full border border-[#17251f]/20 px-5 py-3 text-sm font-bold transition';

  if (disabled) {
    return <span className={`${className} cursor-not-allowed opacity-35`}>{label}</span>;
  }

  return <Link href={`/news?page=${page}`} className={`${className} hover:bg-[#17251f] hover:text-white`}>{label}</Link>;
}
