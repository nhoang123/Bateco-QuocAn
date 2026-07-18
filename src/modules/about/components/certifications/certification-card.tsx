'use client'

import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import { cn } from '@/lib/utils'
import type { CertificationItem } from '@/modules/about/lib/certifications-data'

type CertificationCardProps = {
  item: CertificationItem
  index: number
}

export function CertificationCard({ item, index }: CertificationCardProps) {
  return (
    <Reveal
      as='article'
      delay={0.05 + index * 0.06}
      y={24}
      amount={0.15}
      className='group h-full'
    >
      <div
        className={cn(
          'flex h-full flex-col overflow-hidden border border-white/10 bg-white',
          'shadow-[0_14px_40px_rgba(0,0,0,0.18)]',
          'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'group-hover:-translate-y-1 group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.24)]',
        )}
      >
        <div className='relative aspect-[4/3] overflow-hidden bg-[#f0f3f1]'>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes='(max-width: 639px) 78vw, 33vw'
            className='object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/35 via-transparent to-transparent'
          />
          <span className='absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-ink'>
            {item.code}
          </span>
        </div>

        <div className='flex flex-1 flex-col px-4 py-3.5 text-brand-ink'>
          <p className='font-sans text-[0.72rem] uppercase tracking-[0.12em] text-brand-ink/45'>
            {item.issuer}
          </p>
          <h3 className='mt-1.5 font-display text-[1rem] font-semibold uppercase leading-tight tracking-wide'>
            {item.title}
          </h3>
          <div className='mt-auto flex items-center justify-between gap-3 pt-3'>
            <span className='font-sans text-[0.75rem] text-brand-ink/55'>Cấp năm</span>
            <span className='font-mono text-[0.8rem] font-medium tabular-nums text-brand-moss'>
              {item.year}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
