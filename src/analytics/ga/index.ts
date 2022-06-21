import { GAEventArgs } from './types';

const pageview = (url: string) => {
  window?.gtag &&
    window.gtag('config', 'G-MSZB8E8P4E', {
      page_path: url,
    });
};

const event = ({ action, params }: GAEventArgs) => {
  window?.gtag && window.gtag('event', action, params);
};

const trackIdentity = (id: string) => {
  window?.gtag &&
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
