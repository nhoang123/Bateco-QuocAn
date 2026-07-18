'use client'

import { Aperture, Compass, Package, Radio, Waves, Zap, type LucideIcon } from 'lucide-react'

import { InfiniteSlider } from '@/components/shared/infinite-slider'
import { cn } from '@/lib/utils'
import type {
  AboutBannerFeature,
  AboutBannerIconName,
} from '@/modules/about/lib/banner-data'

const FEATURE_ICONS: Record<AboutBannerIconName, LucideIcon> = {
  compass: Compass,
  radio: Radio,
  waves: Waves,
  aperture: Aperture,
  zap: Zap,
  package: Package,
}

type FeatureStripProps = {
  features: AboutBannerFeature[]
}

function FeatureItem({ feature }: { feature: AboutBannerFeature }) {
  const Icon = FEATURE_ICONS[feature.icon]

  return (
    <div className='flex items-center gap-[1rem]'>
      <div className='flex items-center gap-[0.65rem]'>
        <span
          className={cn(
            'inline-flex size-[2rem] shrink-0 items-center justify-center',
            'border border-white/35 text-white/80',
          )}
          aria-hidden
        >
          <Icon
            className='size-[1rem]'
            strokeWidth={1.35}
          />
        </span>
        <span className='whitespace-nowrap font-sans text-[0.8rem] font-medium tracking-wide text-white/85 xsm:text-[0.75rem]'>
          {feature.label}
        </span>
      </div>
      <span
        className='size-[0.28rem] shrink-0 rounded-full bg-white/35'
        aria-hidden
      />
    </div>
  )
}

export function FeatureStrip({ features }: FeatureStripProps) {
  if (!features.length) return null

  return (
    <div
      className='relative z-10 border-t border-white/[0.1] bg-brand-ink/70 py-[1.1rem] backdrop-blur-md xsm:py-[0.95rem]'
      aria-label='Lĩnh vực năng lực'
    >
      <InfiniteSlider
        gap={48}
        speed={40}
        speedOnHover={18}
      >
        {features.map((feature) => (
          <FeatureItem
            key={feature.label}
            feature={feature}
          />
        ))}
      </InfiniteSlider>
    </div>
  )
}
