import { ContactLabel } from '@prisma/client';
export const defaultWorkspaceLabels: Pick<ContactLabel, 'name' | 'color'>[] = [
  {
    name: 'Producer',
    color: '#00bcd4',
  },
  {
    name: 'Mastering House',
    color: '#eb4034',
  },
  {
    name: 'Videographer',
    color: '#3d03fc',
  },
  {
    name: 'P.R. Firm',
    color: '#03fc73',
  },
  {
    name: 'Copywriter',
    color: '#fcfc03',
  },
  {
    name: 'Mixing',
    color: '#fc0356',
  },
];
