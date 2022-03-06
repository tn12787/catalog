import * as React from 'react';

import BarStep from './BarStep';
import NumberedStep from './NumberedStep';
import { StepProps } from './types';

export const Step = ({ variant = 'steps', ...rest }: StepProps) => {
  return variant === 'steps' ? (
    <NumberedStep {...rest}></NumberedStep>
  ) : (
    <BarStep {...rest}></BarStep>
  );
};
