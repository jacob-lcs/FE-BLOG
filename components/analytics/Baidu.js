import { useEffect } from 'react'

import siteMetadata from '@/data/siteMetadata'

const BaiduScript = () => {
  useEffect(() => {
    window._hmt = window._hmt || []
    const hm = document.createElement('script')
    hm.src = `https://hm.baidu.com/hm.js?${siteMetadata.analytics.BaiduAnalyticsId}`
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  }, [])

  return <div />
}

export default BaiduScript
