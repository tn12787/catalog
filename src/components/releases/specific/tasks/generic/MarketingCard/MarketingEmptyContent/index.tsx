import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

import useAppColors from 'hooks/useAppColors';
import EmptyTableContent from 'components/tasks/TaskTable/EmptyContent';

type Props = { search: string };

const MarketingEmptyContent = ({ search }: Props) => {
  const { bodySub } = useAppColors();

  return (
    <EmptyTableContent
      iconText={<>{search ? '🔎' : '📝'}</>}
      message={
        <>{search ? 'No items match your search.' : "You haven't added any marketing tasks yet."}</>
      }
    ></EmptyTableContent>
  );
};

export default MarketingEmptyContent;
