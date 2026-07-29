'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { NewsItem } from '@/types/news';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface NewsSliderProps {
  newsItems: NewsItem[];
}

export default function NewsSlider({ newsItems }: NewsSliderProps) {
  if (!newsItems || newsItems.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl shadow-2xl mb-12">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {newsItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-full w-full group">
              {item.cover_image ? (
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              
              {/* Content */}
              <div className="absolute bottom-0 right-0 left-0 p-8 md:p-16 z-20 text-white">
                <div className="container mx-auto">
                  <div className="max-w-3xl">
                    <span className="inline-block px-4 py-1 bg-yellow-600 text-white text-xs font-bold rounded-full mb-4">
                      أخبار مميزة
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-gray-200 text-lg mb-8 line-clamp-2 max-w-2xl">
                      {item.description}
                    </p>
                    <Link
                      href={`/news/${item.slug}`}
                      className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-600 hover:text-white transition-all"
                    >
                      اقرأ المزيد
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(0,0,0,0.3);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          background: #ca8a04 !important;
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
