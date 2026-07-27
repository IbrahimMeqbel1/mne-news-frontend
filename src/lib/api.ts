import type { LaravelPaginated, NewsItem } from '@/types/news';

const DEFAULT_API_ORIGIN = 'http://185.137.122.247:8000';
const API_ORIGIN = (process.env.API_URL ?? DEFAULT_API_ORIGIN).replace(/\/$/, '');
const API_BASE_URL = API_ORIGIN.endsWith('/api') ? API_ORIGIN : `${API_ORIGIN}/api`;

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
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: revalidateSeconds }
  });

  if (!response.ok) {
    throw new ApiError(response.status, `فشل الطلب: ${path} (${response.status})`);
  }

  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    throw new ApiError(response.status, `استجابة غير صالحة من خادم الأخبار: ${path}`);
  }

  return response.json() as Promise<T>;
}

// جلب قائمة الأخبار (مع صفحات)
export function getNewsList(page = 1, lang: 'ar' | 'en' = 'ar') {
  return apiFetch<LaravelPaginated<NewsItem>>(`/news?page=${page}&lang=${lang}`);
}

// جلب خبر واحد عبر الـ slug
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const firstPage = await getNewsList(1);
  const firstMatch = firstPage.data.find((item) => item.slug === slug);

  if (firstMatch) return firstMatch;

  for (let page = 2; page <= firstPage.meta.last_page; page += 1) {
    const result = await getNewsList(page);
    const match = result.data.find((item) => item.slug === slug);

    if (match) return match;
  }

  return null;
}

export { ApiError };
