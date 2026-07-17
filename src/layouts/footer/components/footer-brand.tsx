import Image from 'next/image'

import { Link } from '@/i18n/navigation'

type FooterBrandProps = {
  logoSrc?: string
  description?: string
}

export function FooterBrand({ logoSrc, description }: FooterBrandProps) {
  return (
    <div className='max-w-[28rem]'>
      <Link
        href='/'
        className='inline-flex items-center gap-[0.7rem]'
        aria-label='Bateco Quốc An'
      >
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt=''
            width={44}
            height={44}
            className='size-[2.5rem] object-contain'
            unoptimized
          />
        ) : null}
        <span className='font-display text-[1.35rem] font-semibold uppercase tracking-wide'>
          Bateco Quốc An
        </span>
      </Link>
      {description ? (
        <p className='mt-[1rem] font-sans text-[0.9rem] leading-relaxed text-brand-ink/60'>
          {description}
        </p>
      ) : null}
    </div>
  )
}
