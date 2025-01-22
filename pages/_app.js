import '@/css/tailwind.css'
import '@/css/prism.css'
import '@/css/giscus.css'
import 'katex/dist/katex.css'
import { Monitoring } from 'react-scan/monitoring/next'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
// import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   ;(window.adsbygoogle || []).push({})
  // }, [])
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
      <Monitoring
        apiKey="wnaUjcjdwEZ5z7YBkUScE2bkzyVGtTwd" // Safe to expose publically
        url="https://monitoring.react-scan.com/api/v1/ingest"
      />
    </ThemeProvider>
  )
}
