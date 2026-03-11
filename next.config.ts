import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'mach2.cloud' },
      { protocol: 'https', hostname: 'www.google.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
