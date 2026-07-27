import type { LaravelPaginated, NewsItem, SingleResourceResponse } from '@/types/news';

// عنوان السيرفر الخلفي (Laravel)
// عرّفه في ملف .env.local باسم NEXT_PUBLIC_API_URL
// مثال: NEXT_PUBLIC_API_URL=http://185.137.122.247:3002
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://185.137.122.247:3002';

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * دالة عامة لجلب البيانات من الـ API مع إعادة التحقق (ISR)
 * revalidateSeconds: كل كم ثانية يعيد Next.js طلب البيانات من جديد
 */
async function apiFetch<T>(path: string, revalidateSeconds = 60): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: revalidateSeconds }
  });

  if (!res.ok) {
    throw new ApiError(res.status, `فشل الطلب: ${path} (${res.status})`);
  }

  return res.json() as Promise<T>;
}

// جلب قائمة الأخبار (مع صفحات)
export function getNewsList(page = 1, lang: 'ar' | 'en' = 'ar') {
  return apiFetch<LaravelPaginated<NewsItem>>(`/news?page=${page}&lang=${lang}`);
}

// جلب خبر واحد عبر الـ slug
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const res = await apiFetch<SingleResourceResponse<NewsItem>>(`/news/${slug}`);
    return res.data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}

export { ApiError };
