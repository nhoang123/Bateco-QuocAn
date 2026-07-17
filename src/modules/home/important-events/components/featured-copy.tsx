'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { ArrowLink } from '@/components/shared/arrow-link'
import { Link } from '@/i18n/navigation'
import { IHomepageNews } from '@/interfaces/homepage.interface'
import { EASE } from '@/modules/home/important-events/lib/constants'

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
  article: IHomepageNews
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
          dateTime={article?.published}
          className='font-sans text-[0.8rem] font-semibold tabular-nums tracking-wide text-white'
        >
          {article?.published}
        </time>
        <span
          aria-hidden
          className='h-px w-[1.25rem] bg-brand-moss'
        />
        <Link
          href={article?.taxonomies?.categories_post[0]?.slug}
          className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand-moss'
        >
          {article?.taxonomies?.categories_post[0]?.name}
        </Link>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className='mt-[1.15rem] max-w-[28rem]'
      >
        <Link
          href={article?.slug}
          className='font-display text-[2.15rem] font-semibold uppercase leading-[1.08] tracking-wide text-white transition-colors duration-300 hover:text-brand-moss xsm:text-[1.45rem]'
        >
          <h3 className='line-clamp-3'>{article?.title}</h3>
        </Link>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className='mt-[0.9rem] max-w-[26rem] font-sans text-[0.95rem] leading-relaxed text-white/75'
      >
        <p className='line-clamp-3'>{article?.post_excerpt}</p>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className='mt-[1.5rem]'
      >
        <ArrowLink
          href={article?.slug}
          variant='light'
        >
          Xem chi tiết
        </ArrowLink>
      </Wrapper>
    </>
  )
}

export function FeaturedCopy({
  article,
  direction,
}: {
  article: IHomepageNews
  direction: 1 | -1
}) {
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
        key={article?.id}
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
