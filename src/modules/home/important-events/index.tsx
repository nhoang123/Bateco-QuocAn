'use client'

import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { ArticleCardItem } from '@/components/shared/article-card'
import { Reveal } from '@/components/shared/reveal'
import { Link } from '@/i18n/navigation'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/effect-fade'

/** Hardcoded — will be replaced by API data later */
const EVENTS: ArticleCardItem[] = [
  {
    id: 'evt-1',
    title: 'Ký kết hợp tác chiến lược với đối tác công nghệ quốc phòng',
    excerpt:
      'Bateco Quốc An và đối tác quốc tế thống nhất triển khai giải pháp tích hợp hệ thống cho dự án trọng điểm.',
    href: '/tin-tuc/ky-ket-hop-tac-chien-luoc',
    image: 'https://picsum.photos/seed/bateco-event-1/1400/900',
    date: '12.03.2026',
    category: 'Sự kiện',
  },
  {
    id: 'evt-2',
    title: 'Ra mắt trung tâm điều hành tác nghiệp tập trung',
    excerpt:
      'Nền tảng mới kết nối cảm biến, dữ liệu và quy trình ra quyết định theo thời gian thực.',
    href: '/tin-tuc/ra-mat-trung-tam-dieu-hanh',
    image: 'https://picsum.photos/seed/bateco-event-2/1400/900',
    date: '28.02.2026',
    category: 'Công nghệ',
  },
  {
    id: 'evt-3',
    title: 'Triển khai thành công hệ thống an ninh công trình trọng điểm',
    excerpt:
      'Dự án bàn giao đúng tiến độ với chuẩn vận hành an ninh cao và quy trình giám sát liên tục.',
    href: '/tin-tuc/trien-khai-he-thong-an-ninh',
    image: 'https://picsum.photos/seed/bateco-event-3/1400/900',
    date: '15.02.2026',
    category: 'Dự án',
  },
  {
    id: 'evt-4',
    title: 'Hội thảo chuyên đề về hạ tầng công nghiệp và an ninh',
    excerpt:
      'Chia sẻ kinh nghiệm triển khai cùng khách hàng, đối tác trong lĩnh vực công nghiệp – quốc phòng.',
    href: '/tin-tuc/hoi-thao-ha-tang-cong-nghiep',
    image: 'https://picsum.photos/seed/bateco-event-4/1400/900',
    date: '02.02.2026',
    category: 'Hội thảo',
  },
  {
    id: 'evt-5',
    title: 'Bateco Quốc An gia nhập liên minh đối tác công nghệ số',
    excerpt:
      'Mở rộng hệ sinh thái hợp tác để tăng tốc triển khai giải pháp số cho doanh nghiệp và tổ chức.',
    href: '/tin-tuc/gia-nhap-lien-minh-doi-tac',
    image: 'https://picsum.photos/seed/bateco-event-5/1400/900',
    date: '20.01.2026',
    category: 'Đối tác',
  },
]

const EASE = [0.32, 0.72, 0, 1] as const
const AUTOPLAY_DELAY_MS = 5500

function SectionLink({
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
        'group/link inline-flex items-center gap-[0.35rem] font-sans text-[0.875rem] tracking-wide text-white',
        'underline decoration-white/40 underline-offset-[0.28rem]',
        'transition-colors duration-300 hover:decoration-white',
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

function FeaturedCopy({ article, direction }: { article: ArticleCardItem; direction: 1 | -1 }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className='flex flex-col justify-center py-[0.5rem]'>
        <FeaturedCopyInner article={article} />
      </div>
    )
  }

  return (
    <AnimatePresence
      mode='wait'
      custom={direction}
    >
      <motion.div
        key={article.id}
        custom={direction}
        initial='enter'
        animate='center'
        exit='exit'
        variants={{
          enter: (dir: 1 | -1) => ({
            opacity: 0,
            x: dir * -36,
            y: 18,
            filter: 'blur(10px)',
          }),
          center: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.55,
              ease: EASE,
              staggerChildren: 0.07,
              delayChildren: 0.06,
            },
          },
          exit: (dir: 1 | -1) => ({
            opacity: 0,
            x: dir * 28,
            y: -12,
            filter: 'blur(8px)',
            transition: { duration: 0.35, ease: EASE },
          }),
        }}
        className='flex flex-col justify-center py-[0.5rem]'
      >
        <FeaturedCopyInner
          article={article}
          animated
        />
      </motion.div>
    </AnimatePresence>
  )
}

const copyItemVariants = {
  enter: { opacity: 0, y: 16, filter: 'blur(8px)' },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: EASE },
  },
  exit: { opacity: 0, y: -8, filter: 'blur(6px)', transition: { duration: 0.25 } },
}

function FeaturedCopyInner({
  article,
  animated = false,
}: {
  article: ArticleCardItem
  animated?: boolean
}) {
  const Wrapper = animated ? motion.div : 'div'
  const wrapperProps = animated ? { variants: copyItemVariants } : {}

  return (
    <>
      <Wrapper
        {...wrapperProps}
        className='flex items-center gap-[0.75rem]'
      >
        <time
          dateTime={article.date}
          className='font-sans text-[0.8rem] font-semibold tabular-nums tracking-wide text-white'
        >
          {article.date}
        </time>
        <span
          aria-hidden
          className='h-px w-[1.25rem] bg-brand-moss'
        />
        <span className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand-moss'>
          {article.category}
        </span>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className='mt-[1.15rem] max-w-[28rem]'
      >
        <Link
          href={article.href}
          className='font-display text-[2.15rem] font-semibold uppercase leading-[1.08] tracking-wide text-white transition-colors duration-300 hover:text-brand-moss xsm:text-[1.45rem]'
        >
          <h3>{article.title}</h3>
        </Link>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className='mt-[0.9rem] max-w-[26rem] font-sans text-[0.95rem] leading-relaxed text-white/75'
      >
        <p>{article.excerpt}</p>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className='mt-[1.5rem]'
      >
        <Link
          href={article.href}
          className={cn(
            'group/more inline-flex w-fit items-center gap-[0.35rem]',
            'font-sans text-[0.875rem] tracking-wide text-white',
            'underline decoration-white/40 underline-offset-[0.28rem]',
            'transition-colors duration-300 hover:decoration-white',
          )}
        >
          Xem chi tiết
          <ArrowUpRight
            className='size-[0.95rem] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/more:translate-x-[0.1rem] group-hover/more:-translate-y-[0.1rem]'
            strokeWidth={1.5}
          />
        </Link>
      </Wrapper>
    </>
  )
}

export default function ImportantEvents() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const reduceMotion = useReducedMotion()
  const activeArticle = EVENTS[activeIndex] ?? EVENTS[0]

  const navButtonClass = cn(
    'flex size-[2.35rem] cursor-pointer items-center justify-center border border-white/15 text-white/70',
    'transition-colors duration-300 hover:border-brand-moss/50 hover:text-white',
  )

  const goTo = (next: boolean) => {
    setDirection(next ? 1 : -1)
    if (next) swiperRef.current?.slideNext()
    else swiperRef.current?.slidePrev()
  }

  return (
    <section
      className='relative overflow-hidden bg-brand-ink text-white'
      aria-labelledby='important-events-heading'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 100% 0%, color-mix(in srgb, var(--brand-moss) 32%, transparent), transparent 65%), radial-gradient(ellipse 45% 50% at 0% 100%, color-mix(in srgb, var(--brand-moss) 16%, transparent), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.18]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 35%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 35%, transparent) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 15%, transparent 72%)',
        }}
      />

      <Container className='relative z-[1] py-[4rem] xsm:py-[2.75rem]'>
        <Reveal className='mb-[1.75rem] flex items-end justify-between gap-[1.5rem] border-b border-white/10 pb-[1.15rem] xsm:mb-[1.25rem]'>
          <h2
            id='important-events-heading'
            className='font-display text-[2.5rem] font-semibold uppercase leading-none tracking-wide text-white xsm:text-[1.75rem]'
          >
            Sự kiện nổi bật
          </h2>
          <SectionLink
            href='/tin-tuc'
            className='mb-[0.25rem] shrink-0'
          >
            Xem tất cả
          </SectionLink>
        </Reveal>

        <div
          className={cn(
            'grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-stretch gap-[2.5rem]',
            'xsm:grid-cols-1 xsm:gap-[1.25rem]',
          )}
        >
          <Reveal
            className='relative min-h-[18rem] overflow-hidden xsm:order-2 xsm:min-h-[16rem]'
            delay={0.08}
            y={32}
          >
            <FeaturedCopy
              article={activeArticle}
              direction={direction}
            />
          </Reveal>

          <Reveal
            className='relative min-h-[22rem] overflow-hidden bg-brand/40 xsm:order-1 xsm:min-h-[16rem]'
            delay={0.14}
            y={36}
          >
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect='fade'
              fadeEffect={{ crossFade: true }}
              autoplay={{
                delay: AUTOPLAY_DELAY_MS,
                disableOnInteraction: false,
              }}
              speed={900}
              loop={EVENTS.length > 1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                const nextIndex = swiper.realIndex
                if (nextIndex === activeIndex) return

                if (swiper.swipeDirection === 'prev') {
                  setDirection(-1)
                } else if (swiper.swipeDirection === 'next') {
                  setDirection(1)
                } else {
                  const len = EVENTS.length
                  const goingPrev =
                    (activeIndex === 0 && nextIndex === len - 1) || nextIndex === activeIndex - 1
                  setDirection(goingPrev ? -1 : 1)
                }

                setActiveIndex(nextIndex)
              }}
              className='h-full min-h-[22rem] xsm:min-h-[16rem] [&_.swiper-slide]:!h-auto'
            >
              {EVENTS.map((article, index) => (
                <SwiperSlide
                  key={article.id}
                  className='!h-full'
                >
                  <Link
                    href={article.href}
                    className='group/img relative block min-h-[22rem] overflow-hidden xsm:min-h-[16rem]'
                    aria-label={article.title}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes='(max-width: 639px) 100vw, 55vw'
                      priority={index === 0}
                      className={cn(
                        'object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
                        index === activeIndex ? 'scale-100' : 'scale-[1.08]',
                        'group-hover/img:scale-[1.03]',
                      )}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        </div>

        {EVENTS.length > 1 ? (
          <Reveal
            delay={0.2}
            y={16}
            className='mt-[1.5rem] flex items-center justify-between gap-[1rem]'
          >
            <div className='flex min-w-0 flex-1 items-center gap-[1rem]'>
              <p className='shrink-0 font-display text-[0.9rem] font-semibold tabular-nums tracking-wide text-white/45'>
                <span className='text-white'>{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className='mx-[0.35rem] text-white/25'>/</span>
                {String(EVENTS.length).padStart(2, '0')}
              </p>
              <div
                className='h-[0.12rem] max-w-[12rem] flex-1 overflow-hidden bg-white/10'
                aria-hidden
              >
                {reduceMotion ? null : (
                  <div
                    key={activeIndex}
                    className='h-full w-full origin-left bg-brand-moss'
                    style={{
                      animationName: 'events-autoplay-progress',
                      animationDuration: `${AUTOPLAY_DELAY_MS}ms`,
                      animationTimingFunction: 'linear',
                      animationFillMode: 'forwards',
                    }}
                  />
                )}
              </div>
            </div>
            <div className='flex items-center gap-[0.5rem]'>
              <button
                type='button'
                aria-label='Bài trước'
                className={navButtonClass}
                onClick={() => goTo(false)}
              >
                <ChevronLeft
                  className='size-[1.1rem]'
                  strokeWidth={1.5}
                />
              </button>
              <button
                type='button'
                aria-label='Bài tiếp theo'
                className={navButtonClass}
                onClick={() => goTo(true)}
              >
                <ChevronRight
                  className='size-[1.1rem]'
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
