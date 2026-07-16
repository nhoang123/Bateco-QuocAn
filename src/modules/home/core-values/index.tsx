import { Reveal } from '@/components/shared/reveal'
import { IHomepageCoreValue, IHomepageCoreValues } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'

function ValueRow({
  item,
  index,
  delay,
}: {
  item: IHomepageCoreValue
  index: number
  delay: number
}) {
  return (
    <Reveal
      as='li'
      delay={delay}
      y={22}
      amount={0.4}
      className='border-t border-white/10'
    >
      <div
        className={cn(
          'group/row relative grid grid-cols-[5.5rem_1fr] items-center gap-x-[1.75rem]',
          'py-[1.65rem] pl-[0.85rem]',
          'transition-[opacity,background-color,border-color,padding] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'group-hover/values:opacity-35 hover:!opacity-100',
          'hover:border-brand-moss/50 hover:bg-white/[0.035]',
          'xsm:grid-cols-[3.5rem_1fr] xsm:gap-x-[1rem] xsm:py-[1.35rem] xsm:pl-[0.65rem]',
          'xsm:hover:pl-[0.9rem]',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-[0.85rem] left-0 w-[0.12rem] origin-center bg-brand-moss',
            'scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover/row:scale-y-100',
          )}
        />

        <span
          className={cn(
            'font-display text-[1.85rem] font-semibold leading-none tracking-wide text-brand-moss',
            'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover/row:translate-x-[0.15rem] group-hover/row:text-[#9fc4ab]',
            'xsm:text-[1.35rem]',
          )}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className='grid grid-cols-[minmax(0,18rem)_1fr_auto] items-center gap-x-[2rem] xsm:grid-cols-1 xsm:gap-y-[0.55rem]'>
          <h3
            className={cn(
              'font-display text-[1.55rem] font-semibold uppercase leading-[1.1] tracking-wide text-white',
              'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'group-hover/row:translate-x-[0.2rem]',
              'xsm:text-[1.2rem]',
            )}
          >
            {item?.title}
          </h3>
          <p
            className={cn(
              'max-w-[28rem] font-sans text-[0.9rem] leading-relaxed text-white/50',
              'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'group-hover/row:text-white/80',
              'xsm:text-[0.85rem]',
            )}
          >
            {item?.desc}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

export default function CoreValues({ data }: { data: IHomepageCoreValues }) {
  return (
    <section
      className='relative overflow-hidden bg-brand-ink'
      aria-labelledby='core-values-heading'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 100% 0%, color-mix(in srgb, var(--brand-moss) 28%, transparent), transparent 70%), radial-gradient(ellipse 40% 50% at 0% 100%, color-mix(in srgb, var(--brand-moss) 12%, transparent), transparent 65%)',
        }}
      />

      <Container className='relative py-[5rem] xsm:py-[3rem]'>
        <div
          className={cn(
            'grid grid-cols-[minmax(0,34rem)_1fr] items-start gap-x-[3rem]',
            'xsm:grid-cols-1 xsm:gap-y-[2rem]',
          )}
        >
          <Reveal
            as='header'
            className='sticky top-[calc(var(--header-height)+1.5rem)] xsm:static'
          >
            <p className='font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
              {data?.subtitle}
            </p>
            <h2
              id='core-values-heading'
              className='mt-[0.85rem] max-w-[28rem] font-display text-[2.85rem] font-semibold uppercase leading-[1.02] tracking-wide text-white xsm:max-w-none xsm:text-[1.85rem]'
            >
              {data?.title}
            </h2>
            <p className='mt-[1.15rem] max-w-[26rem] font-sans text-[0.9rem] leading-relaxed text-white/50 xsm:max-w-none'>
              {data?.desc}
            </p>
            <span
              aria-hidden
              className='mt-[1.75rem] block h-[0.12rem] w-[2.5rem] bg-brand-moss xsm:mt-[1.25rem]'
            />
          </Reveal>

          <ol className='group/values list-none border-b border-white/10'>
            {Array.isArray(data?.values) &&
              data?.values.length > 0 &&
              data?.values?.map((item, index) => (
                <ValueRow
                  key={index}
                  item={item}
                  delay={0.06 + index * 0.07}
                  index={index}
                />
              ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
