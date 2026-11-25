import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStrategyMetrics,
  evaluateDualMomentum,
  evaluateValueAndMagicFormula,
} from './strategyMath';

test('calculateStrategyMetrics computes Van Tharp R-expectancy and position sizing accurately', () => {
  const res = calculateStrategyMetrics({
    capital: 50000,
    riskPercentPerTrade: 1.5,
    winRatePercent: 40,
    rewardToRiskRatio: 3,
    entryPrice: 100,
    stopLossPrice: 95,
    atrValue: 2.5,
  });

  // 1.5% of 50,000 = $750 risk
  assert.equal(res.riskAmountDollars, 750);
  // Stop distance = 5 -> 750 / 5 = 150 units
  assert.equal(res.positionSizeUnits, 150);
  // Expectancy = (0.40 * 3) - (0.60 * 1) = 1.2 - 0.6 = +0.60R
  assert.equal(res.expectancyR, 0.6);
  // Expected profit per trade = 0.6 * 750 = $450
  assert.equal(res.expectedProfitPerTradeDollars, 450);
  // Elder 6% limit / 1.5% = 4 concurrent positions
  assert.equal(res.elderMaxConcurrentTrades, 4);
  // 20 trades + initial = 21 points in equityCurve
  assert.equal(res.equityCurve.length, 21);
  assert.ok(res.equityCurve[20].equity > 50000);
});

test('evaluateDualMomentum switches to Treasury Bills when absolute momentum fails', () => {
  const bearMarket = evaluateDualMomentum({
    domesticReturn12M: -4.5,
    internationalReturn12M: -8.2,
    tbillRate12M: 4.0,
  });
  assert.equal(bearMarket.absoluteMomentumPassed, false);
  assert.ok(bearMarket.selectedAssetAr.includes('سندات الخزانة'));

  const bullMarket = evaluateDualMomentum({
    domesticReturn12M: 18.4,
    internationalReturn12M: 11.2,
    tbillRate12M: 4.5,
  });
  assert.equal(bullMarket.absoluteMomentumPassed, true);
  assert.equal(bullMarket.excessReturnOverRiskFree, 13.9);
});

test('evaluateValueAndMagicFormula validates Benjamin Graham 30% margin of safety and Greenblatt ROC', () => {
  const compounder = evaluateValueAndMagicFormula({
    intrinsicValuePerShare: 120,
    currentMarketPrice: 78, // 35% discount
    ebitMillions: 45,
    enterpriseValueMillions: 300, // 15% earnings yield
    investedCapitalMillions: 150, // 30% ROC
  });

  assert.equal(compounder.marginOfSafetyPercent, 35);
  assert.equal(compounder.earningsYieldPercent, 15);
  assert.equal(compounder.returnOnCapitalPercent, 30);
  assert.equal(compounder.passesGrahamMargin, true);
  assert.equal(compounder.passesGreenblattMagic, true);
});
