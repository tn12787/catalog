import { chakra, HTMLChakraProps } from '@chakra-ui/react';

const HeroBlob = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    id="visual"
    viewBox="0 0 900 900"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    {...props}
  >
    <g transform="translate(436.53968123519826 489.19515568502845)">
      <path
        d="M284.4 -302.1C360.4 -208.4 408.2 -104.2 405.9 -2.2C403.7 99.7 351.4 199.4 275.4 274.6C199.4 349.7 99.7 400.4 8.4 392C-82.9 383.5 -165.7 316.1 -239.2 240.9C-312.7 165.7 -376.9 82.9 -379 -2.2C-381.2 -87.2 -321.4 -174.4 -247.9 -268.2C-174.4 -361.9 -87.2 -462.2 8.5 -470.7C104.2 -479.2 208.4 -395.9 284.4 -302.1"
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="miter"
      ></path>
    </g>
  </chakra.svg>
);

export default HeroBlob;
