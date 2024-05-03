import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      id: '660d25e19831a40c0ed1',
      createdAt: '2024-04-02T14:18:21.890Z',
      updatedAt: '2024-04-02T14:17:31.193Z',
      email: '19520496@gm.uit.edu.vn',
      password: '',
      username: '.coac',
      displayName: 'Vu Dang Khuong Duy',
    },
  });

  console.log({ user1 });

  const user2 = await prisma.user.create({
    data: {
      id: '662a1222f1386b77e10d',
      createdAt: '2024-04-02T14:18:21.890Z',
      updatedAt: '2024-04-02T14:17:31.193Z',
      email: 'nutriboost17z@gmail.com',
      password: '',
      username: new Date('2024-04-02T14:18:21.890Z').getTime().toString(32),
      displayName: 'Khuong Duy 2',
    },
  });

  console.log({ user2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
