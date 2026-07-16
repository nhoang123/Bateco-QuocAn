'use client'

import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import { IHomepageCustomer, IHomepageCustomers } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'

function IdentityPlate({
  customer,
  index,
  delay,
}: {
  customer: IHomepageCustomer
  index: number
  delay: number
}) {
  return (
    <Reveal
      as='article'
      animation='drift-right'
      delay={delay}
      y={48}
      amount={0.12}
      className={cn(
        'group relative flex min-h-[26rem] min-w-[15rem] flex-1 flex-col justify-between overflow-hidden',
        'border-r border-brand-ink/10 last:border-r-0',
        'bg-white',
        'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        'hover:bg-[#f3f6f4]',
        'xsm:min-h-[22rem] xsm:min-w-[78vw] xsm:snap-center xsm:border-r-0 xsm:border-b',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-[0.55rem] right-[-0.1rem]',
          'font-display text-[8.5rem] font-semibold leading-none tracking-tight text-brand-ink/[0.05]',
          'transition-colors duration-500 group-hover:text-brand-moss/20',
          'xsm:text-[7rem]',
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className='relative z-[1] flex items-start justify-between px-[1.15rem] pt-[1.15rem]'>
        <span className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-moss'>
          {customer?.subtitle}
        </span>
        <span className='font-display text-[0.95rem] font-semibold text-brand-ink/30 transition-colors duration-500 group-hover:text-brand-moss'>
          {customer?.title}
        </span>
      </div>

      <div className='relative z-[1] flex flex-1 items-center justify-center px-[1.25rem]'>
        <div
          className={cn(
            'flex size-[8.5rem] items-center justify-center',
            'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:scale-[1.05]',
            'xsm:size-[7.5rem]',
          )}
        >
          <Image
            src={customer?.image}
            alt={customer?.title}
            width={160}
            height={120}
            className='h-full w-full object-contain'
          />
        </div>
      </div>

      <div className='relative z-[1] px-[1.15rem] pb-[1.35rem]'>
        <h3 className='max-w-[11rem] font-display text-[1.2rem] font-semibold uppercase leading-[1.15] tracking-wide text-brand-ink'>
          {customer?.title}
        </h3>
        <span
          aria-hidden
          className={cn(
            'mt-[0.85rem] block h-[0.12rem] w-[2rem] origin-left bg-brand-moss',
            'scale-x-50 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:scale-x-100',
          )}
        />
      </div>
    </Reveal>
  )
}

export default function Customers({ data }: { data: IHomepageCustomers }) {
  return (
    <section
      className='relative overflow-hidden bg-[#e7ebe8] text-brand-ink'
      aria-labelledby='customers-heading'
    >
      <Container className='relative z-[1] pt-[3.25rem] xsm:pt-[2.25rem]'>
        <Reveal className='mb-[1.75rem] grid grid-cols-[1fr_auto] items-end gap-[1.5rem] xsm:mb-[1.25rem] xsm:grid-cols-1'>
          <div>
            <p className='mb-[0.45rem] font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
              {data?.subtitle}
            </p>
            <h2
              id='customers-heading'
              className='max-w-[26rem] font-display text-[2.5rem] font-semibold uppercase leading-[1.02] tracking-wide text-brand-ink xsm:text-[1.75rem]'
            >
              {data?.title}
            </h2>
          </div>
          <p className='max-w-[24rem] pb-[0.2rem] text-right font-sans text-[0.875rem] leading-relaxed text-brand-ink/55 xsm:max-w-none xsm:text-left'>
            {data?.desc}
          </p>
        </Reveal>
      </Container>

      <div className='relative z-[1] mx-auto w-full max-w-[95rem] overflow-hidden pb-[3.5rem] xsm:overflow-visible xsm:pb-[2.5rem]'>
        <div
          className={cn(
            'flex border-y border-brand-ink/10',
            'xsm:snap-x xsm:snap-mandatory xsm:overflow-x-auto xsm:border-x-0',
          )}
        >
          {Array.isArray(data?.customer_array) &&
            data?.customer_array.length > 0 &&
            data?.customer_array?.map((customer, index) => (
              <IdentityPlate
                key={index}
                customer={customer}
                index={index}
                delay={index * 0.14}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
