import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pingAR = localFont({
  src: [
    { path: '../../public/fonts/PingAR+LT-Hairline.otf', weight: '100', style: 'normal' },
    { path: '../../public/fonts/PingAR+LT-Thin.otf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/PingAR+LT-ExtraLight.otf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/PingAR+LT-Light.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/PingAR+LT-Regular.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/PingAR+LT-Medium.otf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/PingAR+LT-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/PingAR+LT-Heavy.otf', weight: '800', style: 'normal' },
    { path: '../../public/fonts/PingAR+LT-Black.otf', weight: '900', style: 'normal' }
  ],
  variable: '--font-pingar',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'وزارة الإقتصاد الوطني',
  description: 'الموقع الإعلامي الخاص بوزارة الإقتصاد الوطني'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ar' dir='rtl'>
      <body className={`${pingAR.className} antialiased`}>{children}</body>
    </html>
  );
}
