import Link from 'next/link';
import { getNewsList } from '@/lib/api';
import { formatArabicDate } from '@/lib/format';
import NewsSlider from '@/components/NewsSlider';
import { Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockNews } from '@/lib/mockData';

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

  let result = await getNewsList(currentPage).catch(() => null);
  
  // استخدام بيانات تجريبية للعرض في حال فشل الـ API
  const newsItems = result?.data || mockNews;
  const meta = result?.meta || { last_page: 1, current_page: 1 };
  const sliderItems = newsItems.slice(0, 5); // أول 5 أخبار للسلايدر

  return (
    <div className="min-h-screen bg-[#FDF8F0]" dir="rtl">
      {/* Top Bar */}
      <div className="bg-[#1A1A1A] text-white py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span>📞 129</span>
            <span>📍 فلسطين</span>
          </div>
          <div className="flex gap-4">
            <span>مرحباً بكم في وزارة الاقتصاد الوطني الفلسطيني</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#1A1A1A] text-white py-6 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <img src="/assets/logo.svg" alt="الشعار" className="w-16 h-16 invert" />
            <div className="text-right">
              <p className="font-bold text-xl">وزارة الاقتصاد الوطني</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Ministry Of National Economy</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-8 font-medium">
            <Link href="/" className="hover:text-yellow-500 transition">الرئيسية</Link>
            <Link href="/news" className="text-yellow-500 border-b-2 border-yellow-500">المركز الإعلامي</Link>
            <Link href="/services" className="hover:text-yellow-500 transition">الخدمات الإلكترونية</Link>
            <Link href="/about" className="hover:text-yellow-500 transition">عن الوزارة</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Dark Background */}
      <section className="bg-[#1A1A1A] pt-12 pb-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">أخبار الوزارة</h1>
            <p className="text-gray-400 text-lg">أخبار وزارة الاقتصاد بين يديك</p>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 justify-center md:justify-start">
               <Link href="/" className="hover:text-white transition">الرئيسية</Link>
               <ChevronLeft size={14} />
               <span className="text-yellow-500">الأخبار</span>
            </div>
          </div>
          
          {/* Slider */}
          <NewsSlider newsItems={sliderItems} />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-16 relative z-30">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="اكتب ما الذي تبحث عنه..."
                className="w-full pr-12 pl-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-500 transition"
              />
            </div>
            <div className="flex gap-4">
              <select className="px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-500 transition min-w-[150px]">
                <option>اختر الشهر</option>
              </select>
              <select className="px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-500 transition min-w-[150px]">
                <option>اختر السنة</option>
              </select>
              <button className="bg-yellow-500 text-white px-8 py-4 rounded-xl hover:bg-yellow-600 transition shadow-lg shadow-yellow-500/20">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {newsItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-xl font-medium">لا توجد أخبار منشورة حالياً.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {newsItems.map((item: any) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {item.cover_image ? (
                    <img 
                      src={item.cover_image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-300">بدون صورة</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-900 uppercase">
                      أخبار
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                    <Calendar size={14} />
                    <span>{formatArabicDate(item.publish_date)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-600 transition-colors line-clamp-2 leading-relaxed">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-loose">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-yellow-600 font-bold text-sm">اقرأ المزيد</span>
                    <ChevronLeft size={18} className="text-yellow-600 group-hover:-translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.last_page > 1 && (
          <div className="flex justify-center items-center gap-3 pb-24">
            {currentPage > 1 && (
              <Link 
                href={`/news?page=${currentPage - 1}`} 
                className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </Link>
            )}
            
            <div className="flex gap-2">
              {Array.from({ length: Math.min(meta.last_page, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Link
                    key={pageNum}
                    href={`/news?page=${pageNum}`}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all shadow-sm ${
                      currentPage === pageNum 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-yellow-500'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {currentPage < meta.last_page && (
              <Link 
                href={`/news?page=${currentPage + 1}`} 
                className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </Link>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-gray-400 pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <img src="/assets/logo.svg" alt="الشعار" className="w-20 h-20 mb-6 invert opacity-80" />
              <p className="max-w-md leading-loose mb-8">
                تعمل وزارة الاقتصاد الوطني على تنظيم وتطوير النشاط الاقتصادي، ودعم القطاعات الإنتاجية وتعزيز بيئة استثمارية عادلة ومستدامة، بما يساهم في تحقيق النمو الاقتصادي وحماية المستهلك.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition">f</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition">t</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition">i</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-xl mb-8">الوزارة</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="hover:text-yellow-500 transition">عن الوزارة</Link></li>
                <li><Link href="/vision" className="hover:text-yellow-500 transition">الرؤية والأهداف</Link></li>
                <li><Link href="/strategy" className="hover:text-yellow-500 transition">الأهداف الاستراتيجية</Link></li>
                <li><Link href="/contact" className="hover:text-yellow-500 transition">تواصل معنا</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-xl mb-8">الخدمات الإلكترونية</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="hover:text-yellow-500 transition">تسجيل شركة</Link></li>
                <li><Link href="#" className="hover:text-yellow-500 transition">تقديم شكوى</Link></li>
                <li><Link href="#" className="hover:text-yellow-500 transition">حماية المستهلك</Link></li>
                <li><Link href="#" className="hover:text-yellow-500 transition">الاستعلام عن معاملة</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-center text-sm">
            <p>جميع الحقوق محفوظة © 2026 وزارة الاقتصاد الوطني الفلسطيني</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
