module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["nl", "en", "fr", "de"],
    defaultLocale: "nl",
  },
  async redirects() {
    return [
      {
        source: "/recepten",
        destination: "/recipes",
        permanent: true,
      },
    ];
  },
};
