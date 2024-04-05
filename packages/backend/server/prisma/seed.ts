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
      email: 'nutriboost17z@gmail.com',
      password: '',
      name: 'Vu Dang Khuong Duy',
      avatar: '',
    },
  });

  console.log({ user1 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
