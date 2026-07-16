import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import type { IFooter } from '@/interfaces/footer.interface'
import Container from '@/layouts/container'
import { decodeHtmlEntities } from '@/lib/decode-html-entities'
import { cn } from '@/lib/utils'

type FooterLink = {
  label: string
  href: string
  target?: string
}

type FooterColumn = {
  title: string
  links: FooterLink[]
}

type FooterContact = {
  title: string
  label: string
  href: string
  target?: string
}

type FooterProps = {
  data?: IFooter | null
}

function mapTarget(target: string): string | undefined {
  const value = target?.trim()
  return value || undefined
}

function mapFooterColumns(data?: IFooter | null): FooterColumn[] {
  if (!Array.isArray(data?.menu)) return []

  return data.menu.map((section) => ({
    title: decodeHtmlEntities(section.title),
    links: Array.isArray(section.link_array)
      ? section.link_array.map(({ link }) => ({
        label: decodeHtmlEntities(link.title),
        href: link.url || '/',
        target: mapTarget(link.target),
      }))
      : [],
  }))
}

function mapFooterContacts(data?: IFooter | null): FooterContact[] {
  if (!Array.isArray(data?.contact)) return []

  return data.contact.map((item) => ({
    title: decodeHtmlEntities(item.title),
    label: decodeHtmlEntities(item.link.title),
    href: item.link.url || '/',
    target: mapTarget(item.link.target),
  }))
}

function FooterCta({
  href,
  target,
  children,
  variant = 'solid',
}: {
  href: string
  target?: string
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={cn(
        'group/cta inline-flex items-center gap-[0.4rem]',
        'px-[1.2rem] py-[0.75rem] font-display text-[0.8rem] font-semibold uppercase tracking-[0.1em]',
        'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        variant === 'solid'
          ? 'bg-brand-ink text-white hover:bg-brand'
          : 'border border-brand-ink/25 text-brand-ink hover:border-brand-moss hover:text-brand-moss',
      )}
    >
      {children}
      <ArrowUpRight
        className='size-[0.85rem] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:translate-x-[0.08rem] group-hover/cta:-translate-y-[0.08rem]'
        strokeWidth={1.35}
      />
    </Link>
  )
}

function FooterNavColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h3 className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-moss'>
        {column.title}
      </h3>
      <ul className='mt-[1rem] space-y-[0.55rem]'>
        {column.links.map((link, index) => (
          <li key={`${link.href}-${index}`}>
            <Link
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={cn(
                'group/nav relative inline-block font-display text-[0.95rem] font-medium uppercase tracking-wide text-brand-ink/70',
                'transition-colors duration-300 hover:text-brand-ink',
              )}
            >
              {link.label}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-0 -bottom-[0.12rem] h-px origin-left bg-brand-moss',
                  'scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                  'group-hover/nav:scale-x-100',
                )}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer({ data }: FooterProps) {
  if (!data) return null

  const year = new Date().getFullYear()
  const logoSrc = data.logo
  const description = decodeHtmlEntities(data.desc)
  const contacts = mapFooterContacts(data)
  const columns = mapFooterColumns(data)
  const button1 = data.button_1
  const button2 = data.button_2

  return (
    <footer className='relative overflow-hidden border-t border-brand-ink/10 bg-[#e7ebe8] text-brand-ink'>
      <Container className='relative z-[1] pt-[3.75rem] xsm:pt-[2.75rem]'>
        <div
          className={cn(
            'flex items-end justify-between gap-[2rem] border-b border-brand-ink/10 pb-[2rem]',
            'xsm:flex-col xsm:items-start xsm:gap-[1.5rem] xsm:pb-[1.5rem]',
          )}
        >
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

          <div className='flex shrink-0 flex-wrap items-center gap-[0.65rem]'>
            {button1 ? (
              <FooterCta
                href={button1.url || '/'}
                target={mapTarget(button1.target)}
                variant='solid'
              >
                {decodeHtmlEntities(button1.title)}
              </FooterCta>
            ) : null}
            {button2 ? (
              <FooterCta
                href={button2.url || '/'}
                target={mapTarget(button2.target)}
                variant='ghost'
              >
                {decodeHtmlEntities(button2.title)}
              </FooterCta>
            ) : null}
          </div>
        </div>

        <div
          className={cn(
            'grid gap-x-[2.5rem] gap-y-[2rem] py-[2.25rem]',
            columns.length >= 2 ? 'grid-cols-3' : 'grid-cols-2',
            'xsm:grid-cols-1 xsm:gap-y-[1.75rem] xsm:py-[1.75rem]',
          )}
        >
          <div>
            <h3 className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-moss'>
              Liên hệ
            </h3>
            <dl className='mt-[1rem] space-y-[1rem]'>
              {contacts.map((item, index) => (
                <div key={`${item.href}-${index}`}>
                  <dt className='font-sans text-[0.65rem] uppercase tracking-[0.12em] text-brand-ink/40'>
                    {item.title}
                  </dt>
                  <dd className='mt-[0.3rem]'>
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className='font-sans text-[0.875rem] leading-relaxed text-brand-ink/75 transition-colors duration-300 hover:text-brand-ink'
                    >
                      {item.label}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {columns.map((column) => (
            <FooterNavColumn
              key={column.title}
              column={column}
            />
          ))}
        </div>

        <div className='flex items-center justify-between gap-[1rem] border-t border-brand-ink/10 py-[1.25rem] xsm:flex-col xsm:items-start xsm:gap-[0.5rem]'>
          <p className='font-sans text-[0.7rem] uppercase tracking-[0.1em] text-brand-ink/40'>
            © {year} Bateco Quốc An. All rights reserved.
          </p>
          <p className='font-sans text-[0.7rem] uppercase tracking-[0.1em] text-brand-ink/35'>
            Công nghiệp · An ninh · Quốc phòng
          </p>
        </div>
      </Container>
    </footer>
  )
}
