import { faker } from "@faker-js/faker";
import { Kunde, Huslaan, Kreditor, Sak, Barnefradrag } from "@/types";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Here i'm adding sample data using Faker js

const createHuslaan = async (kundeId: number): Promise<Huslaan> => {
  const huslaan = await prisma.huslaan.create({
    data: {
      beloep: faker.number.bigInt(),
      rente: faker.number.int(),
      kunde: {
        connect: {
          id: kundeId,
        },
      },
    },
    include: {
      kunde: true,
    },
  });

  return huslaan as Huslaan;
};

const createKreditor = async (): Promise<Kreditor> => {
  const kreditor = await prisma.kreditor.create({
    data: {
      sumKreditorGjeld: faker.number.bigInt(),
      sumKreditorGjeld5Aar: faker.number.bigInt(),
      gjeldsprosent: faker.number.int(),
      maanedligBetaling: faker.number.bigInt(),
      saksnumre: {
        create: [
          {
            saknr: faker.number.bigInt(),
            beloep: faker.number.bigInt(),
            rente: faker.number.int(),
            sumSak5Aar: faker.number.bigInt(),
          },
          // Add more Sak objects here if needed
        ],
      },
    },
  });

  return kreditor as Kreditor;
};

async function main() {
  await prisma.kunde.deleteMany();
  await prisma.huslaan.deleteMany();
  await prisma.kreditor.deleteMany();
  await prisma.sak.deleteMany();
  await prisma.barnefradrag.deleteMany();

  const kunde = await prisma.kunde.create({
    data: {
      persnr: BigInt(
        faker.number.bigInt({ min: 10000000000n, max: 30000000000n })
      ),
      navn: faker.person.fullName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      loenn: BigInt(faker.number.bigInt()),
      sivilstatus: faker.helpers.arrayElement([
        "Ugift",
        "Gift",
        "Skilt",
        "Enke",
      ]),
      partnerLoenn: BigInt(faker.number.bigInt()),
      barn0_5: faker.number.int({ min: 0, max: 5 }),
      barn6_10: faker.number.int({ min: 0, max: 5 }),
      barn11_14: faker.number.int({ min: 0, max: 5 }),
      barn15_18: faker.number.int({ min: 0, max: 5 }),
      husleie: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
      sumbarnefradrag: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
      sumkostnader: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
      overskuddPaaLoenn: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
      totalGjeldNaa: BigInt(faker.number.bigInt()),
    },
  });

  const huslaan = await createHuslaan();
  await prisma.kunde.update({
    where: { persnr: kunde.persnr },
    data: { huslaan: { connect: { id: huslaan.id } } },
  });

  const kreditor = await createKreditor();
  await prisma.kunde.update({
    where: { persnr: kunde.persnr },
    data: { kreditorer: { connect: { id: kreditor.id } } },
  });

  // await prisma.bucket.create({
  //   data: {
  //     title: "First bucket",
  //     slug: "first-bucket",
  //     description: "My bucket description",
  //     status: "draft",
  //   },
  // })
  // const publishedBucket = await prisma.bucket.create({
  //   data: {
  //     title: "Second bucket",
  //     slug: "second-bucket",
  //     description: "My second bucket description",
  //     status: "published",
  //   },
  // })

  // const items = Array(10).fill(null).map(createItem)

  // for (const item of items) {
  //   await prisma.item.create({
  //     data: {
  //       ...item,
  //       bucket: {
  //         connect: {
  //           id: publishedBucket.id,
  //         },
  //       },
  //     },
  //   })
  // }
}

main().catch((err) => {
  console.error("Failed seed", err);
});
