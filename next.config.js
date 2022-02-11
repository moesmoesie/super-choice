module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['nl', 'en', 'fr'],
    defaultLocale: 'nl',
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: '/recepten',
        destination: '/recipes',
        permanent: true,
      },
    ]
  }
}