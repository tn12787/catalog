module.exports = {
  env: {
    PUBLIC_URL: '',
  },
  outputFileTracing: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/releases',
        permanent: true,
      },
    ];
  },
};
