'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { useScrollHeader } from '@/hooks/useScrollHeader'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import type { IHeader } from '@/interfaces/header.interface'
import Container from '@/layouts/container'
import {
  mapHeaderNavigations,
  type HeaderMegaPanel,
  type HeaderNavItem,
} from '@/layouts/header/map-header-nav'
import { cn } from '@/lib/utils'

type LocaleCode = 'vi' | 'en'

type HeaderProps = {
  data?: IHeader | null
  className?: string
}

const EASE = [0.32, 0.72, 0, 1] as const
const FALLBACK_LOGO = '/images/logo.png'

function isNavActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function MegaMenuPanel({ panel }: { panel: HeaderMegaPanel }) {
  return (
    <Container className='grid grid-cols-[minmax(0,22rem)_1fr] gap-x-[4rem] py-[2.25rem] xsm:grid-cols-1 xsm:gap-y-[1.5rem] xsm:py-[1.5rem]'>
      <div>
        {panel.eyebrow ? (
          <p className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-moss'>
            {panel.eyebrow}
          </p>
        ) : null}
        {panel.description ? (
          <p className='mt-[0.85rem] max-w-[20rem] font-sans text-[0.9rem] leading-relaxed text-white/60'>
            {panel.description}
          </p>
        ) : null}
      </div>

      <div>
        <p className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/40'>
          {panel.linksTitle}
        </p>
        <ul className='mt-[0.85rem] columns-2 gap-x-[3rem] xsm:columns-1'>
          {panel.links.map((link, linkIndex) => (
            <li
              key={`${link.href}-${linkIndex}`}
              className='mb-[0.55rem] break-inside-avoid'
            >
              <Link
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className={cn(
                  'group/mega inline-flex items-baseline gap-[0.45rem]',
                  'font-display text-[1.05rem] font-medium uppercase tracking-wide text-white/80',
                  'transition-colors duration-300 hover:text-white',
                )}
              >
                <span className='text-brand-moss transition-transform duration-300'>+</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

function NavItemLink({
  item,
  isActive,
  isOpen,
  onMouseEnter,
}: {
  item: HeaderNavItem
  isActive: boolean
  isOpen?: boolean
  onMouseEnter?: () => void
}) {
  return (
    <Link
      href={item.href}
      target={item.target}
      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
      aria-expanded={item.mega ? isOpen : undefined}
      aria-haspopup={item.mega ? true : undefined}
      onMouseEnter={onMouseEnter}
      className={cn(
        'group relative py-[0.35rem] font-display text-[0.9375rem] font-medium uppercase tracking-wide text-white/90',
        'transition-colors duration-300 hover:text-white',
        (isActive || isOpen) && 'font-semibold text-white',
      )}
    >
      {item.label}
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-0 -bottom-[0.15rem] mx-auto h-[0.15rem] w-[70%] origin-center rounded-full bg-brand-moss',
          'scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'group-hover:scale-x-100',
          (isActive || isOpen) && 'scale-x-100',
        )}
      />
    </Link>
  )
}

export default function Header({ data, className }: HeaderProps) {
  const [isPending, startTransition] = useTransition()
  const [openMegaId, setOpenMegaId] = useState<string | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const locale = useLocale() as LocaleCode
  const pathname = usePathname()
  const router = useRouter()
  const headerRef = useRef<HTMLElement>(null)

  const navItems = useMemo(
    () => mapHeaderNavigations(data?.navigations ?? []),
    [data?.navigations],
  )
  const logoSrc = data?.logo || FALLBACK_LOGO

  const openMega = openMegaId ? navItems.find((item) => item.id === openMegaId)?.mega : undefined

  const [cachedMega, setCachedMega] = useState<{ id: string; panel: HeaderMegaPanel } | null>(null)
  if (openMegaId && openMega && cachedMega?.id !== openMegaId) {
    setCachedMega({ id: openMegaId, panel: openMega })
  }

  const isMegaOpen = Boolean(openMegaId && openMega)
  const activeMega = openMegaId && openMega ? { id: openMegaId, panel: openMega } : cachedMega
  const heightPanel = activeMega?.panel
  const visibleId = isMegaOpen ? openMegaId : null
  const visiblePanel = isMegaOpen ? openMega : null

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openMenu = (id: string) => {
    clearCloseTimer()
    setOpenMegaId(id)
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setOpenMegaId(null)
    }, 180)
  }

  const closeMenu = () => {
    clearCloseTimer()
    setOpenMegaId(null)
  }

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    if (openMegaId) setOpenMegaId(null)
  }

  useEffect(() => {
    if (!openMegaId) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearCloseTimer()
        setOpenMegaId(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openMegaId])

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  const switchLocale = (nextLocale: LocaleCode) => {
    if (nextLocale === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  useScrollHeader(headerRef as React.RefObject<HTMLElement>)

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={scheduleClose}
        style={{ viewTransitionName: 'site-header' }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 w-full border-b border-brand-moss/25',
          'bg-brand-ink/55 backdrop-blur-md transition-[background-color,transform] duration-500',
          openMegaId && 'bg-brand-ink/95 backdrop-blur-xl',
          className,
        )}
      >
        <Container className='grid h-[var(--header-height)] grid-cols-[1fr_auto_1fr] items-center'>
          <Link
            href='/'
            className='relative flex shrink-0 items-center justify-self-start'
            aria-label='Bateco Quốc An'
            onMouseEnter={scheduleClose}
          >
            <Image
              src={logoSrc}
              alt='Bateco Quốc An'
              width={56}
              height={56}
              className='size-[4.5rem] object-contain'
              priority
              unoptimized
            />
          </Link>

          <nav
            aria-label='Main'
            className='flex items-center gap-[2rem] justify-self-center xsm:hidden'
          >
            {navItems.map((item) => {
              const isActive = isNavActive(pathname, item.href)
              const isOpen = openMegaId === item.id
              const hasMega = Boolean(item.mega)

              if (!hasMega) {
                return (
                  <NavItemLink
                    key={item.id}
                    item={item}
                    isActive={isActive}
                    onMouseEnter={scheduleClose}
                  />
                )
              }

              return (
                <div
                  key={item.id}
                  className='relative'
                  onMouseEnter={() => openMenu(item.id)}
                >
                  <NavItemLink
                    item={item}
                    isActive={isActive}
                    isOpen={isOpen}
                  />
                </div>
              )
            })}
          </nav>

          <div
            className='flex items-center justify-self-end gap-[1.25rem] xsm:gap-[1rem]'
            onMouseEnter={scheduleClose}
          >
            <div
              className={cn(
                'flex items-center gap-[0.45rem] font-display text-[0.95rem] font-semibold uppercase tracking-[0.06em]',
                isPending && 'pointer-events-none opacity-70',
              )}
              aria-label='Language'
            >
              <button
                type='button'
                onClick={() => switchLocale('vi')}
                aria-pressed={locale === 'vi'}
                className={cn(
                  'cursor-pointer transition-opacity duration-300 hover:opacity-100',
                  locale === 'vi' ? 'text-white' : 'text-white/55',
                )}
              >
                VN
              </button>
              <span
                aria-hidden
                className='text-white/40'
              >
                |
              </span>
              <button
                type='button'
                onClick={() => switchLocale('en')}
                aria-pressed={locale === 'en'}
                className={cn(
                  'cursor-pointer transition-opacity duration-300 hover:opacity-100',
                  locale === 'en' ? 'text-white' : 'text-white/55',
                )}
              >
                EN
              </button>
            </div>
          </div>
        </Container>

        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]',
            isMegaOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div
            className='min-h-0 overflow-hidden'
            onMouseEnter={clearCloseTimer}
          >
            <div
              className={cn(
                'relative border-t transition-colors duration-300',
                isMegaOpen ? 'border-white/10' : 'border-transparent',
              )}
            >
              <div
                className='pointer-events-none invisible'
                aria-hidden
              >
                {heightPanel ? <MegaMenuPanel panel={heightPanel} /> : null}
              </div>

              <AnimatePresence initial={false}>
                {isMegaOpen && visibleId && visiblePanel ? (
                  <motion.div
                    key={visibleId}
                    className='absolute inset-x-0 top-0'
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 6 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(8px)', y: -4 }}
                    transition={{ duration: 0.48, ease: EASE }}
                  >
                    <MegaMenuPanel panel={visiblePanel} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMegaOpen ? (
          <motion.button
            type='button'
            aria-label='Đóng menu'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className='fixed inset-0 z-40 cursor-default bg-brand-ink/50 backdrop-blur-md'
            onClick={closeMenu}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}
