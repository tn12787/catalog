import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import ga from '..';

import { ExtendedSession } from 'types/auth';

const AnalyticsProvider: React.FC = ({ children }) => {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const session = data as ExtendedSession;
    session && ga.trackIdentity(session.token.sub);
  }, [data, status]);

  return <>{children}</>;
};

export default AnalyticsProvider;
