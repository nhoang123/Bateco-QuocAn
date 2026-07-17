type FooterBottomProps = {
  year: number
}

export function FooterBottom({ year }: FooterBottomProps) {
  return (
    <div className='flex items-center justify-between gap-[1rem] border-t border-brand-ink/10 py-[1.25rem] xsm:flex-col xsm:items-start xsm:gap-[0.5rem]'>
      <p className='font-sans text-[0.7rem] uppercase tracking-[0.1em] text-brand-ink/40'>
        © {year} Bateco Quốc An. All rights reserved.
      </p>
      <p className='font-sans text-[0.7rem] uppercase tracking-[0.1em] text-brand-ink/35'>
        Công nghiệp · An ninh · Quốc phòng
      </p>
    </div>
  )
}
