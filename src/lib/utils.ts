import { v4 as uuidv4 } from "uuid";

export function generateTransactionNumber(): string {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const h = date.getHours().toString().padStart(2, "0");
  const i = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  const rand = uuidv4().slice(0, 6).toUpperCase();
  return `RS-${y}${m}${d}${h}${i}${s}-${rand}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(
  price: number,
  voucher: { type: string; value: number; minTransaction: number } | null
): number {
  if (!voucher) return 0;
  if (price < voucher.minTransaction) return 0;
  if (voucher.type === "percent") {
    return Math.round((price * voucher.value) / 100);
  }
  return voucher.value;
}

export const gameProducts = [
  {
    slug: "mobile-legends",
    name: "Mobile Legends",
    icon: "/images/games/mobile-legends.svg",
    description: "Top up Diamond Mobile Legends dengan harga termurah",
    category: "popular",
  },
  {
    slug: "free-fire",
    name: "Free Fire",
    icon: "/images/games/free-fire.svg",
    description: "Top up Free Fire Diamonds & Membership",
    category: "popular",
  },
  {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    icon: "/images/games/pubg-mobile.svg",
    description: "Top up UC PUBG Mobile murah dan cepat",
    category: "popular",
  },
  {
    slug: "honor-of-kings",
    name: "Honor of Kings",
    icon: "/images/games/honor-of-kings.svg",
    description: "Top up Honor of Kings tokens",
    category: "mobile",
  },
  {
    slug: "valorant",
    name: "Valorant",
    icon: "/images/games/valorant.svg",
    description: "Top up Valorant Points (VP)",
    category: "pc",
  },
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    icon: "/images/games/genshin-impact.svg",
    description: "Top up Genesis Crystals Genshin Impact",
    category: "popular",
  },
  {
    slug: "call-of-duty-mobile",
    name: "Call of Duty Mobile",
    icon: "/images/games/call-of-duty-mobile.svg",
    description: "Top up CP Call of Duty Mobile",
    category: "mobile",
  },
  {
    slug: "blood-strike",
    name: "Blood Strike",
    icon: "/images/games/blood-strike.svg",
    description: "Top up Battle Coins Blood Strike",
    category: "mobile",
  },
  {
    slug: "honkai-star-rail",
    name: "Honkai: Star Rail",
    icon: "/images/games/honkai-star-rail.svg",
    description: "Top up Stellar Jade Honkai Star Rail",
    category: "popular",
  },
  {
    slug: "arena-of-valor",
    name: "Arena of Valor",
    icon: "/images/games/arena-of-valor.svg",
    description: "Top up Vouchers Arena of Valor",
    category: "mobile",
  },
  {
    slug: "wild-rift",
    name: "Wild Rift",
    icon: "/images/games/wild-rift.svg",
    description: "Top up Wild Cores League of Legends Wild Rift",
    category: "mobile",
  },
  {
    slug: "zenless-zone-zero",
    name: "Zenless Zone Zero",
    icon: "/images/games/zenless-zone-zero.svg",
    description: "Top up Polychrome Zenless Zone Zero",
    category: "popular",
  },
  {
    slug: "ea-sports-fc-mobile",
    name: "EA Sports FC Mobile",
    icon: "/images/games/ea-sports-fc-mobile.svg",
    description: "Top up FC Points EA Sports FC Mobile",
    category: "mobile",
  },
  {
    slug: "magic-chess",
    name: "Magic Chess",
    icon: "/images/games/magic-chess.svg",
    description: "Top up Magic Gems Magic Chess Go Go",
    category: "mobile",
  },
  {
    slug: "free-fire-max",
    name: "Free Fire MAX",
    icon: "/images/games/free-fire-max.svg",
    description: "Top up Free Fire MAX Diamonds",
    category: "popular",
  },
  {
    slug: "league-of-legends",
    name: "League of Legends",
    icon: "/images/games/league-of-legends.svg",
    description: "Top up RP League of Legends PC",
    category: "pc",
  },
];

export interface Nominal {
  label: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  bonus?: string;
  category?: "diamond" | "pass" | "bundle";
}

export const nominalMap: Record<string, Nominal[]> = {
  "mobile-legends": [
    { label: "3 Diamonds", price: 1171, originalPrice: 1300 },
    { label: "5 Diamonds", price: 1423, originalPrice: 1575 },
    { label: "12 Diamonds(11 + 1 Bonus)", price: 3323, originalPrice: 5000, popular: true },
    { label: "19 Diamonds(17 + 2 Bonus)", price: 5223, originalPrice: 5775 },
    { label: "28 Diamonds(25 + 3 Bonus)", price: 7600, originalPrice: 11450 },
    { label: "44 Diamonds(40 + 4 Bonus)", price: 11400, originalPrice: 12600 },
    { label: "59 Diamonds(53 + 6 Bonus)", price: 15200, originalPrice: 22900 },
    { label: "85 Diamonds(77 + 8 Bonus)", price: 21850, originalPrice: 32900 },
    { label: "170 Diamonds(154 + 16 Bonus)", price: 43700, originalPrice: 65800 },
    { label: "240 Diamonds(217 + 23 Bonus)", price: 61750, originalPrice: 68250 },
    { label: "296 Diamonds(256 + 40 Bonus)", price: 76000, originalPrice: 114300 },
    { label: "408 Diamonds(367 + 41 Bonus)", price: 104500, originalPrice: 115500, popular: true },
    { label: "568 Diamonds(503 + 65 Bonus)", price: 142500, originalPrice: 157500 },
    { label: "875 Diamonds(774 + 101 Bonus)", price: 218500, originalPrice: 328300 },
    { label: "2010 Diamonds(1708 + 302 Bonus)", price: 475000, originalPrice: 525000 },
    { label: "4830 Diamonds(4003 + 827 Bonus)", price: 1140000, originalPrice: 1260000 },
    { label: "Twilight Pass", price: 150000, originalPrice: 214300, category: "pass", bonus: "Skin & Twilight Coins", popular: true },
    { label: "Weekly Diamond Pass", price: 27550, originalPrice: 30450, category: "pass", bonus: "220 Diamonds/minggu" },
    { label: "Weekly Elite Pack", price: 14203, originalPrice: 21378, category: "bundle", bonus: "+ Crystal of Aurora" },
    { label: "Monthly Elite Pack", price: 70632, originalPrice: 106321, category: "bundle", bonus: "+ Rare Skin Fragment" },
  ],
  "call-of-duty-mobile": [
    { label: "82 CP", price: 15000 },
    { label: "420 CP", price: 75000, originalPrice: 82000 },
    { label: "880 CP", price: 150000, popular: true },
    { label: "2200 CP", price: 370000 },
    { label: "4400 CP", price: 750000 },
    { label: "8800 CP", price: 1400000, popular: true },
  ],
  "blood-strike": [
    { label: "50 Battle Coins", price: 10000 },
    { label: "110 Battle Coins", price: 21000, originalPrice: 25000 },
    { label: "280 Battle Coins", price: 53000, popular: true },
    { label: "580 Battle Coins", price: 106000 },
    { label: "1200 Battle Coins", price: 210000 },
    { label: "3000 Battle Coins", price: 530000, popular: true },
  ],
  "honkai-star-rail": [
    { label: "60 Stellar Jade", price: 15000 },
    { label: "330 Stellar Jade", price: 75000, originalPrice: 85000 },
    { label: "1090 Stellar Jade", price: 245000, popular: true },
    { label: "2240 Stellar Jade", price: 495000 },
    { label: "3880 Stellar Jade", price: 820000 },
    { label: "8080 Stellar Jade", price: 1620000, popular: true },
  ],
  "arena-of-valor": [
    { label: "60 Vouchers", price: 12000 },
    { label: "300 Vouchers", price: 59000, originalPrice: 65000 },
    { label: "980 Vouchers", price: 195000, popular: true },
    { label: "1980 Vouchers", price: 390000 },
    { label: "3280 Vouchers", price: 650000 },
    { label: "6480 Vouchers", price: 1250000, popular: true },
  ],
  "wild-rift": [
    { label: "460 Wild Cores", price: 49000 },
    { label: "975 Wild Cores", price: 99000, originalPrice: 109000 },
    { label: "2050 Wild Cores", price: 199000, popular: true },
    { label: "3650 Wild Cores", price: 349000 },
    { label: "6500 Wild Cores", price: 599000 },
    { label: "12000 Wild Cores", price: 999000, popular: true },
  ],
  "zenless-zone-zero": [
    { label: "60 Polychrome", price: 15000 },
    { label: "330 Polychrome", price: 75000, originalPrice: 85000 },
    { label: "1090 Polychrome", price: 245000, popular: true },
    { label: "2240 Polychrome", price: 495000 },
    { label: "3880 Polychrome", price: 820000 },
    { label: "8080 Polychrome", price: 1620000, popular: true },
  ],
  "ea-sports-fc-mobile": [
    { label: "500 FC Points", price: 25000 },
    { label: "1050 FC Points", price: 50000, originalPrice: 55000 },
    { label: "2200 FC Points", price: 100000, popular: true },
    { label: "5600 FC Points", price: 250000 },
    { label: "12000 FC Points", price: 500000 },
    { label: "25000 FC Points", price: 1000000, popular: true },
  ],
  "magic-chess": [
    { label: "60 Magic Gems", price: 14000 },
    { label: "300 Magic Gems", price: 70000, originalPrice: 78000 },
    { label: "980 Magic Gems", price: 210000, popular: true },
    { label: "1980 Magic Gems", price: 420000 },
    { label: "3280 Magic Gems", price: 700000 },
    { label: "6480 Magic Gems", price: 1350000, popular: true },
  ],
  "free-fire-max": [
    { label: "70 Diamonds", price: 7000 },
    { label: "140 Diamonds", price: 14000, originalPrice: 16000 },
    { label: "355 Diamonds", price: 35500, popular: true },
    { label: "720 Diamonds", price: 71000 },
    { label: "1450 Diamonds", price: 142000 },
    { label: "3640 Diamonds", price: 355000, popular: true },
  ],
  "league-of-legends": [
    { label: "650 RP", price: 55000 },
    { label: "1380 RP", price: 110000, originalPrice: 120000 },
    { label: "2400 RP", price: 185000, popular: true },
    { label: "5000 RP", price: 370000 },
    { label: "10000 RP", price: 740000 },
    { label: "15000 RP", price: 1100000, popular: true },
  ],
  "free-fire": [
    { label: "70 Diamonds", price: 7000 },
    { label: "140 Diamonds", price: 14000, originalPrice: 16000, bonus: "5 Diamonds Bonus" },
    { label: "355 Diamonds", price: 35500, popular: true },
    { label: "720 Diamonds", price: 71000 },
    { label: "1450 Diamonds", price: 142000 },
    { label: "2180 Diamonds", price: 213000 },
    { label: "3640 Diamonds", price: 355000, popular: true },
  ],
  "pubg-mobile": [
    { label: "60 UC", price: 15000 },
    { label: "300+25 UC", price: 75000, originalPrice: 90000 },
    { label: "600+60 UC", price: 150000, popular: true },
    { label: "1500+300 UC", price: 375000 },
    { label: "3000+850 UC", price: 750000 },
    { label: "6000+2250 UC", price: 1500000, popular: true, bonus: "Free 2250 UC" },
  ],
  "honor-of-kings": [
    { label: "10 Tokens", price: 15000 },
    { label: "60 Tokens", price: 90000, originalPrice: 100000 },
    { label: "180 Tokens", price: 270000, popular: true },
    { label: "300 Tokens", price: 450000 },
    { label: "680 Tokens", price: 1020000 },
  ],
  valorant: [
    { label: "475 VP", price: 50000 },
    { label: "1000 VP", price: 100000, popular: true },
    { label: "2050 VP", price: 200000 },
    { label: "3650 VP", price: 350000, originalPrice: 375000 },
    { label: "5350 VP", price: 500000 },
    { label: "11000 VP", price: 1000000, popular: true },
  ],
  "genshin-impact": [
    { label: "60 Genesis Crystals", price: 15000 },
    { label: "300+30 Genesis Crystals", price: 75000, originalPrice: 85000, bonus: "30 Bonus" },
    { label: "980+110 Genesis Crystals", price: 245000, popular: true, bonus: "110 Bonus" },
    { label: "1980+260 Genesis Crystals", price: 495000 },
    { label: "3280+600 Genesis Crystals", price: 820000 },
    { label: "6480+1600 Genesis Crystals", price: 1620000, popular: true, bonus: "1600 Bonus" },
  ],
};

export const pulsaNominals: Nominal[] = [
  { label: "Rp5.000", price: 5500, originalPrice: 6500 },
  { label: "Rp10.000", price: 10500 },
  { label: "Rp15.000", price: 15500 },
  { label: "Rp20.000", price: 20500, popular: true },
  { label: "Rp25.000", price: 25500 },
  { label: "Rp30.000", price: 30500 },
  { label: "Rp50.000", price: 50500, popular: true },
  { label: "Rp100.000", price: 100500 },
];

export const tokenNominals: Nominal[] = [
  { label: "Rp20.000", price: 20000 },
  { label: "Rp50.000", price: 50000 },
  { label: "Rp100.000", price: 100000, popular: true },
  { label: "Rp200.000", price: 200000 },
  { label: "Rp500.000", price: 500000, popular: true },
  { label: "Rp1.000.000", price: 1000000 },
];

export const paymentMethods = [
  {
    id: "qris",
    name: "QRIS",
    icon: "/images/payments/qris.svg",
    channels: [{ id: "qris", name: "QRIS" }],
  },
  {
    id: "bank_transfer",
    name: "Transfer Bank",
    icon: "/images/payments/bank.svg",
    channels: [
      { id: "bca", name: "BCA" },
      { id: "bri", name: "BRI" },
      { id: "bni", name: "BNI" },
      { id: "mandiri", name: "Mandiri" },
    ],
  },
  {
    id: "va",
    name: "Virtual Account",
    icon: "/images/payments/va.svg",
    channels: [
      { id: "bca", name: "BCA Virtual Account" },
      { id: "bri", name: "BRI Virtual Account" },
      { id: "bni", name: "BNI Virtual Account" },
      { id: "mandiri", name: "Mandiri Virtual Account" },
    ],
  },
  {
    id: "ewallet",
    name: "E-Wallet",
    icon: "/images/payments/ewallet.svg",
    channels: [
      { id: "dana", name: "DANA" },
      { id: "ovo", name: "OVO" },
      { id: "gopay", name: "GoPay" },
      { id: "shopeepay", name: "ShopeePay" },
    ],
  },
];

export const operators = [
  { id: "telkomsel", name: "Telkomsel", icon: "/images/operators/telkomsel.svg" },
  { id: "indosat", name: "Indosat", icon: "/images/operators/indosat.svg" },
  { id: "xl", name: "XL", icon: "/images/operators/xl.svg" },
  { id: "axis", name: "Axis", icon: "/images/operators/axis.svg" },
  { id: "smartfren", name: "Smartfren", icon: "/images/operators/smartfren.svg" },
  { id: "tri", name: "Tri", icon: "/images/operators/tri.svg" },
];
