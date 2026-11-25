import React, { useState } from 'react';
import {
  calculateStrategyMetrics,
  evaluateDualMomentum,
  evaluateValueAndMagicFormula,
  RiskSimulationInput,
} from '../utils/strategyMath';
import { Calculator, TrendingUp, Scale, BookmarkPlus, Trash2, AlertCircle } from 'lucide-react';

export interface SavedTradingPlan {
  id: string;
  planName: string;
  assetSymbol: string;
  strategyTitleAr: string;
  capital: number;
  riskPercent: number;
  positionSizeUnits: number;
  expectancyR: number;
  stopLossPrice: number;
  entryPrice: number;
  createdAtAr: string;
}

interface QuantitativeLabSectionProps {
  simInput: RiskSimulationInput;
  activeStrategyTitleAr: string;
  onUpdateSimInput: (next: RiskSimulationInput) => void;
  savedPlans: SavedTradingPlan[];
  onAddSavedPlan: (plan: SavedTradingPlan) => void;
  onDeleteSavedPlan: (id: string) => void;
}

export const QuantitativeLabSection: React.FC<QuantitativeLabSectionProps> = ({
  simInput,
  activeStrategyTitleAr,
  onUpdateSimInput,
  savedPlans,
  onAddSavedPlan,
  onDeleteSavedPlan,
}) => {
  const [activeLabTab, setActiveLabTab] = useState<'risk_expectancy' | 'dual_momentum' | 'value_magic'>(
    'risk_expectancy'
  );

  // Form state for saving a trading plan to the ledger
  const [planName, setPlanName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');
  const [formError, setFormError] = useState('');

  // Dual Momentum Simulator state
  const [dmDomestic, setDmDomestic] = useState<number>(16.8);
  const [dmInternational, setDmInternational] = useState<number>(11.4);
  const [dmTbill, setDmTbill] = useState<number>(4.5);

  // Value & Magic Formula Simulator state
  const [valIntrinsic, setValIntrinsic] = useState<number>(145);
  const [valPrice, setValPrice] = useState<number>(92);
  const [valEbit, setValEbit] = useState<number>(68);
  const [valEv, setValEv] = useState<number>(490);
  const [valCapital, setValCapital] = useState<number>(210);

  const metrics = calculateStrategyMetrics(simInput);
  const dmResult = evaluateDualMomentum({
    domesticReturn12M: dmDomestic,
    internationalReturn12M: dmInternational,
    tbillRate12M: dmTbill,
  });
  const valueResult = evaluateValueAndMagicFormula({
    intrinsicValuePerShare: valIntrinsic,
    currentMarketPrice: valPrice,
    ebitMillions: valEbit,
    enterpriseValueMillions: valEv,
    investedCapitalMillions: valCapital,
  });

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = planName.trim();
    const trimmedSymbol = assetSymbol.trim().toUpperCase();

    if (!trimmedName) {
      setFormError('يرجى إدخال اسم واضح لخطة التداول (مثال: اختراق الذهب الأسبوعي).');
      return;
    }
    if (!trimmedSymbol) {
      setFormError('يرجى إدخال رمز الأصل أو السهم (مثال: AAPL أو XAUUSD).');
      return;
    }
    if (simInput.entryPrice === simInput.stopLossPrice) {
      setFormError('سعر الدخول لا يمكن أن يساوي سعر وقف الخسارة.');
      return;
    }

    setFormError('');
    const newPlan: SavedTradingPlan = {
      id: `plan-${Date.now()}`,
      planName: trimmedName,
      assetSymbol: trimmedSymbol,
      strategyTitleAr: activeStrategyTitleAr,
      capital: simInput.capital,
      riskPercent: simInput.riskPercentPerTrade,
      positionSizeUnits: metrics.positionSizeUnits,
      expectancyR: metrics.expectancyR,
      entryPrice: simInput.entryPrice,
      stopLossPrice: simInput.stopLossPrice,
      createdAtAr: 'توثيق فوري',
    };
    onAddSavedPlan(newPlan);
    setPlanName('');
    setAssetSymbol('');
  };

  // Compute SVG chart points for the 20-trade equity curve
  const minEq = Math.min(...metrics.equityCurve.map((p) => p.equity));
  const maxEq = Math.max(...metrics.equityCurve.map((p) => p.equity));
  const eqRange = Math.max(100, maxEq - minEq);

  return (
    <section id="simulator" className="py-16 border-b border-stone-200 bg-[#F5F1E8]/60">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-300">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">
              التطبيق الرياضي المباشر · Van Tharp &amp; Gary Antonacci &amp; Joel Greenblatt
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 font-editorial text-balance">
              مختبر المحاكاة الكمية وهندسة المخاطر
            </h2>
          </div>

          {/* Interactive Tool Switcher (Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EAE4D7] rounded-lg border border-stone-300">
            <button
              type="button"
              onClick={() => setActiveLabTab('risk_expectancy')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeLabTab === 'risk_expectancy'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>حاسبة فان ثارب والسلاحف (R-Multiples)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLabTab('dual_momentum')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeLabTab === 'dual_momentum'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>محاكي الزخم المزدوج (Dual Momentum)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLabTab('value_magic')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeLabTab === 'value_magic'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>فلتر الصيغة السحرية وهامش الأمان</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Van Tharp R-Multiple, Elder 2%/6%, Turtle ATR, and 20-Trade Curve */}
        {activeLabTab === 'risk_expectancy' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Parameters Panel */}
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6">
              <div className="pb-4 mb-5 border-b border-stone-200">
                <div className="text-xs text-[#9A3412] font-semibold mb-1">
                  النموذج النشط: {activeStrategyTitleAr}
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  معاملات رأس المال ومضاعفات المخاطرة (1R)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sim-capital"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    إجمالي رأس المال ($ أو عملة الحساب)
                  </label>
                  <input
                    id="sim-capital"
                    type="number"
                    min={100}
                    step={500}
                    value={simInput.capital}
                    onChange={(e) =>
                      onUpdateSimInput({ ...simInput, capital: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sim-risk-pct"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    نسبة المخاطرة في الصفقة (%)
                  </label>
                  <input
                    id="sim-risk-pct"
                    type="number"
                    min={0.25}
                    max={10}
                    step={0.25}
                    value={simInput.riskPercentPerTrade}
                    onChange={(e) =>
                      onUpdateSimInput({
                        ...simInput,
                        riskPercentPerTrade: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sim-win-rate"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    نسبة الصفقات الرابحة (Win Rate %)
                  </label>
                  <input
                    id="sim-win-rate"
                    type="number"
                    min={10}
                    max={90}
                    step={1}
                    value={simInput.winRatePercent}
                    onChange={(e) =>
                      onUpdateSimInput({
                        ...simInput,
                        winRatePercent: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sim-rr-ratio"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    مضاعف الربح المستهدف (R-Multiple)
                  </label>
                  <input
                    id="sim-rr-ratio"
                    type="number"
                    min={0.5}
                    max={15}
                    step={0.1}
                    value={simInput.rewardToRiskRatio}
                    onChange={(e) =>
                      onUpdateSimInput({
                        ...simInput,
                        rewardToRiskRatio: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sim-entry"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    سعر الدخول المخطط (Entry)
                  </label>
                  <input
                    id="sim-entry"
                    type="number"
                    min={0.01}
                    step={0.5}
                    value={simInput.entryPrice}
                    onChange={(e) =>
                      onUpdateSimInput({ ...simInput, entryPrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sim-stop"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    سعر وقف الخسارة (Stop-Loss)
                  </label>
                  <input
                    id="sim-stop"
                    type="number"
                    min={0.01}
                    step={0.5}
                    value={simInput.stopLossPrice}
                    onChange={(e) =>
                      onUpdateSimInput({
                        ...simInput,
                        stopLossPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Save to Personal Trading Plan Ledger Form */}
              <form onSubmit={handleSavePlan} className="mt-6 pt-6 border-t border-stone-200">
                <h4 className="text-sm font-bold text-stone-900 mb-3">
                  توثيق الصفقة في دفتر خطة التداول الشخصي (قوانين راي داليو وإلدر)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label htmlFor="plan-name-input" className="block text-xs text-stone-600 mb-1">
                      عنوان الإعداد / الصفقة
                    </label>
                    <input
                      id="plan-name-input"
                      type="text"
                      placeholder="مثال: اختراق قمة 55 يوماً"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="asset-symbol-input" className="block text-xs text-stone-600 mb-1">
                      رمز الأصل المالي (Ticker)
                    </label>
                    <input
                      id="asset-symbol-input"
                      type="text"
                      placeholder="مثال: NVDA أو XAUUSD"
                      value={assetSymbol}
                      onChange={(e) => setAssetSymbol(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                {formError && (
                  <div
                    role="alert"
                    className="mb-3 p-2.5 rounded bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>حفظ الصفقة في دفتر خطة التداول</span>
                </button>
              </form>
            </div>

            {/* Right Results & 20-Trade Mark Douglas Equity Curve */}
            <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    مخرجات التحجيم الكمي والتوقع الرياضي (20 صفقة - تمرين مارك دوغلاس)
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{metrics.riskClassificationAr}</p>
                </div>
                <div className="text-xs font-tabular font-semibold text-stone-800">
                  1R = ${metrics.riskAmountDollars.toLocaleString('en-US')}
                </div>
              </div>

              {/* 4 Core Quantitative Readouts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#FBF9F5] border border-stone-200">
                  <div className="text-xs text-stone-500 mb-1">حجم المركز المسموح</div>
                  <div className="text-xl font-bold font-tabular text-stone-900">
                    {metrics.positionSizeUnits.toLocaleString('en-US')} سهم/وحدة
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 font-tabular">
                    بقيمة ${metrics.positionTotalValue.toLocaleString('en-US')}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#FBF9F5] border border-stone-200">
                  <div className="text-xs text-stone-500 mb-1">التوقع الرياضي (فان ثارب)</div>
                  <div
                    className={`text-xl font-bold font-tabular ${
                      metrics.expectancyR > 0 ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {metrics.expectancyR > 0 ? `+${metrics.expectancyR}R` : `${metrics.expectancyR}R`}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 font-tabular">
                    ${metrics.expectedProfitPerTradeDollars.toLocaleString('en-US')} / صفقة
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#FBF9F5] border border-stone-200">
                  <div className="text-xs text-stone-500 mb-1">نصف معيار كيلي (Chan)</div>
                  <div className="text-xl font-bold font-tabular text-[#9A3412]">
                    {metrics.halfKellyPercent}%
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 font-tabular">
                    كيلي الكامل: {metrics.kellyPercent}%
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#FBF9F5] border border-stone-200">
                  <div className="text-xs text-stone-500 mb-1">سقف إلدر الشهري (6%)</div>
                  <div className="text-xl font-bold font-tabular text-stone-900">
                    {metrics.elderMaxConcurrentTrades} صفقات
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    الحد الأقصى للمراكز المفتوحة
                  </div>
                </div>
              </div>

              {/* Deterministic 20-Trade Equity Curve Visualization */}
              <div className="p-5 rounded-lg bg-[#FBF9F5] border border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-800">
                    منحنى نمو رأس المال المحاكى عبر عينة من 20 صفقة متتالية
                  </span>
                  <span className="text-xs font-tabular font-semibold text-emerald-800">
                    الرصيد بعد 20 صفقة: $
                    {metrics.equityCurve[metrics.equityCurve.length - 1].equity.toLocaleString(
                      'en-US'
                    )}
                  </span>
                </div>

                <svg
                  viewBox="0 0 600 170"
                  className="w-full h-40 overflow-visible"
                  role="img"
                  aria-label="منحنى نمو المحفظة خلال 20 صفقة"
                >
                  {/* Baseline grid lines */}
                  <line x1="0" y1="20" x2="600" y2="20" stroke="#E7E5E4" strokeDasharray="3 3" />
                  <line x1="0" y1="85" x2="600" y2="85" stroke="#E7E5E4" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="#D6D3D1" />

                  {/* Polyline representing equity trajectory */}
                  <polyline
                    fill="none"
                    stroke="#9A3412"
                    strokeWidth="2.5"
                    points={metrics.equityCurve
                      .map((point, idx) => {
                        const x = (idx / 20) * 580 + 10;
                        const y = 145 - ((point.equity - minEq) / eqRange) * 120;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Data nodes */}
                  {metrics.equityCurve.map((point, idx) => {
                    const x = (idx / 20) * 580 + 10;
                    const y = 145 - ((point.equity - minEq) / eqRange) * 120;
                    return (
                      <circle
                        key={point.trade}
                        cx={x}
                        cy={y}
                        r={idx === 0 || idx === 20 ? 4.5 : 3}
                        fill={
                          point.rOutcome > 0
                            ? '#15803D'
                            : point.rOutcome < 0
                            ? '#B91C1C'
                            : '#1C1917'
                        }
                      />
                    );
                  })}
                </svg>

                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200/80">
                  <span>الصفقة 0 (البداية: ${simInput.capital.toLocaleString('en-US')})</span>
                  <span>النقاط الخضراء = صفقة رابحة (+{simInput.rewardToRiskRatio}R) · الحمراء = وقف خسارة (-1R)</span>
                  <span>الصفقة 20</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Gary Antonacci Dual Momentum (GEM) Simulator */}
        {activeLabTab === 'dual_momentum' && (
          <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xl font-bold text-stone-900 font-editorial">
                  محاكي نموذج الزخم المزدوج العالمي (Gary Antonacci GEM)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  أدخل عوائد آخر 12 شهراً للمؤشرات الثلاثة أو اختر إحدى الدورات التاريخية لاختبار كيف يتخذ نظام الزخم المزدوج قرار التمركز الشهري.
                </p>

                {/* Historical Preset Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDmDomestic(21.4);
                      setDmInternational(14.2);
                      setDmTbill(2.1);
                    }}
                    className="px-3 py-1.5 text-xs bg-[#F5F1E8] hover:bg-[#EBE5D8] text-stone-800 rounded border border-stone-300 cursor-pointer"
                  >
                    سيناريو سوق صاعد قيادي
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDmDomestic(-12.5);
                      setDmInternational(-16.0);
                      setDmTbill(4.2);
                    }}
                    className="px-3 py-1.5 text-xs bg-[#F5F1E8] hover:bg-[#EBE5D8] text-stone-800 rounded border border-stone-300 cursor-pointer"
                  >
                    سيناريو بداية انهيار 2008 / 2022
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDmDomestic(7.5);
                      setDmInternational(19.3);
                      setDmTbill(3.0);
                    }}
                    className="px-3 py-1.5 text-xs bg-[#F5F1E8] hover:bg-[#EBE5D8] text-stone-800 rounded border border-stone-300 cursor-pointer"
                  >
                    سيناريو تفوق الأسواق الدولية
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label htmlFor="dm-dom" className="block text-xs font-semibold text-stone-700 mb-1">
                      عائد سوق الأسهم المحلي / الأمريكي لـ 12 شهراً (%)
                    </label>
                    <input
                      id="dm-dom"
                      type="number"
                      step={0.5}
                      value={dmDomestic}
                      onChange={(e) => setDmDomestic(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="dm-intl" className="block text-xs font-semibold text-stone-700 mb-1">
                      عائد سوق الأسهم الدولي العالمي لـ 12 شهراً (%)
                    </label>
                    <input
                      id="dm-intl"
                      type="number"
                      step={0.5}
                      value={dmInternational}
                      onChange={(e) => setDmInternational(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="dm-tbill" className="block text-xs font-semibold text-stone-700 mb-1">
                      عائد أذون الخزانة الخالي من المخاطر لـ 12 شهراً (%)
                    </label>
                    <input
                      id="dm-tbill"
                      type="number"
                      step={0.25}
                      value={dmTbill}
                      onChange={(e) => setDmTbill(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between bg-[#FBF9F5] border border-stone-200 rounded-xl p-6">
                <div>
                  <div className="text-xs text-stone-500 mb-2">
                    القرار الآلي لنموذج Dual Momentum Investing (2015):
                  </div>
                  <div className="text-2xl font-bold text-stone-900 font-editorial mb-4">
                    التخصيص الموصى به (100%): {dmResult.selectedAssetAr}
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed p-4 bg-white rounded-lg border border-stone-200">
                    {dmResult.rationaleAr}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-stone-200">
                  <div>
                    <div className="text-xs text-stone-500">حالة الزخم المطلق</div>
                    <div
                      className={`text-sm font-bold mt-1 ${
                        dmResult.absoluteMomentumPassed ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {dmResult.absoluteMomentumPassed
                        ? 'إيجابي (تفعيل الأسهم)'
                        : 'سلبي (تفعيل الملاذ الدفاعي)'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">الفائز في الزخم النسبي</div>
                    <div className="text-sm font-bold text-stone-900 mt-1">
                      {dmResult.relativeWinnerAr}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">الفارق فوق العائد الآمن</div>
                    <div className="text-sm font-bold font-tabular text-stone-900 mt-1">
                      {dmResult.excessReturnOverRiskFree > 0
                        ? `+${dmResult.excessReturnOverRiskFree}%`
                        : `${dmResult.excessReturnOverRiskFree}%`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Benjamin Graham + Joel Greenblatt Magic Formula Evaluator */}
        {activeLabTab === 'value_magic' && (
          <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xl font-bold text-stone-900 font-editorial">
                  فاحص هامش الأمان (Graham) والصيغة السحرية (Greenblatt)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  يفحص هذا المختبر ما إذا كان السهم يجمع بين رخص السعر مقارنة بالقيمة الجوهرية (≥ 30% هامش أمان) وجودة العائد على رأس المال المستثمر (ROC ≥ 20%).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="val-intrinsic" className="block text-xs font-semibold text-stone-700 mb-1">
                      القيمة الجوهرية المقدرة للسهم ($)
                    </label>
                    <input
                      id="val-intrinsic"
                      type="number"
                      value={valIntrinsic}
                      onChange={(e) => setValIntrinsic(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="val-price" className="block text-xs font-semibold text-stone-700 mb-1">
                      السعر السوقي الحالي للسهم ($)
                    </label>
                    <input
                      id="val-price"
                      type="number"
                      value={valPrice}
                      onChange={(e) => setValPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="val-ebit" className="block text-xs font-semibold text-stone-700 mb-1">
                      الربح التشغيلي السنوي EBIT (مليون)
                    </label>
                    <input
                      id="val-ebit"
                      type="number"
                      value={valEbit}
                      onChange={(e) => setValEbit(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="val-ev" className="block text-xs font-semibold text-stone-700 mb-1">
                      القيمة المؤسسية EV (مليون)
                    </label>
                    <input
                      id="val-ev"
                      type="number"
                      value={valEv}
                      onChange={(e) => setValEv(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="val-cap" className="block text-xs font-semibold text-stone-700 mb-1">
                      رأس المال العامل الصافي + الأصول الثابتة الملموسة (مليون)
                    </label>
                    <input
                      id="val-cap"
                      type="number"
                      value={valCapital}
                      onChange={(e) => setValCapital(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-tabular bg-[#FBF9F5] border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between bg-[#FBF9F5] border border-stone-200 rounded-xl p-6">
                <div>
                  <div className="text-xs text-stone-500 mb-2">
                    حكم اللجنة الاستثمارية (Graham · Buffett · Greenblatt):
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-stone-900 font-editorial mb-4">
                    {valueResult.verdictAr}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                  <div className="p-4 bg-white rounded-lg border border-stone-200">
                    <div className="text-xs text-stone-500">هامش الأمان (Graham)</div>
                    <div
                      className={`text-2xl font-bold font-tabular mt-1 ${
                        valueResult.passesGrahamMargin ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {valueResult.marginOfSafetyPercent}%
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1">
                      المعيار المطلوب: ≥ 30%
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-stone-200">
                    <div className="text-xs text-stone-500">العائد على رأس المال (ROC)</div>
                    <div
                      className={`text-2xl font-bold font-tabular mt-1 ${
                        valueResult.returnOnCapitalPercent >= 20
                          ? 'text-emerald-700'
                          : 'text-stone-900'
                      }`}
                    >
                      {valueResult.returnOnCapitalPercent}%
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1">
                      معيار الخندق التنافسي: ≥ 20%
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-stone-200">
                    <div className="text-xs text-stone-500">عائد الأرباح (EBIT / EV)</div>
                    <div
                      className={`text-2xl font-bold font-tabular mt-1 ${
                        valueResult.earningsYieldPercent >= 10
                          ? 'text-emerald-700'
                          : 'text-stone-900'
                      }`}
                    >
                      {valueResult.earningsYieldPercent}%
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1">
                      معيار الصيغة السحرية: ≥ 10%
                    </div>
                  </div>
                </div>

                <div className="text-xs text-stone-600 pt-4 border-t border-stone-200">
                  مرجع الحساب: الفصل 20 من كتاب The Intelligent Investor لبنيامين جراهام، ومعادلة الصيغة السحرية في The Little Book That Beats the Market لجوئيل جرينبلات.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal Trading Plan Ledger Section */}
        <div id="ledger" className="mt-10 bg-white border border-stone-200 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-200">
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                دفتر خطة التداول الشخصي الموثق ({savedPlans.length} خطط محفوظة)
              </h3>
              <p className="text-xs text-stone-500">
                تطبيقاً لقاعدة ألكسندر إلدر وراي داليو: كل صفقة يجب أن تُوثق بحجمها المسموح وتوقعها الرياضي قبل الدخول.
              </p>
            </div>
          </div>

          {savedPlans.length === 0 ? (
            <div className="p-8 text-center bg-[#FBF9F5] rounded-lg border border-stone-200">
              <p className="text-sm text-stone-600 mb-2">
                لا توجد صفقات موثقة حالياً في دفتر التداول الخاص بك.
              </p>
              <p className="text-xs text-stone-500">
                استخدم نموذج «توثيق الصفقة» في الحاسبة أعلاه لإضافة أول إعداد تداول محسوب المخاطر.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-xs text-stone-500">
                    <th className="py-3 px-3 font-semibold">عنوان الخطة</th>
                    <th className="py-3 px-3 font-semibold">الأصل</th>
                    <th className="py-3 px-3 font-semibold">الاستراتيجية المرجعية</th>
                    <th className="py-3 px-3 font-semibold">الدخول / الوقف</th>
                    <th className="py-3 px-3 font-semibold">المخاطرة</th>
                    <th className="py-3 px-3 font-semibold">حجم المركز</th>
                    <th className="py-3 px-3 font-semibold">التوقع الرياضي</th>
                    <th className="py-3 px-3 font-semibold text-left">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-xs">
                  {savedPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-[#FBF9F5] transition-colors">
                      <td className="py-3 px-3 font-bold text-stone-900">{plan.planName}</td>
                      <td className="py-3 px-3 font-tabular font-semibold text-[#9A3412]">
                        {plan.assetSymbol}
                      </td>
                      <td className="py-3 px-3 text-stone-600">{plan.strategyTitleAr}</td>
                      <td className="py-3 px-3 font-tabular text-stone-800">
                        {plan.entryPrice} / {plan.stopLossPrice}
                      </td>
                      <td className="py-3 px-3 font-tabular text-stone-800">{plan.riskPercent}%</td>
                      <td className="py-3 px-3 font-tabular font-semibold text-stone-900">
                        {plan.positionSizeUnits.toLocaleString('en-US')} وحدة
                      </td>
                      <td className="py-3 px-3 font-tabular font-semibold text-emerald-700">
                        +{plan.expectancyR}R
                      </td>
                      <td className="py-3 px-3 text-left">
                        <button
                          type="button"
                          onClick={() => onDeleteSavedPlan(plan.id)}
                          aria-label={`حذف خطة ${plan.planName}`}
                          className="inline-flex items-center gap-1 text-stone-500 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>حذف</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
