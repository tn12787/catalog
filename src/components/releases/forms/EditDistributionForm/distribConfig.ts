import { Distributor } from '@prisma/client';

import { EditDistributionFormData } from '../../specific/tasks/Distribution/types';
import { baseTaskConfig } from '../baseTaskConfig';

import { FormDatum } from 'types/forms';

export const buildDistribConfig = (
  releaseDate: Date | null,
  distributors: Distributor[]
): FormDatum<EditDistributionFormData>[] => [
  {
    name: 'distributor',
    label: 'Distributor',
    type: 'select',
    registerArgs: {
      required: 'Please enter a distributor name.',
    },
    extraProps: {
      placeholder: 'Select a distributor...',
    },
    options: distributors.map(({ id, name }) => ({ label: name, value: id })),
    isLoading: !distributors.length,
  },
  ...baseTaskConfig(releaseDate),
];
