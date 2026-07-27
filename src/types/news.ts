// أنواع البيانات القادمة من NewsApiController (Laravel)
// مطابقة تمامًا لبنية NewsResource في الباك إند

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string | null; // HTML قادم من محرر Twill
  publish_date: string | null; // ISO date string
  cover_image: string | null; // رابط كامل للصورة
  dir: 'rtl' | 'ltr';
  lang: string;
}

// شكل الاستجابة القياسي لـ Laravel عند استخدام ->paginate()
export interface LaravelPaginated<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}
