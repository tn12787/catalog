import { GAEventArgs } from './types';

const pageview = (url: string, userId?: string) => {
  window.gtag('config', 'G-MSZB8E8P4E', {
    page_path: url,
    user_id: userId,
  });
};

const event = ({ action, params }: GAEventArgs) => {
  window.gtag('event', action, params);
};

const trackIdentity = (id: string) => {
  window.gtag('config', 'G-MSZB8E8P4E', {
    user_id: id,
  });
};

const ga = {
  pageview,
  event,
  trackIdentity,
};

export default ga;
