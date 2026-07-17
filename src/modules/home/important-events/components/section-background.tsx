export function SectionBackground() {
  return (
    <>
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
    </>
  )
}
