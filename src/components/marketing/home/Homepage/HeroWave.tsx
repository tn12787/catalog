import { chakra, HTMLChakraProps } from '@chakra-ui/react';

const HeroWave = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    id="visual"
    viewBox="0 0 900 530"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    {...props}
  >
    <path
      d="M0 505L21.5 499.5C43 494 86 483 128.8 483C171.7 483 214.3 494 257.2 499.3C300 504.7 343 504.3 385.8 492.5C428.7 480.7 471.3 457.3 514.2 440.5C557 423.7 600 413.3 642.8 423.7C685.7 434 728.3 465 771.2 484.3C814 503.7 857 511.3 878.5 515.2L900 519L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="miter"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="44"
        y1="-1.78854"
        x2="44"
        y2="91.3879"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset="1" stopColor="currentColor" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="417.5"
        y1="13.282"
        x2="417.5"
        y2="76.282"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset="1" stopColor="currentColor" />
      </linearGradient>
    </defs>
  </chakra.svg>
);

export default HeroWave;
