// utils/pricing.ts

const BASE =
  Number(import.meta.env.VITE_BASE_COMMISSION) || 41.25;

const DEC =
  Number(import.meta.env.VITE_DAILY_DECREASE) || 1.25;

const FITFARE =
  Number(import.meta.env.VITE_FITFARE_PERCENT) || 0.6;

const OWNER =
  Number(import.meta.env.VITE_OWNER_PERCENT) || 0.4;

export const calculatePricing = (price: number, days: number) => {
  if (price <= 0 || days <= 0) {
    return {
      baseTotal: 0,
      commissionPercent: 0,
      commissionAmount: 0,
      finalPrice: 0,
      fitfareGets: 0,
      ownerGets: 0,
    };
  }

  const baseTotal = price * days;

  const commissionPercent = BASE - DEC * days;

  const commissionAmount = Math.round(
    baseTotal * (commissionPercent / 100)
  );

  const finalPrice = baseTotal + commissionAmount;

  const fitfareGets = Math.round(commissionAmount * FITFARE);

  const ownerGets = baseTotal + Math.round(commissionAmount * OWNER);

  return {
    baseTotal,
    commissionPercent,
    commissionAmount,
    finalPrice,
    fitfareGets,
    ownerGets,
  };
};

// 📊 Graph helper
export const generateChartData = (price: number, days: number) => {
  const data = [];

  for (let i = 1; i <= (days || 10); i++) {
    const base = price * i;
    const percent = BASE - DEC * i;
    const commission = base * (percent / 100);
    const total = base + commission;
    const owner = base + commission * OWNER;

    data.push({
      day: i,
      user: Math.round(total),
      commission: Math.round(commission),
      owner: Math.round(owner),
    });
  }

  return data;
};