import { IconType } from 'react-icons/lib';

export interface NavBarLink {
  text: string;
  href: string;
  activeRegex: RegExp;
  icon: IconType;
}
