import { PrismaClient } from '@prisma/client';
import { Models } from 'node-appwrite';

type Context = {
  req: {
    body: Models.User<{}>;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT';
  };
  res: any;
  log: (msg: any) => void;
  error: (msg: any) => void;
};

const client = new PrismaClient();
// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res }: Context) => {
  const { email, $id, $createdAt, $updatedAt } = req.body;

  const user = await client.user.create({
    data: {
      id: $id,
      email,
      role: 'USER',
      createdAt: new Date($createdAt),
      updatedAt: new Date($updatedAt),
    },
  });
  return res.json({
    message: 'New user created',
    data: user,
  });
};
