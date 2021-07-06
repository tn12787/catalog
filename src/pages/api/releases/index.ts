import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Token } from 'next-auth';
const prisma = new PrismaClient();
import { getSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

const releaseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });

  console.log(token);
  if (!token) {
    res.status(401).end(`Unauthorized`);
  }

  switch (req.method) {
    case 'GET':
      await get(req, res, token as Token);
      break;
    case 'POST':
      await get(req, res, token as Token);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse, token: Token) => {
  const posts = await prisma.release.findMany({
    orderBy: {
      targetDate: 'asc',
    },
    include: {
      team: {
        include: { users: { include: { user: true } } },
      },
    },
  });
  res.json(posts);
};

const post = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: Token
) => {
  const data = req.body;
  const result = await prisma.release.create({
    data: {
      name: data.name,
      type: data.type,
      targetDate: data.targetDate,
    },
  });
  res.json(result);
};

export default releaseHandler;
