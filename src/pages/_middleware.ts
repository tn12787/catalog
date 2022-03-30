import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

type Environment = 'production' | 'development' | 'other';

type Params = {
  environments?: Environment[];
  status?: 301 | 302;
};

const middleware =
  ({ environments = ['production', 'development'], status = 301 }: Params) =>
  (req: NextRequest, ev: NextFetchEvent) => {
    const currentEnv = process.env.NODE_ENV as Environment;

    if (environments.includes(currentEnv) && req.headers.get('x-forwarded-proto') !== 'https') {
      console.log(req);
      // return NextResponse.redirect(, status);
    }
    return NextResponse.next();
  };

export default middleware({});
