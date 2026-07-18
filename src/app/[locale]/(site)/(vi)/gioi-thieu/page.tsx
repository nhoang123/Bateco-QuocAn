import AboutModule from '@/modules/about'
import homepageService from '@/services/homepage'

const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const acfData = await homepageService.getAcfData(locale)
  return <AboutModule areasOfOperation={acfData?.acf?.areas_of_operation} />
}

export default AboutPage
