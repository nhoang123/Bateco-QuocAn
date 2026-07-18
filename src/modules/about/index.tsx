import { IHomepageAreasOfOperation } from '@/interfaces/homepage.interface'
import AboutBanner from '@/modules/about/components/banner'
import Certifications from '@/modules/about/components/certifications'
import AboutIntro from '@/modules/about/components/intro'
import PartnerCta from '@/modules/about/components/partner-cta'
import RevenueChart from '@/modules/about/components/revenue-chart'
import ActivityAreas from '@/modules/home/activity-areas'

const AboutModule = ({ areasOfOperation }: { areasOfOperation: IHomepageAreasOfOperation }) => {
  return (
    <>
      <AboutBanner />
      <AboutIntro />
      <ActivityAreas data={areasOfOperation} />
      <RevenueChart />
      <Certifications />
      <PartnerCta />
    </>
  )
}

export default AboutModule
