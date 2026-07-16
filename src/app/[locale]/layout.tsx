import type { Metadata } from 'next'
import { Barlow_Condensed, Be_Vietnam_Pro } from 'next/font/google'
import Script from 'next/script'

import '@/app/globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['vietnamese', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bateco Quốc An',
  description: 'Website Bateco Quốc An',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='vi'
      suppressHydrationWarning
    >
      <body
        className={`${beVietnamPro.variable} ${barlowCondensed.variable} font-sans antialiased`}
      >
        <Script
          id='preloader-boot'
          strategy='beforeInteractive'
        >
          {
            "(function(){try{if(sessionStorage.getItem('bateco-preloader-seen')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.preloader='done'}}catch(e){}})();"
          }
        </Script>
        {children}
      </body>
    </html>
  )
}
