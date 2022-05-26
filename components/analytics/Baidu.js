import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const BaiduScript = () => {
  return (
    <>
      <Script
        src={`https://hm.baidu.com/hm.js?${siteMetadata.analytics.BaiduAnalyticsId}`} // Replace with your umami instance
      />
    </>
  )
}

export default BaiduScript
