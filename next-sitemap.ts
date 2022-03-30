module.exports = {
  siteUrl: process.env.NEXTAUTH_URL,
  // ...other options
  exclude: [
    '/workspaces*',
    '/artists*',
    '/contacts*',
    '/magic-link*',
    '/notifications*',
    '/overview*',
    '/releases*',
    '/user/settings*',
    '/planner*',
    '/welcome*',
    '/help*',
  ],
};
