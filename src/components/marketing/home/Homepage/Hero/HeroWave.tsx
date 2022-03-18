import { chakra, HTMLChakraProps } from '@chakra-ui/react';

const HeroWave = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    id="visual"
    viewBox="0 0 900 600"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    {...props}
  >
    <path
      d="M0 543L21.5 539.7C43 536.3 86 529.7 128.8 529.7C171.7 529.7 214.3 536.3 257.2 539.5C300 542.7 343 542.3 385.8 535.2C428.7 528 471.3 514 514.2 503.8C557 493.7 600 487.3 642.8 493.5C685.7 499.7 728.3 518.3 771.2 530C814 541.7 857 546.3 878.5 548.7L900 551L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
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
