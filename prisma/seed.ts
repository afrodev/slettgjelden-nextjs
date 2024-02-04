import { faker } from "@faker-js/faker";
import { Kunde, Huslaan, Kreditor, Sak, Barnefradrag } from "@/types";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Here i'm adding sample data using Faker js

const createHuslaan = async (kundePersnr: bigint): Promise<Huslaan> => {
  const huslaan = await prisma.huslaan.create({
    data: {
      beloep: faker.number.bigInt({ min: 100000, max: 30000000n }),
      rente: faker.number.int({ min: 0, max: 10 }),
      kunde: {
        connect: {
          persnr: kundePersnr, // finally used the correct unique field for Kunde
        },
      },
    },
    include: {
      kunde: true,
    },
  });

  return huslaan as Huslaan;
};

const createKreditor = async (kundePersnr: bigint): Promise<Kreditor> => {
  const kreditor = await prisma.kreditor.create({
    data: {
      sumKreditorGjeld: faker.number.bigInt(),
      sumKreditorGjeld5Aar: faker.number.bigInt(),
      gjeldsprosent: faker.number.int({ min: 0, max: 100 }),
      maanedligBetaling: faker.number.bigInt(),
      saksnumre: {
        create: [
          {
            saknr: faker.number.bigInt(),
            beloep: faker.number.bigInt(),
            rente: faker.number.int({ min: 0, max: 100 }),
            sumSak5Aar: faker.number.bigInt(),
          },
          // Add more Sak objects here if needed
        ],
      },
      kunde: {
        // include a kunde field when creating a Kreditor
        connect: {
          persnr: kundePersnr, // use the correct unique field for Kunde
        },
      },
    },
  });

  return kreditor as Kreditor;
};

async function main() {
  // First, delete Huslaan records
  await prisma.huslaan.deleteMany();

  // Then, delete Sak records
  await prisma.sak.deleteMany();

  // Then, delete Kreditor records
  await prisma.kreditor.deleteMany();

  // Then, delete Kunde records
  await prisma.kunde.deleteMany();

  await prisma.barnefradrag.deleteMany();

  const kunde = await prisma.kunde.create({
    data: {
      persnr: BigInt(
        faker.number.bigInt({ min: 10000000000n, max: 30000000000n })
      ),
      navn: faker.person.fullName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      loenn: BigInt(faker.number.bigInt({ min: 0, max: 100000000 })),
      sivilstatus: faker.helpers.arrayElement([
        "Ugift",
        "Gift",
        "Skilt",
        "Enke",
      ]),
      partnerLoenn: BigInt(faker.number.bigInt({ min: 0, max: 100000000 })),
      barn0_5: faker.number.int({ min: 0, max: 5 }),
      barn6_10: faker.number.int({ min: 0, max: 5 }),
      barn11_14: faker.number.int({ min: 0, max: 5 }),
      barn15_18: faker.number.int({ min: 0, max: 5 }),
      husleie: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
      sumbarnefradrag: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
      sumkostnader: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
      overskuddPaaLoenn: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
      totalGjeldNaa: BigInt(faker.number.bigInt({ min: 0, max: 10000000 })),
    },
  });

  const huslaan = await createHuslaan(kunde.persnr);
  await prisma.kunde.update({
    where: { persnr: kunde.persnr },
    data: { huslaan: { connect: { id: huslaan.id } } },
  });

  const kreditor = await createKreditor(kunde.persnr);
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
