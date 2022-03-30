import { cloneDeep } from 'lodash';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

type Environment = 'production' | 'development' | 'other';

type Params = {
  environments?: Environment[];
  status?: 301 | 302;
};

const middleware =
  ({ environments = ['production'], status = 301 }: Params) =>
  (req: NextRequest, ev: NextFetchEvent) => {
    const currentEnv = process.env.NODE_ENV as Environment;
    const clonedUrl = cloneDeep(req.url);

    if (environments.includes(currentEnv) && req.headers.get('x-forwarded-proto') !== 'https') {
      console.log(clonedUrl);
      // return NextResponse.redirect(, status);
    }
    return NextResponse.next();
  };

export default middleware({});
