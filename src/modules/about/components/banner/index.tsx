import Image from 'next/image'

import { cn } from '@/lib/utils'
import { BannerComponent } from '@/modules/about/components/banner/banner'
import { FeatureStrip } from '@/modules/about/components/banner/feature-strip'
import {
  ABOUT_BANNER,
  ABOUT_HERO_HEIGHT,
  type AboutBannerData,
} from '@/modules/about/lib/banner-data'

type AboutBannerProps = {
  data?: AboutBannerData
}

export default function AboutBanner({ data = ABOUT_BANNER }: AboutBannerProps) {
  return (
    <section
      className={cn('relative flex flex-col overflow-hidden bg-brand-ink', ABOUT_HERO_HEIGHT)}
      aria-labelledby='about-banner-heading'
    >
      <div className='absolute inset-0'>
        <Image
          src={data.image}
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/55 to-brand-ink/25'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/20 to-brand-ink/40'
        />
      </div>

      <BannerComponent data={data} />
      <FeatureStrip features={data.features} />
    </section>
  )
}
