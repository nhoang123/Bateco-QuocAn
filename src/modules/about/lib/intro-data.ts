export type AboutIntroStat = {
  value: number
  suffix?: string
  label: string
}

export type AboutIntroData = {
  eyebrow: string
  title: string
  lead: string
  paragraphs: string[]
  image: string
  imageAlt: string
  stats: AboutIntroStat[]
}

export const ABOUT_INTRO: AboutIntroData = {
  eyebrow: 'Về chúng tôi',
  title: 'Đồng hành công nghệ cho An ninh – Quốc phòng',
  lead: 'BATECO Quốc An là đơn vị chuyên cung cấp giải pháp công nghệ cao, vật tư và thiết bị phục vụ nhiệm vụ bảo vệ Tổ quốc trong kỷ nguyên số.',
  paragraphs: [
    'Chúng tôi kết nối năng lực kỹ thuật, chuỗi cung ứng tin cậy và hiểu biết thực tiễn vận hành để mang đến các giải pháp đồng bộ, bảo mật và sẵn sàng triển khai.',
    'Từ dẫn đường quán tính, thông tin liên lạc, sonar – thủy âm đến quang điện tử, tác chiến điện tử và vật tư an ninh quốc phòng — mỗi lĩnh vực đều được đầu tư chuyên sâu theo chuẩn nghề nghiệp.',
  ],
  image: '/images/about/banner.jpg',
  imageAlt: 'Bateco Quốc An',
  stats: [
    { value: 12, suffix: '+', label: 'Năm kinh nghiệm' },
    { value: 6, label: 'Lĩnh vực chuyên sâu' },
    { value: 100, suffix: '+', label: 'Dự án triển khai' },
    { value: 50, suffix: '+', label: 'Đối tác chiến lược' },
  ],
}
