'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'

import { Reveal } from '@/components/shared/reveal'
import { cn } from '@/lib/utils'
import { AUTOPLAY_DELAY_MS } from '@/modules/home/important-events/lib/constants'

type CarouselControlsProps = {
  activeIndex: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export function CarouselControls({ activeIndex, total, onPrev, onNext }: CarouselControlsProps) {
  const reduceMotion = useReducedMotion()

  const navButtonClass = cn(
    'flex size-[2.35rem] cursor-pointer items-center justify-center border border-white/15 text-white/70',
    'transition-colors duration-300 hover:border-brand-moss/50 hover:text-white',
  )

  return (
    <Reveal
      delay={0.2}
      y={16}
      className='mt-[1.5rem] flex items-center justify-between gap-[1rem]'
    >
      <div className='flex min-w-0 flex-1 items-center gap-[1rem]'>
        <p className='shrink-0 font-display text-[0.9rem] font-semibold tabular-nums tracking-wide text-white/45'>
          <span className='text-white'>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className='mx-[0.35rem] text-white/25'>/</span>
          {String(total).padStart(2, '0')}
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
          onClick={onPrev}
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
          onClick={onNext}
        >
          <ChevronRight
            className='size-[1.1rem]'
            strokeWidth={1.5}
          />
        </button>
      </div>
    </Reveal>
  )
}
