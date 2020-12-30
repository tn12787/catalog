import { NavLinkProps } from 'react-router-dom';

export interface NavBarLink extends Partial<NavLinkProps> {
  text: string;
}
