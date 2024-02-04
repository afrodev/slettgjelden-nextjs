export type Kunde = {
  persnr: bigint;
  navn: string;
  createdAt: Date;
  updatedAt: Date;
  loenn?: bigint;
  sivilstatus: string;
  partnerLoenn?: bigint;
  barn0_5?: number;
  barn6_10?: number;
  barn11_14?: number;
  barn15_18?: number;
  husleie?: bigint;
  huslaan: Huslaan[];
  sumbarnefradrag?: bigint;
  sumkostnader?: bigint;
  overskuddPaaLoenn?: bigint;
  totalGjeldNaa?: bigint;
  kreditorer: Kreditor[];
};

export type Barnefradrag = {
  id: number;
  barn0_5: number;
  barn6_10: number;
  barn11_14: number;
  barn15_18: number;
};

export type Kreditor = {
  id: number;
  kunde: Kunde;
  kundeId: bigint;
  saksnumre: Sak[];
  sumKreditorGjeld: bigint;
  sumKreditorGjeld5Aar: bigint;
  gjeldsprosent: number;
  maanedligBetaling: bigint;
};

export type Sak = {
  id: number;
  saknr: bigint;
  beloep: bigint;
  rente: number;
  sumSak5Aar: bigint;
  kreditor: Kreditor;
  kreditorId: number;
};

export type Huslaan = {
  id: number;
  beloep: bigint;
  rente: number;
  kunde: Kunde;
  kundeId: bigint;
};
