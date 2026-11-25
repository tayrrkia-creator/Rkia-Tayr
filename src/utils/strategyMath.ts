export interface RiskSimulationInput {
  capital: number;
  riskPercentPerTrade: number;
  winRatePercent: number;
  rewardToRiskRatio: number;
  entryPrice: number;
  stopLossPrice: number;
  atrValue?: number;
}

export interface RiskSimulationResult {
  riskAmountDollars: number;
  stopDistancePerUnit: number;
  positionSizeUnits: number;
  positionTotalValue: number;
  expectancyR: number;
  expectedProfitPerTradeDollars: number;
  kellyPercent: number;
  halfKellyPercent: number;
  elderMaxConcurrentTrades: number;
  turtleAtrUnitSize: number;
  riskClassificationAr: string;
  equityCurve: { trade: number; equity: number; rOutcome: number }[];
}

/**
 * Calculates Van Tharp's R-Multiple Expectancy, Curtis Faith's Turtle Position Sizing,
 * Alexander Elder's 2%/6% Rule, and Ernie Chan's Half-Kelly Criterion.
 */
export function calculateStrategyMetrics(input: RiskSimulationInput): RiskSimulationResult {
  const capital = Math.max(100, Number(input.capital) || 10000);
  const riskPct = Math.min(25, Math.max(0.1, Number(input.riskPercentPerTrade) || 1));
  const winRate = Math.min(95, Math.max(5, Number(input.winRatePercent) || 45)) / 100;
  const lossRate = 1 - winRate;
  const rRatio = Math.max(0.2, Number(input.rewardToRiskRatio) || 2.5);

  const entry = Math.max(0.01, Number(input.entryPrice) || 100);
  const stop = Math.max(0.01, Number(input.stopLossPrice) || 95);
  const stopDistance = Math.max(0.01, Math.abs(entry - stop));
  const atr = Math.max(0.01, Number(input.atrValue) || stopDistance / 2);

  // 1. Dollar risk per trade (1R)
  const riskAmountDollars = Number((capital * (riskPct / 100)).toFixed(2));

  // 2. Position size in shares/contracts
  const positionSizeUnits = Math.max(1, Math.floor(riskAmountDollars / stopDistance));
  const positionTotalValue = Number((positionSizeUnits * entry).toFixed(2));

  // 3. Van Tharp Expectancy in R-Multiples: E = (W * R) - (L * 1)
  const expectancyR = Number(((winRate * rRatio) - (lossRate * 1)).toFixed(2));
  const expectedProfitPerTradeDollars = Number((expectancyR * riskAmountDollars).toFixed(2));

  // 4. Kelly Criterion: f* = (p * b - q) / b
  const rawKelly = ((winRate * rRatio) - lossRate) / rRatio;
  const kellyPercent = Number(Math.max(0, rawKelly * 100).toFixed(1));
  const halfKellyPercent = Number((kellyPercent / 2).toFixed(1));

  // 5. Alexander Elder 6% Monthly Shark Rule: max open losing exposures before halting
  const elderMaxConcurrentTrades = Math.max(1, Math.floor(6 / riskPct));

  // 6. Turtle Trader 1% Equity / (1N = ATR) Unit Size
  const turtleAtrUnitSize = Math.max(1, Math.floor((capital * 0.01) / (2 * atr)));

  // 7. Arabic Classification
  let riskClassificationAr = 'متوازن — متوافق مع قاعدة إلدر (2%)';
  if (expectancyR <= 0) {
    riskClassificationAr = 'توقع رياضي سلبي — الاستراتيجية تستنزف رأس المال على المدى الطويل';
  } else if (riskPct > 2.5) {
    riskClassificationAr = 'مخاطرة مرتفعة — تتجاوز سقف 2% لكتاب التداول من أجل المعيشة';
  } else if (expectancyR >= 0.6 && riskPct <= 2) {
    riskClassificationAr = 'امتياز مؤسسي — توقع رياضي إيجابي قوي مع حماية صارمة لرأس المال';
  }

  // 8. Deterministic 20-trade sequence based on winRate
  const equityCurve: { trade: number; equity: number; rOutcome: number }[] = [
    { trade: 0, equity: capital, rOutcome: 0 },
  ];
  let runningEquity = capital;
  let winAccumulator = 0;

  for (let i = 1; i <= 20; i++) {
    winAccumulator += winRate;
    let isWin = false;
    if (winAccumulator >= 1 - 1e-9) {
      isWin = true;
      winAccumulator -= 1;
    }
    const rOutcome = isWin ? rRatio : -1;
    const tradeRisk = runningEquity * (riskPct / 100);
    runningEquity = Number(Math.max(0, runningEquity + tradeRisk * rOutcome).toFixed(2));
    equityCurve.push({ trade: i, equity: runningEquity, rOutcome });
  }

  return {
    riskAmountDollars,
    stopDistancePerUnit: Number(stopDistance.toFixed(2)),
    positionSizeUnits,
    positionTotalValue,
    expectancyR,
    expectedProfitPerTradeDollars,
    kellyPercent,
    halfKellyPercent,
    elderMaxConcurrentTrades,
    turtleAtrUnitSize,
    riskClassificationAr,
    equityCurve,
  };
}

export interface DualMomentumInput {
  domesticReturn12M: number; // e.g. US / Local Equity Index 12-month return %
  internationalReturn12M: number; // e.g. Global ex-US Equity Index 12-month return %
  tbillRate12M: number; // Risk-free short-term Treasury bill yield %
}

export interface DualMomentumOutput {
  selectedAssetAr: string;
  absoluteMomentumPassed: boolean;
  relativeWinnerAr: string;
  excessReturnOverRiskFree: number;
  rationaleAr: string;
}

/**
 * Implements Gary Antonacci's Dual Momentum GEM (Global Equity Momentum) model
 * from "Dual Momentum Investing (2015)".
 */
export function evaluateDualMomentum(input: DualMomentumInput): DualMomentumOutput {
  const dom = Number(input.domesticReturn12M) || 0;
  const intl = Number(input.internationalReturn12M) || 0;
  const rf = Number(input.tbillRate12M) || 0;

  const bestEquityReturn = Math.max(dom, intl);
  const relativeWinnerAr =
    dom >= intl ? 'سوق الأسهم المحلي / الأمريكي (S&P 500)' : 'سوق الأسهم الدولي العالمي (ACWI ex-US)';
  const absoluteMomentumPassed = bestEquityReturn > rf;
  const excessReturnOverRiskFree = Number((bestEquityReturn - rf).toFixed(2));

  if (!absoluteMomentumPassed) {
    return {
      selectedAssetAr: 'سندات الخزانة والصكوك قصيرة الأجل (ملاذ دفاعي 100%)',
      absoluteMomentumPassed: false,
      relativeWinnerAr,
      excessReturnOverRiskFree,
      rationaleAr:
        'فشل فلتر الزخم المطلق لأن عائد أفضل سوق أسهم خلال 12 شهراً أقل من عائد النقد الخالي من المخاطر؛ يتم الخروج الكامل من الأسهم لتجنب الانهيارات الكبرى.',
    };
  }

  return {
    selectedAssetAr: relativeWinnerAr,
    absoluteMomentumPassed: true,
    relativeWinnerAr,
    excessReturnOverRiskFree,
    rationaleAr: `نجح فلتر الزخم المطلق بفارق +${excessReturnOverRiskFree}% فوق العائد الخالي من المخاطر، وتفوق ${relativeWinnerAr} في الزخم النسبي.`,
  };
}

export interface ValueMagicInput {
  intrinsicValuePerShare: number;
  currentMarketPrice: number;
  ebitMillions: number;
  enterpriseValueMillions: number;
  investedCapitalMillions: number;
}

export interface ValueMagicOutput {
  marginOfSafetyPercent: number;
  earningsYieldPercent: number;
  returnOnCapitalPercent: number;
  passesGrahamMargin: boolean;
  passesGreenblattMagic: boolean;
  verdictAr: string;
}

/**
 * Implements Benjamin Graham's Margin of Safety ("The Intelligent Investor")
 * combined with Joel Greenblatt's Magic Formula ("The Little Book That Beats the Market").
 */
export function evaluateValueAndMagicFormula(input: ValueMagicInput): ValueMagicOutput {
  const intrinsic = Math.max(0.01, Number(input.intrinsicValuePerShare) || 100);
  const price = Math.max(0.01, Number(input.currentMarketPrice) || 70);
  const ebit = Number(input.ebitMillions) || 0;
  const ev = Math.max(1, Number(input.enterpriseValueMillions) || 100);
  const capital = Math.max(1, Number(input.investedCapitalMillions) || 50);

  const marginOfSafetyPercent = Number((((intrinsic - price) / intrinsic) * 100).toFixed(1));
  const earningsYieldPercent = Number(((ebit / ev) * 100).toFixed(1));
  const returnOnCapitalPercent = Number(((ebit / capital) * 100).toFixed(1));

  // Benjamin Graham recommends >= 30% Margin of Safety
  const passesGrahamMargin = marginOfSafetyPercent >= 30;
  // Joel Greenblatt seeks high ROC (>= 20%) and high Earnings Yield (>= 10%)
  const passesGreenblattMagic = returnOnCapitalPercent >= 20 && earningsYieldPercent >= 10;

  let verdictAr = 'تقييم غير مكتمل الشروط — السهم يفتقر إلى هامش أمان كافٍ أو جودة عائد رأس المال';
  if (passesGrahamMargin && passesGreenblattMagic) {
    verdictAr = 'فرصة استثنائية مركّبة — تجمع بين خندق بافيت والصيغة السحرية وهامش أمان جراهام (أكثر من 30%)';
  } else if (passesGrahamMargin) {
    verdictAr = 'سهم قيمة كلاسيكي (مدرسة جراهام) — هامش أمان مرتفع لكن عائد رأس المال متوسط';
  } else if (passesGreenblattMagic) {
    verdictAr = 'شركة ذات جودة ممتازة (مدرسة فيشر وملخص بافيت) — انتظر تراجع السعر لتحقيق هامش أمان 30%';
  }

  return {
    marginOfSafetyPercent,
    earningsYieldPercent,
    returnOnCapitalPercent,
    passesGrahamMargin,
    passesGreenblattMagic,
    verdictAr,
  };
}
