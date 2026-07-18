export type RevenueChartSegmentKey = 'industry' | 'trade' | 'defense' | 'other'

export type RevenueChartPoint = {
  year: string
  industry: number
  trade: number
  defense: number
  other: number
  total: number
}

export type RevenueChartData = {
  title: string
  description: string
  unitLabel: string
  points: RevenueChartPoint[]
}

/** Values in billion VND — illustrative projection aligned with the reference chart */
export const REVENUE_CHART_DATA: RevenueChartData = {
  title: 'Tăng trưởng doanh thu',
  description:
    'Cơ cấu doanh thu theo từng mảng hoạt động, thể hiện đà tăng trưởng ổn định từ 2024 đến 2028.',
  unitLabel: 'Tăng trưởng doanh thu (tỷ đồng)',
  points: [
    { year: '2024', industry: 260, trade: 85, defense: 65, other: 25, total: 435 },
    { year: '2025', industry: 340, trade: 115, defense: 80, other: 35, total: 570 },
    { year: '2026', industry: 620, trade: 210, defense: 165, other: 65, total: 1060 },
    { year: '2027', industry: 980, trade: 330, defense: 260, other: 110, total: 1680 },
    { year: '2028', industry: 1330, trade: 450, defense: 350, other: 150, total: 2280 },
  ],
}
