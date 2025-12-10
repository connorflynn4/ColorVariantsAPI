import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
const dbPath = dbUrl.startsWith('file:') ? dbUrl.slice(5) : dbUrl;
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  const colors = [
    {
      name: 'Red',
      hex: '#FF0000',
      rgb: 'rgb(255, 0, 0)',
      category: 'Primary',
      accessible: true,
    },
    {
      name: 'Blue',
      hex: '#0000FF',
      rgb: 'rgb(0, 0, 255)',
      category: 'Primary',
      accessible: true,
    },
    {
      name: 'Green',
      hex: '#00FF00',
      rgb: 'rgb(0, 255, 0)',
      category: 'Primary',
      accessible: true,
    },
    {
      name: 'Yellow',
      hex: '#FFFF00',
      rgb: 'rgb(255, 255, 0)',
      category: 'Primary',
      accessible: true,
    },
    {
      name: 'Orange',
      hex: '#FFA500',
      rgb: 'rgb(255, 165, 0)',
      category: 'Secondary',
      accessible: true,
    },
    {
      name: 'Purple',
      hex: '#800080',
      rgb: 'rgb(128, 0, 128)',
      category: 'Secondary',
      accessible: false,
    },
    {
      name: 'Pink',
      hex: '#FFC0CB',
      rgb: 'rgb(255, 192, 203)',
      category: 'Pastel',
      accessible: true,
    },
    {
      name: 'Cyan',
      hex: '#00FFFF',
      rgb: 'rgb(0, 255, 255)',
      category: 'Secondary',
      accessible: true,
    },
  ];

  await prisma.color.deleteMany({});

  for (const color of colors) {
    await prisma.color.create({
      data: color,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
