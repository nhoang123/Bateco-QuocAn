'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { IHomepageBannerSlide } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/effect-fade'

const EASE = [0.32, 0.72, 0, 1] as const
const HERO_HEIGHT = 'h-[calc(100dvh-var(--header-height))]'
const AUTOPLAY_DELAY_MS = 5000

export default function HeroBanner({ data }: { data: IHomepageBannerSlide[] }) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const reduceMotion = useReducedMotion()
  const active = data[activeIndex] ?? data[0]

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper?.autoplay) return

    if (reduceMotion) {
      swiper.autoplay.stop()
      return
    }

    swiper.autoplay.start()
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return

    const restartAutoplay = () => {
      const swiper = swiperRef.current
      if (!swiper?.autoplay) return
      swiper.autoplay.stop()
      swiper.autoplay.start()
    }

    if (document.documentElement.dataset.preloader !== 'active') return

    const observer = new MutationObserver(() => {
      if (document.documentElement.dataset.preloader === 'done') {
        restartAutoplay()
        observer.disconnect()
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-preloader'],
    })

    return () => observer.disconnect()
  }, [reduceMotion])

  const syncDirection = (swiper: SwiperType, nextIndex: number) => {
    if (swiper.swipeDirection === 'prev') setDirection(-1)
    else if (swiper.swipeDirection === 'next') setDirection(1)
    else {
      const len = data.length
      const goingPrev =
        (activeIndex === 0 && nextIndex === len - 1) || nextIndex === activeIndex - 1
      setDirection(goingPrev ? -1 : 1)
    }
  }

  return (
    <section
      className={cn('relative overflow-hidden bg-brand-ink', HERO_HEIGHT)}
      aria-label='Banner trang chủ'
    >
      <h1 className='sr-only'>Bateco Quốc An</h1>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect='fade'
        fadeEffect={{ crossFade: true }}
        speed={1100}
        loop={data.length > 1}
        autoplay={{
          delay: AUTOPLAY_DELAY_MS,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          if (!reduceMotion) {
            swiper.autoplay?.start()
          }
        }}
        onSlideChange={(swiper) => {
          const nextIndex = swiper.realIndex
          if (nextIndex === activeIndex) return
          syncDirection(swiper, nextIndex)
          setActiveIndex(nextIndex)
        }}
        className={cn('!absolute inset-0 !h-full !w-full', '[&_.swiper-wrapper]:!h-full')}
      >
        {Array.isArray(data) &&
          data.length > 0 &&
          data?.map((slide, index) => (
            <SwiperSlide
              key={index}
              className='!relative !h-full !w-full'
            >
              <div className='absolute inset-0 overflow-hidden'>
                <Image
                  src={slide?.image}
                  alt={slide?.title}
                  fill
                  priority={index === 0}
                  sizes='100vw'
                  className={cn(
                    'object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform',
                    index === activeIndex ? 'scale-100' : 'scale-[1.08]',
                  )}
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/10 to-transparent'
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-brand-ink/10'
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <Container
        className={cn(
          'pointer-events-none relative z-10 flex items-end pb-[4rem] xsm:pb-[2.75rem]',
          HERO_HEIGHT,
        )}
      >
        <div className='pointer-events-auto max-w-full overflow-hidden'>
          {reduceMotion ? (
            <div>
              <p className='mb-[0.65rem] font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
                {active?.subtitle}
              </p>
              <h2 className='font-display text-[3.25rem] font-semibold uppercase leading-[1.3] tracking-wide text-white xsm:text-[2.25rem]'>
                {active?.title}
              </h2>
            </div>
          ) : (
            <AnimatePresence
              mode='wait'
              custom={direction}
            >
              <motion.div
                key={activeIndex}
                custom={direction}
                initial='enter'
                animate='center'
                exit='exit'
                variants={{
                  enter: (dir: 1 | -1) => ({
                    opacity: 0,
                    y: 28,
                    x: dir * -20,
                    filter: 'blur(14px)',
                  }),
                  center: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.7,
                      ease: EASE,
                      staggerChildren: 0.1,
                      delayChildren: 0.12,
                    },
                  },
                  exit: (dir: 1 | -1) => ({
                    opacity: 0,
                    y: -18,
                    x: dir * 16,
                    filter: 'blur(10px)',
                    transition: { duration: 0.4, ease: EASE },
                  }),
                }}
              >
                <motion.p
                  variants={{
                    enter: { opacity: 0, y: 12, filter: 'blur(8px)' },
                    center: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.5, ease: EASE },
                    },
                    exit: { opacity: 0, filter: 'blur(6px)' },
                  }}
                  className='mb-[0.65rem] font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'
                >
                  {active?.subtitle}
                </motion.p>
                <motion.h2
                  variants={{
                    enter: { opacity: 0, y: 22, filter: 'blur(12px)' },
                    center: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.65, ease: EASE },
                    },
                    exit: { opacity: 0, y: -10, filter: 'blur(8px)' },
                  }}
                  className='font-display text-[3.25rem] font-semibold uppercase leading-[1.3] tracking-wide text-white xsm:text-[2.25rem]'
                >
                  {active?.title}
                </motion.h2>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </Container>

      {Array.isArray(data) && data.length > 1 ? (
        <div className='pointer-events-none absolute inset-x-0 bottom-[1.5rem] z-20 xsm:bottom-[1rem]'>
          <Container className='pointer-events-auto flex items-center justify-end gap-[0.45rem]'>
            {Array.isArray(data) &&
              data.length > 0 &&
              data?.map((_, index) => (
                <button
                  key={index}
                  type='button'
                  aria-label={`Chuyển tới slide ${index + 1}`}
                  aria-current={index === activeIndex}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1)
                    swiperRef.current?.slideToLoop(index)
                  }}
                  className={cn(
                    'h-[0.16rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    index === activeIndex
                      ? 'w-[2.25rem] bg-brand-moss'
                      : 'w-[0.85rem] bg-white/35 hover:bg-white/60',
                  )}
                />
              ))}
          </Container>
        </div>
      ) : null}
    </section>
  )
}
