import { GAEventArgs } from './types';

const pageview = (url: string) => {
  window.gtag('config', 'G-MSZB8E8P4E', {
    page_path: url,
  });
};

const event = ({ action, params }: GAEventArgs) => {
  window.gtag('event', action, params);
};

const ga = {
  pageview,
  event,
};

export default ga;
