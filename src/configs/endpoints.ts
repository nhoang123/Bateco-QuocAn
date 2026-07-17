const ENDPOINTS = {
  siteSettings: {
    getData: (lang: string) => `api/v1/site-settings?locale=${lang}`,
  },
  homepage: {
    vi: 'wp/v2/pages/10?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/49?_fields=acf&acf_format=standard',
    getNews: (lang: string) => `api/v1/get-all/post?lang=${lang}&limit=6`,
  },
}

export default ENDPOINTS
