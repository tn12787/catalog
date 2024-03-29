import { render } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RetryValue } from 'react-query/types/core/retryer';
import { SessionProvider } from 'next-auth/react';

import ChakraSSRProvider from 'components/ChakraSSRProvider';
import { shouldRetryQuery } from 'utils/queries';
import { mockSession } from '__mocks__/data/auth';

export const renderWithProviders = (content: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: shouldRetryQuery as RetryValue<unknown>,
      },
    },
  });

  return render(
    <SessionProvider session={mockSession({})}>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <ChakraSSRProvider>{content}</ChakraSSRProvider>
        </QueryClientProvider>
      </DndProvider>
    </SessionProvider>
  );
};
