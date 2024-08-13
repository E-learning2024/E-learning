
import { PrismaClient } from '@prisma/client';
import { accessLevels } from './seeds/accessLevels';
import {evaluationTypes} from './seeds/evaluationTypes';

const prisma = new PrismaClient();
async function main() {

  await prisma.accessLevel.deleteMany(); 
  await prisma.typeAvaliation.deleteMany(); 
  await prisma.accessLevel.createMany({ data: accessLevels })
  await prisma.typeAvaliation.createMany({ data: evaluationTypes })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
