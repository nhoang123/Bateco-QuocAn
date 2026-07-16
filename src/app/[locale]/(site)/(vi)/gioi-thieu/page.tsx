import HomepageModule from '@/modules/home'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default function HomePage() {
  return <HomepageModule />
}
