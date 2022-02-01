import { Checkbox } from '@chakra-ui/react';
import React from 'react';
import { TableToggleAllRowsSelectedProps } from 'react-table';

type Props = TableToggleAllRowsSelectedProps;

const IndeterminateCheckbox = React.forwardRef<HTMLInputElement, Props>(
  ({ indeterminate, checked, ...rest }, ref) => {
    return (
      <>
        <Checkbox
          type="checkbox"
          isIndeterminate={indeterminate}
          isChecked={checked}
          {...rest}
          ref={ref}
        />
      </>
    );
  }
);

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export default IndeterminateCheckbox;
