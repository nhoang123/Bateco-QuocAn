export type AboutBannerIconName = 'compass' | 'radio' | 'waves' | 'aperture' | 'zap' | 'package'

export type AboutBannerFeature = {
  label: string
  icon: AboutBannerIconName
}

export type AboutBannerCta = {
  label: string
  href: string
}

export type AboutBannerData = {
  eyebrow: string
  title: string
  description: string
  image: string
  primaryCta: AboutBannerCta
  secondaryCta: AboutBannerCta
  features: AboutBannerFeature[]
}

export const ABOUT_BANNER: AboutBannerData = {
  eyebrow: 'Công nghệ - An ninh - Quốc phòng',
  title: 'Giải pháp công nghệ cao cho An ninh – Quốc phòng',
  description:
    'BATECO Quốc An cung cấp các giải pháp hiện đại, đồng bộ, bảo mật và thực tiễn, phục vụ hiệu quả cho các nhiệm vụ bảo vệ Tổ quốc trong kỷ nguyên số.',
  image: '/images/about/banner.jpg',
  primaryCta: {
    label: 'Khám phá năng lực',
    href: '/#activity-areas-heading',
  },
  secondaryCta: {
    label: 'Liên hệ hợp tác',
    href: '/#site-footer',
  },
  features: [
    { label: 'Dẫn đường quán tính', icon: 'compass' },
    { label: 'Thông tin liên lạc', icon: 'radio' },
    { label: 'Sonar – Thủy âm', icon: 'waves' },
    { label: 'Quang điện tử', icon: 'aperture' },
    { label: 'Tác chiến điện tử', icon: 'zap' },
    { label: 'Vật tư an ninh quốc phòng', icon: 'package' },
  ],
}

export const ABOUT_HERO_HEIGHT =
  'min-h-[calc(100dvh-var(--header-height))] tablet:min-h-[calc(70dvh-var(--header-height))]'
