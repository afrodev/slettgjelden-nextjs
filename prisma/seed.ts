import { faker } from "@faker-js/faker";
import { Kunde, Huslaan, Kreditor, Sak, Barnefradrag } from "@/types";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Here i'm adding sample data using Faker js

const createKunde = (): Kunde => {
  return {
    persnr: BigInt(
      faker.number.bigInt({ min: 10000000000n, max: 30000000000n })
    ),
    navn: faker.person.fullName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    loenn: BigInt(faker.number.bigInt()),
    sivilstatus: faker.helpers.arrayElement(["Ugift", "Gift", "Skilt", "Enke"]),
    partnerLoenn: BigInt(faker.number.bigInt()),
    barn0_5: faker.number.int({ min: 0, max: 5 }),
    barn6_10: faker.number.int({ min: 0, max: 5 }),
    barn11_14: faker.number.int({ min: 0, max: 5 }),
    barn15_18: faker.number.int({ min: 0, max: 5 }),
    husleie: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
    huslaan: [], // Add Huslaan object here
    sumbarnefradrag: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
    sumkostnader: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
    overskuddPaaLoenn: BigInt(faker.number.bigInt({ min: 0, max: 30000 })),
    totalGjeldNaa: BigInt(faker.number.bigInt()),
    kreditorer: [], // Add Kreditor object here
  };
};

const createHuslaan = async (kundeId: bigint): Promise<Huslaan> => {
  const huslaan = await prisma.huslaan.create({
    data: {
      beloep: faker.number.bigInt(),
      rente: faker.number.int(),
      kunde: {
        connect: {
          persnr: kundeId,
        },
      },
    },
  });

  return huslaan as Huslaan;
};

// const createHuslaan = (kundeId: bigint): Prisma.HuslaanCreateInput => {
//   return {
//     beloep: faker.number.bigInt(),
//     rente: faker.number.int(),
//     kunde: {
//       connect: {
//         persnr: kundeId,
//       },
//     },
//   };
// };

const createKreditor = async (kundeId: bigint): Promise<Kreditor> => {
  const kreditor = await prisma.kreditor.create({
    data: {
      sumKreditorGjeld: faker.number.bigInt(),
      sumKreditorGjeld5Aar: faker.number.bigInt(),
      gjeldsprosent: faker.number.int(),
      maanedligBetaling: faker.number.bigInt(),
      kunde: {
        connect: {
          persnr: kundeId,
        },
      },
      saksnumre: {
        create: [
          createSak(), // You would need to generate Sak objects here
        ],
      },
    },
  });

  return kreditor as Kreditor;
};

// const createKreditor = (): Prisma.KreditorUncheckedCreateWithoutKundeInput => {
//   return {
//     id: faker.number.int(),
//     saksnumre: {
//       create: [createSak()], // You would need to generate Sak objects here
//     },
//     sumKreditorGjeld: faker.number.bigInt(),
//     sumKreditorGjeld5Aar: faker.number.bigInt(),
//     gjeldsprosent: faker.number.int(),
//     maanedligBetaling: faker.number.bigInt(),
//   };
// };

// måtte bare awaite include kreditor pga forholdet
// The parameter within const createSak = async (kreditorId: number): Promise<Sak> =>
// Is only usable in the real world scenario of one-to-many relationship between Kreditor and Sak where a Sak can only be created if a Kreditor already exists. For now, the parameter can be removed
const createSak = async (kreditorId: number): Promise<Sak> => {
  const sak = await prisma.sak.create({
    data: {
      saknr: faker.number.bigInt(),
      beloep: faker.number.bigInt(),
      rente: faker.number.int(),
      sumSak5Aar: faker.number.bigInt(),
      kreditor: {
        connect: {
          id: kreditorId,
        },
      },
    },
    include: {
      kreditor: true,
    },
  });

  return sak as Sak;
};

const createBarnefradrag = (): Barnefradrag => {
  return {
    id: 2023,
    barn0_5: 3332,
    barn6_10: 4420,
    barn11_14: 5580,
    barn15_18: 6418,
  };
};

async function main() {
  await prisma.kunde.deleteMany();
  await prisma.huslaan.deleteMany();
  await prisma.kreditor.deleteMany();
  await prisma.sak.deleteMany();
  await prisma.barnefradrag.deleteMany();

  const kunde = createKunde();
  const huslaan = createHuslaan(kunde.persnr);
  const kreditor = createKreditor();
  const sak = createSak();
  const barnefradrag = createBarnefradrag();

  await prisma.kunde.create({
    data: {
      persnr: faker.number.bigInt(),
      navn: faker.person.fullName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      loenn: faker.number.bigInt(),
      sivilstatus: faker.helpers.arrayElement([
        "Ugift",
        "Gift",
        "Skilt",
        "Enke",
      ]),
      partnerLoenn: faker.number.bigInt(),
      barn0_5: faker.number.int({ min: 0, max: 5 }),
      barn6_10: faker.number.int({ min: 0, max: 5 }),
      barn11_14: faker.number.int({ min: 0, max: 5 }),
      barn15_18: faker.number.int({ min: 0, max: 5 }),
      husleie: faker.number.bigInt({ min: 0, max: 30000 }), // alt: hasHusleie ? faker.number.bigInt({ min: 1, max: 30000 })) : faker.number.bigInt(0),
      huslaan: [], // alt: hasHusleie ? [] : [createHuslaan()],
      sumbarnefradrag: faker.number.bigInt({ min: 0, max: 30000 }),
      sumkostnader: faker.number.bigInt({ min: 0, max: 30000 }),
      overskuddPaaLoenn: faker.number.bigInt({ min: 0, max: 30000 }),
      totalGjeldNaa: faker.number.bigInt(),
      kreditorer: [],
    },
  });
  await prisma.huslaan.create({ data: huslaan });
  await prisma.kreditor.create({ data: kreditor });
  await prisma.sak.create({ data: sak });

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
