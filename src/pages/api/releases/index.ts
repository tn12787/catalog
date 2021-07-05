import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
      res.status(409);
  }
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await prisma.release.findMany({
    orderBy: {
      targetDate: 'asc',
    },
  });
  res.json(posts);
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
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
