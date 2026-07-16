import bundleAnalyzer from '@next/bundle-analyzer'
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

function shouldAllowLocalIP(): boolean {
  if (process.env.ALLOW_LOCAL_IMAGE_IP === 'true') return true
  if (process.env.ALLOW_LOCAL_IMAGE_IP === 'false') return false
  if (process.env.NODE_ENV === 'development') return true

  const cms = process.env.NEXT_PUBLIC_CMS ?? ''
  return /:\/\/(localhost|127\.0\.0\.1)(:\d+)?|\.local(:\d+)?/i.test(cms)
}

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    deviceSizes: [430, 768, 1080, 1280, 1600, 1920],
    dangerouslyAllowLocalIP: shouldAllowLocalIP(),
  },
  reactStrictMode: false,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    viewTransition: true,
    webVitalsAttribution: ['CLS', 'LCP'],
    // cssChunking: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

// ANALYZE=true pnpm build

export default withBundleAnalyzer(withNextIntl(nextConfig))
