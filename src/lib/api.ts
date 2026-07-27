import type { LaravelPaginated, NewsItem } from '@/types/news';

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

// جلب قائمة الأخبار
export function getNewsList(page = 1, lang: 'ar' | 'en' = 'ar') {
  return apiFetch<LaravelPaginated<NewsItem>>(`/news?page=${page}&lang=${lang}`);
}

// جلب خبر واحد
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const res = await apiFetch<{ data: NewsItem }>(`/news/${slug}`);
    return res.data;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}

export { ApiError };
