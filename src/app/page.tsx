import { getNewsList } from '@/lib/api';
import Link from 'next/link';

import { Search, Calendar, ChevronLeft, ChevronRight, Globe, Phone, MapPin } from 'lucide-react';

export default async function Home() {
  let result = await getNewsList(1).catch(() => null);
  const newsItems = result?.data?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-[#FDF8F0]" dir="rtl">
      {/* Top Bar */}
      <div className="bg-[#1A1A1A] text-white py-2 text-[10px] md:text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> 129</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> فلسطين</span>
          </div>
          <div className="hidden md:block">
            <span>مرحباً بكم في وزارة الاقتصاد الوطني الفلسطيني</span>
          </div>
          <div className="flex gap-4">
            <Globe size={14} className="cursor-pointer hover:text-yellow-500" />
            <span className="cursor-pointer hover:text-yellow-500">English</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#1A1A1A] text-white py-4 md:py-6 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 md:gap-4">
            <img src="/assets/logo.svg" alt="الشعار" className="w-12 h-12 md:w-16 md:h-16 invert" />
            <div className="text-right">
              <p className="font-bold text-lg md:text-xl">وزارة الاقتصاد الوطني</p>
              <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest">Ministry Of National Economy</p>
            </div>
          </Link>
          
          <nav className="hidden lg:flex gap-8 font-medium">
            <Link href="/" className="text-yellow-500 border-b-2 border-yellow-500">الرئيسية</Link>
            <Link href="/news" className="hover:text-yellow-500 transition">المركز الإعلامي</Link>
            <Link href="/services" className="hover:text-yellow-500 transition">الخدمات الإلكترونية</Link>
            <Link href="/about" className="hover:text-yellow-500 transition">عن الوزارة</Link>
            <Link href="/contact" className="hover:text-yellow-500 transition">تواصل معنا</Link>
          </nav>

          <button className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1A1A1A] py-20 md:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <p className="text-yellow-500 font-bold mb-6 tracking-widest uppercase text-sm">اقتصاد أقوى · مجتمع أكثر صمودًا</p>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              نبني اقتصادًا وطنياً <br/> 
              <span className="text-yellow-500">يحمي الناس</span> ويدعم الإنتاج
            </h1>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl leading-loose">
              نتطلّع ببيئة الأعمال، نحمي حقوق المستهلك، وندعم القطاعات الإنتاجية الفلسطينية من أجل مستقبل اقتصادي زاهر.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/services" className="bg-yellow-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20">
                استعرض الخدمات
              </Link>
              <Link href="/news" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all">
                المركز الإعلامي
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[40px] md:rounded-t-[80px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-yellow-600 font-bold mb-2">المركز الإعلامي</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">آخر الأخبار والمستجدات</h2>
            </div>
            <Link href="/news" className="flex items-center gap-2 font-bold text-gray-900 hover:text-yellow-600 transition group">
              عرض جميع الأخبار
              <ChevronLeft className="group-hover:-translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {newsItems.map((item: any) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {item.cover_image ? (
                    <img 
                      src={item.cover_image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-900">
                      أخبار
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                    <Calendar size={14} />
                    <span>{new Date(item.publish_date).toLocaleDateString('ar-PA')}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-600 transition-colors line-clamp-2 leading-relaxed">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-loose">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
