import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const homepageService = {
  getAcfData: async (lang: string) => {
    return await fetchData({
      api: ENDPOINTS.homepage[lang as 'vi' | 'en'],
    })
  },
}

export default homepageService
