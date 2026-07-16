'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

interface SheetProviderProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

const SheetProvider = ({ open, setOpen, children, className }: SheetProviderProps) => {
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetContent
        suppressHydrationWarning
        className={className}
      >
        <SheetHeader className='hidden'>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default SheetProvider
