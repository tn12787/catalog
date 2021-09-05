module.exports = {
  env: {
    PUBLIC_URL: '',
  },
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
