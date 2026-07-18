import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import { cn } from '@/lib/utils'
import { PartnerCtaAction } from '@/modules/about/components/partner-cta/partner-cta-action'
import { PartnerCtaBackground } from '@/modules/about/components/partner-cta/partner-cta-background'
import { PartnerCtaCorners } from '@/modules/about/components/partner-cta/partner-cta-corners'
import { ABOUT_PARTNER_CTA, type AboutPartnerCtaData } from '@/modules/about/lib/partner-cta-data'

type PartnerCtaProps = {
  data?: AboutPartnerCtaData
}

export default function PartnerCta({ data = ABOUT_PARTNER_CTA }: PartnerCtaProps) {
  return (
    <section
      className='relative overflow-hidden border-t border-white/[0.08] bg-brand-ink'
      aria-labelledby='about-partner-cta-heading'
    >
      <div
        aria-hidden
        className='absolute inset-0'
      >
        <Image
          src={data.image}
          alt=''
          fill
          sizes='100vw'
          className='object-cover object-[center_35%]'
        />
        <PartnerCtaBackground />
      </div>

      <div className='relative z-[1] mx-auto w-full max-w-[95rem] px-[1.25rem] py-[4.5rem] xsm:px-4 xsm:py-[3rem]'>
        <div className='relative border border-white/10 bg-brand-ink/20 px-[2rem] py-[2.25rem] backdrop-blur-[2px] xsm:px-[1.15rem] xsm:py-[1.65rem]'>
          <PartnerCtaCorners />

          <div
            className={cn(
              'flex items-end justify-between gap-[3rem]',
              'xsm:flex-col xsm:items-start xsm:gap-[1.75rem]',
            )}
          >
            <div className='max-w-[44rem]'>
              <Reveal y={18}>
                <p className='font-mono text-[0.68rem] font-medium uppercase tracking-[0.24em] text-brand-moss'>
                  {data.signal}
                </p>
              </Reveal>

              <Reveal
                delay={0.05}
                y={24}
              >
                <h2
                  id='about-partner-cta-heading'
                  className='mt-[1rem] font-display text-[2.65rem] font-semibold uppercase leading-[1.2] tracking-wide text-white xsm:mt-[0.75rem] xsm:text-[1.75rem]'
                >
                  {data.title}
                </h2>
              </Reveal>

              <Reveal
                delay={0.1}
                y={20}
              >
                <p className='mt-[1.1rem] max-w-[36rem] font-sans text-[0.95rem] leading-[1.72] text-white/78 xsm:mt-[0.85rem] xsm:text-[0.88rem]'>
                  {data.description}
                </p>
              </Reveal>

              <Reveal
                delay={0.14}
                y={16}
              >
                <div className='mt-[1.75rem] flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 xsm:mt-[1.35rem] xsm:pt-4'>
                  <span className='font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/40'>
                    Triển khai thực địa
                  </span>
                  <span
                    aria-hidden
                    className='size-[0.2rem] rounded-full bg-brand-moss/60'
                  />
                  <span className='font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/40'>
                    Bảo mật cấp nhiệm vụ
                  </span>
                  <span
                    aria-hidden
                    className='size-[0.2rem] rounded-full bg-brand-moss/60'
                  />
                  <span className='font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-moss/85'>
                    Sẵn sàng vận hành
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal
              delay={0.12}
              y={20}
              className='shrink-0 xsm:w-full'
            >
              <PartnerCtaAction
                href={data.cta.href}
                label={data.cta.label}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
