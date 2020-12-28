import netlifyidentity from 'netlify-identity-widget';

export const setupIdentity = () => {
  netlifyidentity.init();
  netlifyidentity.on('login', () => {
    window.location.reload();
  });
  netlifyidentity.on('logout', () => {
    window.location.reload();
  });
};
