import { Distributor } from '.prisma/client';

export const distributors: Pick<Distributor, 'name' | 'siteUrl'>[] = [
  { name: 'AWAL', siteUrl: 'https://www.awal.com/' },
  { name: 'Distrokid', siteUrl: 'https://www.distrokid.com/' },
  { name: 'TuneCore', siteUrl: 'https://www.tunecore.com/' },
  { name: 'CDBaby', siteUrl: 'https://www.cdbaby.com/' },
];
