import { PrismaClient } from '@prisma/client';
import { Models } from 'node-appwrite';

type Context = {
  req: {
    body: Models.User<{}>;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  };
  res: any;
  log: (msg: any) => void;
  error: (msg: any) => void;
};

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log }: Context) => {
  const client = new PrismaClient();
  log(JSON.stringify(req, null, 4));

  // user is updating their account
  if (req.method === 'POST') {
    const { email, $id, $createdAt, $updatedAt } = req.body;

    if (req.body.emailVerification) {
      const user = await client.user.upsert({
        create: {
          id: $id,
          email,
          role: 'USER',
          createdAt: new Date($createdAt),
          updatedAt: new Date($updatedAt),
        },
        where: {
          id: $id,
        },
        update: {
          email,
        },
      });

      return res.json({
        message: 'user updated',
        data: user,
      });
    }

    return res.json({
      message: 'No action handled',
      data: null,
    });
  }

  return res.json({
    message: 'No action handled',
    data: null,
  });
};
