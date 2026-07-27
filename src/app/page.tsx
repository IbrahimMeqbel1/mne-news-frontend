import Image from 'next/image';
import Link from 'next/link';
import { getNewsList } from '@/lib/api';
import { formatArabicDate } from '@/lib/format';

const services = [
  { href: '/services/consumer-protection', title: 'حماية المستهلك', number: '01' },
  { href: '/services/commercial-licensing', title: 'التراخيص التجارية', number: '02' },
  { href: '/services/standards', title: 'المواصفات والمقاييس', number: '03' },
  { href: '/services/investments', title: 'الاستثمار', number: '04' }
];

export default async function Home() {
  const newsResult = await getNewsList(1).catch(() => null);
  const latestNews = newsResult?.data.slice(0, 3) ?? [];

  return (
    <div className='min-h-screen bg-[#f7f4ed] text-[#17251f]'>
      <header className='border-b border-[#17251f]/10 bg-[#f7f4ed]/95'>
        <div className='bg-[#c9a83e] px-6 py-2 text-center text-sm font-semibold text-[#17251f]'>
          البوابة الإعلامية لوزارة الاقتصاد الوطني الفلسطيني
        </div>
        <nav className='mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5'>
          <Link href='/' className='flex items-center gap-3' aria-label='الرئيسية'>
            <Image src='/assets/logo.svg' alt='' width={126} height={42} priority />
          </Link>
          <div className='hidden items-center gap-7 text-sm font-semibold md:flex'>
            <Link href='/' className='text-[#9a7921]'>الرئيسية</Link>
            <Link href='/about' className='transition hover:text-[#9a7921]'>عن الوزارة</Link>
            <Link href='/services' className='transition hover:text-[#9a7921]'>الخدمات الإلكترونية</Link>
            <details className='group relative'>
              <summary className='cursor-pointer list-none transition hover:text-[#9a7921]'>المركز الإعلامي</summary>
              <div className='absolute right-0 top-8 z-20 grid min-w-52 gap-1 rounded-2xl border border-[#17251f]/10 bg-white p-2 shadow-xl'>
                <Link href='/news' className='rounded-xl px-4 py-3 hover:bg-[#f7f4ed]'>الأخبار</Link>
                <Link href='/announcements' className='rounded-xl px-4 py-3 hover:bg-[#f7f4ed]'>الإعلانات والتنويهات</Link>
                <Link href='/press-releases' className='rounded-xl px-4 py-3 hover:bg-[#f7f4ed]'>البيانات الصحفية</Link>
              </div>
            </details>
            <Link href='/contact' className='transition hover:text-[#9a7921]'>تواصل معنا</Link>
          </div>
          <Link href='/news' className='rounded-full bg-[#17251f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2b4438]'>
            آخر الأخبار
          </Link>
        </nav>
      </header>

      <main>
        <section className='relative overflow-hidden border-b border-[#17251f]/10'>
          <div className='absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(circle_at_center,#c9a83e33_0,transparent_68%)]' />
          <div className='relative mx-auto grid min-h-[540px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.3fr_.7fr]'>
            <div>
              <p className='mb-5 text-sm font-bold tracking-[0.24em] text-[#9a7921]'>اقتصاد أقوى · مجتمع أكثر صمودًا</p>
              <h1 className='max-w-4xl text-5xl font-black leading-[1.18] sm:text-6xl lg:text-7xl'>
                نبني اقتصادًا وطنيًا يحمي الناس ويدعم الإنتاج
              </h1>
              <p className='mt-7 max-w-2xl text-lg leading-9 text-[#17251f]/65'>
                نطوّر بيئة الأعمال، نحمي حقوق المستهلك، ونساند القطاعات الإنتاجية الفلسطينية بخدمات ومعلومات موثوقة.
              </p>
              <div className='mt-10 flex flex-wrap gap-3'>
                <Link href='/services' className='rounded-full bg-[#c9a83e] px-7 py-4 font-bold transition hover:bg-[#b49330]'>استعرض الخدمات</Link>
                <Link href='/news' className='rounded-full border border-[#17251f]/20 px-7 py-4 font-bold transition hover:bg-white'>المركز الإعلامي</Link>
              </div>
            </div>
            <div className='relative hidden aspect-square lg:block'>
              <div className='absolute inset-8 rounded-full border border-[#c9a83e]/40' />
              <div className='absolute inset-20 rounded-full border border-[#17251f]/15' />
              <div className='absolute inset-32 grid place-items-center rounded-full bg-[#17251f] p-10 shadow-2xl'>
                <Image src='/assets/logo.svg' alt='وزارة الاقتصاد الوطني' width={210} height={90} className='brightness-0 invert' />
              </div>
            </div>
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-6 py-20'>
          <div className='mb-10 flex items-end justify-between gap-6'>
            <div>
              <p className='mb-2 text-sm font-bold text-[#9a7921]'>المركز الإعلامي</p>
              <h2 className='text-4xl font-black'>آخر الأخبار</h2>
            </div>
            <Link href='/news' className='border-b border-[#17251f] pb-1 text-sm font-bold'>عرض جميع الأخبار</Link>
          </div>

          {latestNews.length > 0 ? (
            <div className='grid gap-5 lg:grid-cols-3'>
              {latestNews.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className={`group relative min-h-80 overflow-hidden rounded-[2rem] bg-[#d9d4c8] ${index === 0 ? 'lg:col-span-2 lg:min-h-[430px]' : ''}`}
                >
                  {item.cover_image && !item.cover_image.startsWith('data:') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.cover_image} alt='' className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105' />
                  ) : null}
                  <div className='absolute inset-0 bg-gradient-to-t from-[#101914] via-[#101914]/45 to-transparent' />
                  <div className='absolute inset-x-0 bottom-0 p-7 text-white sm:p-9'>
                    {item.publish_date && <p className='mb-3 text-sm text-white/70'>{formatArabicDate(item.publish_date)}</p>}
                    <h3 className={`${index === 0 ? 'text-3xl' : 'text-2xl'} font-bold leading-snug`}>{item.title}</h3>
                    {item.description && <p className='mt-3 line-clamp-2 max-w-2xl text-sm leading-7 text-white/70'>{item.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='rounded-[2rem] border border-dashed border-[#17251f]/25 bg-white/50 p-12 text-center'>
              <p className='text-lg font-bold'>الأخبار غير متاحة مؤقتًا</p>
              <p className='mt-2 text-sm text-[#17251f]/60'>يمكنك المحاولة مرة أخرى من صفحة الأخبار.</p>
            </div>
          )}
        </section>

        <section className='bg-[#17251f] text-white'>
          <div className='mx-auto max-w-7xl px-6 py-20'>
            <p className='mb-2 text-sm font-bold text-[#d7b950]'>بوابتك إلى الخدمات</p>
            <h2 className='mb-10 text-4xl font-black'>الخدمات الإلكترونية</h2>
            <div className='grid gap-px overflow-hidden rounded-[2rem] bg-white/15 sm:grid-cols-2 lg:grid-cols-4'>
              {services.map((service) => (
                <Link key={service.href} href={service.href} className='group bg-[#17251f] p-7 transition hover:bg-[#22382e]'>
                  <span className='text-sm text-[#d7b950]'>{service.number}</span>
                  <h3 className='mt-16 text-xl font-bold'>{service.title}</h3>
                  <span className='mt-5 block text-sm text-white/55 transition group-hover:text-white'>انتقل إلى الخدمة ←</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className='bg-[#101914] px-6 py-8 text-center text-sm text-white/55'>
        جميع الحقوق محفوظة © 2026 وزارة الاقتصاد الوطني الفلسطيني
      </footer>
    </div>
  );
}
