import { Reveal } from '@/components/shared/reveal'
import Container from '@/layouts/container'
import { BannerCta } from '@/modules/about/components/banner/banner-cta'
import type { AboutBannerData } from '@/modules/about/lib/banner-data'

type BannerComponentProps = {
  data: AboutBannerData
}

export function BannerComponent({ data }: BannerComponentProps) {
  return (
    <Container className='relative z-10 flex flex-1 items-center pb-[3.5rem] pt-[4.5rem] xsm:pb-[2.5rem] xsm:pt-[3rem]'>
      <div className='max-w-[42rem] xsm:max-w-none'>
        <Reveal y={20}>
          <p className='mb-[0.75rem] font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
            {data.eyebrow}
          </p>
        </Reveal>

        <Reveal
          delay={0.06}
          y={28}
        >
          <h1
            id='about-banner-heading'
            className='font-display text-[3.25rem] font-semibold uppercase leading-[1.12] tracking-wide text-white xsm:text-[2.15rem]'
          >
            {data.title}
          </h1>
        </Reveal>

        <Reveal
          delay={0.12}
          y={24}
        >
          <p className='mt-[1.15rem] max-w-[36rem] font-sans text-[1rem] leading-[1.7] text-white/85 xsm:mt-[0.9rem] xsm:text-[0.9rem] xsm:leading-[1.65]'>
            {data.description}
          </p>
        </Reveal>

        <Reveal
          delay={0.18}
          y={20}
          className='mt-[1.75rem] flex flex-wrap items-center gap-[0.75rem] xsm:mt-[1.35rem]'
        >
          <BannerCta
            href={data.primaryCta.href}
            variant='solid'
          >
            {data.primaryCta.label}
          </BannerCta>
          <BannerCta
            href={data.secondaryCta.href}
            variant='ghost'
          >
            {data.secondaryCta.label}
          </BannerCta>
        </Reveal>
      </div>
    </Container>
  )
}
