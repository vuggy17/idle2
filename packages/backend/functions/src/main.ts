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
  return res.json({
    data: req,
  });
  if (req.method === 'PATCH') {
    return res.json({
      data: req,
    });
  }

  if (req.method === 'POST') {
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
  }

  if (req.method === 'DELETE') {
    log(JSON.stringify(req, null, 4));
    return res.json({
      data: req,
    });
  }

  return res.json({
    message: 'No action handled',
    data: null,
  });
};
