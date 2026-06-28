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
    icon: "🎮",
    description: "Top up Diamond Mobile Legends dengan harga termurah",
  },
  {
    slug: "free-fire",
    name: "Free Fire",
    icon: "🔥",
    description: "Top up Free Fire Diamonds & Membership",
  },
  {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    icon: "🔫",
    description: "Top up UC PUBG Mobile murah dan cepat",
  },
  {
    slug: "honor-of-kings",
    name: "Honor of Kings",
    icon: "👑",
    description: "Top up Honor of Kings tokens",
  },
  {
    slug: "valorant",
    name: "Valorant",
    icon: "⚔️",
    description: "Top up Valorant Points (VP)",
  },
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    icon: "⭐",
    description: "Top up Genesis Crystals Genshin Impact",
  },
];

export const nominalMap: Record<string, { label: string; price: number }[]> = {
  "mobile-legends": [
    { label: "86 Diamonds", price: 21000 },
    { label: "172 Diamonds", price: 42000 },
    { label: "257 Diamonds", price: 63000 },
    { label: "344 Diamonds", price: 84000 },
    { label: "429 Diamonds", price: 105000 },
    { label: "514 Diamonds", price: 126000 },
    { label: "706 Diamonds", price: 168000 },
    { label: "1050 Diamonds", price: 252000 },
    { label: "2010 Diamonds", price: 483000 },
  ],
  "free-fire": [
    { label: "70 Diamonds", price: 7000 },
    { label: "140 Diamonds", price: 14000 },
    { label: "355 Diamonds", price: 35500 },
    { label: "720 Diamonds", price: 71000 },
    { label: "1450 Diamonds", price: 142000 },
    { label: "2180 Diamonds", price: 213000 },
    { label: "3640 Diamonds", price: 355000 },
  ],
  "pubg-mobile": [
    { label: "60 UC", price: 15000 },
    { label: "300+25 UC", price: 75000 },
    { label: "600+60 UC", price: 150000 },
    { label: "1500+300 UC", price: 375000 },
    { label: "3000+850 UC", price: 750000 },
    { label: "6000+2250 UC", price: 1500000 },
  ],
  "honor-of-kings": [
    { label: "10 Tokens", price: 15000 },
    { label: "60 Tokens", price: 90000 },
    { label: "180 Tokens", price: 270000 },
    { label: "300 Tokens", price: 450000 },
    { label: "680 Tokens", price: 1020000 },
  ],
  valorant: [
    { label: "475 VP", price: 50000 },
    { label: "1000 VP", price: 100000 },
    { label: "2050 VP", price: 200000 },
    { label: "3650 VP", price: 350000 },
    { label: "5350 VP", price: 500000 },
    { label: "11000 VP", price: 1000000 },
  ],
  "genshin-impact": [
    { label: "60 Genesis Crystals", price: 15000 },
    { label: "300+30 Genesis Crystals", price: 75000 },
    { label: "980+110 Genesis Crystals", price: 245000 },
    { label: "1980+260 Genesis Crystals", price: 495000 },
    { label: "3280+600 Genesis Crystals", price: 820000 },
    { label: "6480+1600 Genesis Crystals", price: 1620000 },
  ],
};

export const pulsaNominals = [
  { label: "Rp5.000", price: 5500 },
  { label: "Rp10.000", price: 10500 },
  { label: "Rp15.000", price: 15500 },
  { label: "Rp20.000", price: 20500 },
  { label: "Rp25.000", price: 25500 },
  { label: "Rp30.000", price: 30500 },
  { label: "Rp50.000", price: 50500 },
  { label: "Rp100.000", price: 100500 },
];

export const tokenNominals = [
  { label: "Rp20.000", price: 20000 },
  { label: "Rp50.000", price: 50000 },
  { label: "Rp100.000", price: 100000 },
  { label: "Rp200.000", price: 200000 },
  { label: "Rp500.000", price: 500000 },
  { label: "Rp1.000.000", price: 1000000 },
];

export const paymentMethods = [
  {
    id: "qris",
    name: "QRIS",
    icon: "📱",
    channels: [{ id: "qris", name: "QRIS" }],
  },
  {
    id: "bank_transfer",
    name: "Transfer Bank",
    icon: "🏦",
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
    icon: "💳",
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
    icon: "💰",
    channels: [
      { id: "dana", name: "DANA" },
      { id: "ovo", name: "OVO" },
      { id: "gopay", name: "GoPay" },
      { id: "shopeepay", name: "ShopeePay" },
    ],
  },
];

export const operators = [
  { id: "telkomsel", name: "Telkomsel", icon: "📶" },
  { id: "indosat", name: "Indosat", icon: "📶" },
  { id: "xl", name: "XL", icon: "📶" },
  { id: "axis", name: "Axis", icon: "📶" },
  { id: "smartfren", name: "Smartfren", icon: "📶" },
  { id: "tri", name: "Tri", icon: "📶" },
];
