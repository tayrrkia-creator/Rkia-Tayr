/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SYNTHESIZED_STRATEGIES, SynthesizedStrategy } from './data/kelvinBooksAndStrategies';
import { StrategyMasterclassSection } from './components/StrategyMasterclassSection';
import { QuantitativeLabSection, SavedTradingPlan } from './components/QuantitativeLabSection';
import { RepositoryCatalogSection } from './components/RepositoryCatalogSection';
import { RiskSimulationInput } from './utils/strategyMath';
import { BookOpen, Compass, ArrowDownLeft } from 'lucide-react';

const INITIAL_SAVED_PLANS: SavedTradingPlan[] = [
  {
    id: 'seed-plan-1',
    planName: 'اختراق قناة دونشيان 55 يوماً مع فلتر الزخم المزدوج',
    assetSymbol: 'SPY / XAUUSD',
    strategyTitleAr: 'استراتيجية «الزخم المزدوج وقنوات السلاحف»',
    capital: 50000,
    riskPercent: 1.0,
    positionSizeUnits: 100,
    expectancyR: 0.85,
    entryPrice: 245,
    stopLossPrice: 240,
    createdAtAr: 'نموذج مرجعي',
  },
  {
    id: 'seed-plan-2',
    planName: 'تراجع الشاشة الثلاثية مع حجم توقف مؤسسي (Stopping Volume)',
    assetSymbol: 'MSFT',
    strategyTitleAr: 'مصفوفة «الشاشة الثلاثية وتحليل الحجم والسعر»',
    capital: 50000,
    riskPercent: 1.5,
    positionSizeUnits: 93,
    expectancyR: 0.94,
    entryPrice: 418,
    stopLossPrice: 410,
    createdAtAr: 'نموذج مرجعي',
  },
];

export default function App() {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(
    SYNTHESIZED_STRATEGIES[0].id
  );
  const [heroImageError, setHeroImageError] = useState<boolean>(false);

  const [simInput, setSimInput] = useState<RiskSimulationInput>({
    capital: 50000,
    riskPercentPerTrade: SYNTHESIZED_STRATEGIES[0].recommendedRiskPct,
    winRatePercent: SYNTHESIZED_STRATEGIES[0].winRateBenchmark,
    rewardToRiskRatio: SYNTHESIZED_STRATEGIES[0].rewardToRiskBenchmark,
    entryPrice: 120,
    stopLossPrice: 115,
    atrValue: 2.5,
  });

  const [savedPlans, setSavedPlans] = useState<SavedTradingPlan[]>(INITIAL_SAVED_PLANS);

  const activeStrategy =
    SYNTHESIZED_STRATEGIES.find((s) => s.id === selectedStrategyId) ||
    SYNTHESIZED_STRATEGIES[0];

  const handleSelectStrategy = (strategy: SynthesizedStrategy) => {
    setSelectedStrategyId(strategy.id);
  };

  const handleLoadStrategyIntoSimulator = (strategy: SynthesizedStrategy) => {
    setSelectedStrategyId(strategy.id);
    setSimInput((prev) => ({
      ...prev,
      riskPercentPerTrade: strategy.recommendedRiskPct,
      winRatePercent: strategy.winRateBenchmark,
      rewardToRiskRatio: strategy.rewardToRiskBenchmark,
    }));
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddSavedPlan = (plan: SavedTradingPlan) => {
    setSavedPlans((prev) => [plan, ...prev]);
  };

  const handleDeleteSavedPlan = (id: string) => {
    setSavedPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-xl font-bold tracking-tight text-stone-900 font-editorial whitespace-nowrap shrink-0"
          >
            موسوعة استراتيجيات الاستثمار
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
          >
            <a
              href="#strategies"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              الاستراتيجيات المركّبة
            </a>
            <a
              href="#simulator"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              مختبر المحاكاة
            </a>
            <a
              href="#ledger"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              دفتر التداول
            </a>
            <a
              href="#library"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              مكتبة الكتب
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('simulator')}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              بناء خطة تداول
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Institutional Editorial Hero Section */}
        <section className="py-12 lg:py-16 border-b border-stone-200">
          <div className="max-w-[1240px] mx-auto px-6">
            {/* 2-Column Split with items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Right (RTL Primary) Editorial Column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-4">
                    <span className="font-semibold text-[#9A3412]">
                      دراسة تحليلية كاملة للمستودع
                    </span>
                    <span aria-hidden="true">·</span>
                    <span dir="ltr">github.com/kelvin200/some-investment-books</span>
                    <span aria-hidden="true">·</span>
                    <span>155 ملفاً مرجعياً</span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 font-editorial leading-[1.2] mb-5 text-balance">
                    الهندسة التركيبية لأقوى استراتيجيات التداول والاستثمار من 95 كتاباً كلاسيكياً وكمياً
                  </h1>

                  <p className="text-base lg:text-lg text-stone-700 leading-relaxed mb-6 max-w-2xl">
                    بعد تحليل جميع مؤلفات مستودع <span className="font-semibold text-stone-900">kelvin200</span> — من كلاسيكيات بنيامين جراهام وجيسي ليفرمور ووارن بافيت إلى خوارزميات إيرني تشان والزخم المزدوج لغاري أنطوناتشي ونظام السلاحف — استخلصنا لك <span className="font-semibold text-[#9A3412]">8 استراتيجيات هجينة</span> تعالج نقاط الضعف الفردية لكل مدرسة وتربطها بمختبر رياضي حي لتحجيم العقود.
                  </p>
                </div>

                {/* Editorial Pull Quote & Primary Actions */}
                <div>
                  <blockquote className="py-4 my-4 border-y border-stone-300 text-base lg:text-lg font-editorial italic text-stone-800">
                    «المتداولون الهواة يبحثون عن مؤشر يتنبأ بالمستقبل؛ أما المحترفون فيدمجون فلتر اتجاه ماكروي، نقطة دخول منخفضة المخاطرة، ومعادلة تحجيم عقود تضمن البقاء عبر 20 صفقة متتالية.»
                  </blockquote>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => scrollToSection('strategies')}
                      className="px-6 py-3 text-sm font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      استكشف الاستراتيجيات الـ 8 المركّبة
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('library')}
                      className="px-5 py-3 text-sm font-semibold text-stone-800 bg-[#F3EFE6] hover:bg-[#E7E0D2] border border-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
                    >
                      <span>تصفح فهرس الكتب الكامل</span>
                      <ArrowDownLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Left Image Column */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative flex-1 min-h-[300px] lg:h-full rounded-xl overflow-hidden border border-stone-300 bg-stone-900">
                  {!heroImageError ? (
                    <img
                      src="/src/assets/images/hero_investment_library_1795613452866.jpg"
                      alt="قاعة أبحاث استراتيجيات الاستثمار والمخطوطات المالية"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-stone-900 text-stone-200">
                      <Compass className="w-12 h-12 text-amber-400 mb-3" />
                      <div className="text-lg font-bold font-editorial">
                        أرشيف kelvin200 لاستراتيجيات الأسواق المالية
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="text-xs text-amber-300 font-semibold mb-1">
                      الاستراتيجية المختارة حالياً للمحاكاة
                    </div>
                    <div className="text-lg font-bold font-editorial leading-snug">
                      {activeStrategy.titleAr}
                    </div>
                    <div className="text-xs text-stone-300 mt-1 font-tabular">
                      نسبة النجاح المرجعية: {activeStrategy.winRateBenchmark}% · العائد للمخاطرة:{' '}
                      {activeStrategy.rewardToRiskBenchmark}:1
                    </div>
                  </div>
                </div>
                <p className="text-xs font-editorial italic text-stone-500 mt-2">
                  شكل 1 — التكامل بين مدارس التحليل الأساسي، السلوك السعري، وهندسة المخاطر الكمية في مستودع kelvin200.
                </p>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Archive Summary Row below the Hero Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-stone-200">
              <div className="p-4 bg-white border border-stone-200 rounded-lg">
                <div className="text-xs text-stone-500">إجمالي محتوى المستودع</div>
                <div className="text-2xl font-bold font-tabular text-stone-900 mt-1">
                  155 ملفاً · 95+ كتاباً
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  تغطي الأسهم، العقود الآجلة، الفوركس، والخيارات
                </div>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-lg">
                <div className="text-xs text-stone-500">أقوى استراتيجية اتجاه وزخم</div>
                <div className="text-lg font-bold text-stone-900 mt-1">
                  الزخم المزدوج + قنوات السلاحف
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  Antonacci GEM + Curtis Faith 2N ATR
                </div>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-lg">
                <div className="text-xs text-stone-500">أقوى استراتيجية تداول متأرجح</div>
                <div className="text-lg font-bold text-stone-900 mt-1">
                  الشاشة الثلاثية + الحجم والسعر
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  Alexander Elder + Anna Coulling VPA
                </div>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-lg">
                <div className="text-xs text-stone-500">أقوى معادلة بناء ثروة وقيمة</div>
                <div className="text-lg font-bold text-stone-900 mt-1">
                  الصيغة السحرية + هامش الأمان 30%
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  Graham + Buffett + Joel Greenblatt
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The 8 Master Synthesized Strategies */}
        <StrategyMasterclassSection
          selectedStrategyId={selectedStrategyId}
          onSelectStrategy={handleSelectStrategy}
          onLoadIntoSimulator={handleLoadStrategyIntoSimulator}
        />

        {/* Section 2: Interactive Quantitative Simulator & Trading Plan Ledger */}
        <QuantitativeLabSection
          simInput={simInput}
          activeStrategyTitleAr={activeStrategy.titleAr}
          onUpdateSimInput={setSimInput}
          savedPlans={savedPlans}
          onAddSavedPlan={handleAddSavedPlan}
          onDeleteSavedPlan={handleDeleteSavedPlan}
        />

        {/* Section 3: Complete Searchable Book Archive & Learning Roadmap */}
        <RepositoryCatalogSection />
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="bg-[#F3EFE6] border-t border-stone-300 py-10">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#9A3412]" />
            <span className="font-bold text-stone-900">
              موسوعة استراتيجيات الاستثمار — خلاصة مكتبة kelvin200
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/kelvin200/some-investment-books"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 underline underline-offset-4"
            >
              المستودع الأصلي على GitHub (kelvin200/some-investment-books)
            </a>
            <span aria-hidden="true">·</span>
            <span>جميع النماذج الرياضية للأغراض التعليمية والتحليلية</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
