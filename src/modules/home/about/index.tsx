import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import { Link } from '@/i18n/navigation'
import { IHomepageAbout } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'

function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group/link inline-flex items-center gap-[0.35rem] font-sans text-[0.875rem] tracking-wide text-brand-ink',
        'underline decoration-brand-ink/35 underline-offset-[0.28rem]',
        'transition-colors duration-300 hover:decoration-brand-ink',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className='size-[0.95rem] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/link:translate-x-[0.1rem] group-hover/link:-translate-y-[0.1rem]'
        strokeWidth={1.5}
      />
    </Link>
  )
}

export default function AboutIntro({ data }: { data: IHomepageAbout }) {
  return (
    <section
      className='bg-[#e7ebe8] text-brand-ink'
      aria-labelledby='about-intro-heading'
    >
      <Container className='py-[3.5rem] xsm:py-[2.5rem]'>
        <Reveal
          as='header'
          className='flex items-end justify-between gap-[1.5rem] border-b border-brand-ink/15 pb-[1.15rem]'
        >
          <h2
            id='about-intro-heading'
            className='font-display text-[2.75rem] font-semibold uppercase leading-none tracking-wide xsm:text-[1.85rem]'
          >
            {data?.title}
          </h2>
          <TextLink
            href={data?.link?.url}
            className='mb-[0.35rem] shrink-0 xsm:mb-[0.15rem]'
          >
            {data?.link?.title}
          </TextLink>
        </Reveal>

        <div
          className={cn(
            'grid grid-cols-2 items-start gap-x-[3.5rem] pt-[2.25rem]',
            'xsm:grid-cols-1 xsm:gap-y-[1.75rem] xsm:pt-[1.75rem]',
          )}
        >
          <Reveal
            className='flex flex-col'
            delay={0.08}
          >
            <p className='font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-brand-ink/55'>
              {data?.subtitle}
            </p>

            <h3 className='mt-[1rem] max-w-[28rem] font-display text-[2.15rem] font-semibold uppercase leading-[1.08] tracking-wide xsm:text-[1.55rem]'>
              {data?.title}
            </h3>

            <div className='mt-[1.25rem] flex max-w-[34rem] flex-col gap-[1rem]'>
              <div
                className='font-sans text-[0.95rem] leading-relaxed text-brand-ink/75'
                dangerouslySetInnerHTML={{ __html: data?.desc }}
              />
            </div>

            <div className='mt-[1.75rem] grid grid-cols-2 gap-[1.5rem] xsm:grid-cols-1 xsm:gap-[1.25rem]'>
              {Array.isArray(data?.detail) &&
                data?.detail.length > 0 &&
                data?.detail?.map((item) => (
                  <div key={item?.title}>
                    <h4 className='font-sans text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-brand-moss'>
                      {item?.title}
                    </h4>
                    <p className='mt-[0.55rem] font-sans text-[0.875rem] leading-relaxed text-brand-ink/70'>
                      {item?.desc}
                    </p>
                  </div>
                ))}
            </div>
          </Reveal>

          <Reveal
            className='relative h-full min-h-[22rem] w-full overflow-hidden bg-brand-ink/10 xsm:min-h-[18rem]'
            delay={0.16}
            y={36}
          >
            <Image
              src={data?.image}
              alt={data?.title}
              fill
              sizes='(max-width: 639px) 100vw, 48vw'
              className='object-cover'
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
