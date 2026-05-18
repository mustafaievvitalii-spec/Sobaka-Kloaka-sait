import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DocExpert — відновлення посвідчення водія дистанційно',
  description:
    'Юридичний супровід дистанційного відновлення посвідчення водія для українців за кордоном: внесення в Дію, перевипуск пластику, виправлення помилок у базі МВС.',
  keywords: [
    'відновлення посвідчення водія',
    'посвідчення водія в Дії',
    'українці за кордоном',
    'перевипуск посвідчення водія',
    'DocExpert',
  ],
  openGraph: {
    title: 'DocExpert — дистанційне відновлення посвідчення водія',
    description:
      'Професійний супровід українців за кордоном: верифікація, внесення посвідчення в Дію та перевипуск пластикового документа.',
    url: 'https://docexpert.ua',
    siteName: 'DocExpert',
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocExpert — посвідчення водія дистанційно',
    description:
      'Перевірка ситуації, юридичний супровід та доставка документів у Європу.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#07111f',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
