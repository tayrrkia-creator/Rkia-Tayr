import React, { useState } from 'react';
import { SYNTHESIZED_STRATEGIES, SynthesizedStrategy } from '../data/kelvinBooksAndStrategies';
import { BookOpen, CheckSquare, Square, ArrowUpLeft, Calculator, ShieldCheck } from 'lucide-react';

interface StrategyMasterclassSectionProps {
  selectedStrategyId: string;
  onSelectStrategy: (strategy: SynthesizedStrategy) => void;
  onLoadIntoSimulator: (strategy: SynthesizedStrategy) => void;
}

export const StrategyMasterclassSection: React.FC<StrategyMasterclassSectionProps> = ({
  selectedStrategyId,
  onSelectStrategy,
  onLoadIntoSimulator,
}) => {
  const activeStrategy =
    SYNTHESIZED_STRATEGIES.find((s) => s.id === selectedStrategyId) || SYNTHESIZED_STRATEGIES[0];

  // Track interactive checklist state per strategy so traders can test setup readiness
  const [checkedRules, setCheckedRules] = useState<Record<string, boolean>>({});
  const [imageFailed, setImageFailed] = useState<Record<string, boolean>>({});

  const toggleRule = (ruleKey: string) => {
    setCheckedRules((prev) => ({ ...prev, [ruleKey]: !prev[ruleKey] }));
  };

  const totalEntryRules = activeStrategy.entryRulesAr.length;
  const completedEntryRules = activeStrategy.entryRulesAr.filter(
    (_, idx) => checkedRules[`${activeStrategy.id}-entry-${idx}`]
  ).length;

  return (
    <section id="strategies" className="py-16 border-b border-stone-200">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-300">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">
              الخلاصة التركيبية · 8 استراتيجيات هجينة عالية الميزة الإحصائية
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 font-editorial text-balance">
              أقوى الاستراتيجيات المستخلصة من مكتبة kelvin200
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md leading-relaxed">
            بدلاً من قراءة كل كتاب بمعزل عن الآخر، قمنا بدمج نقاط القوة التكميلية بين مدارس الزخم، السلوك السعري، استثمار القيمة، والتحجيم الكمي في 8 أنظمة تداول متكاملة القواعد.
          </p>
        </div>

        {/* Interactive Strategy Selector Tabs (8 Master Strategies) */}
        <div
          role="tablist"
          aria-label="قائمة الاستراتيجيات المستخلصة"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 my-8"
        >
          {SYNTHESIZED_STRATEGIES.map((strategy) => {
            const isSelected = strategy.id === activeStrategy.id;
            return (
              <button
                key={strategy.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectStrategy(strategy)}
                className={`text-right p-4 rounded-lg border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-[#FBF9F5] border-stone-900'
                    : 'bg-[#F5F1E8] text-stone-800 border-stone-200 hover:bg-[#EBE5D8]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className={`font-tabular ${isSelected ? 'text-amber-300' : 'text-[#9A3412]'}`}>
                    {strategy.numberLabel} . استراتيجية مركّبة
                  </span>
                  <span className={`font-tabular ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    R:R {strategy.rewardToRiskBenchmark}:1
                  </span>
                </div>
                <div className="font-semibold text-sm leading-snug line-clamp-2">
                  {strategy.titleAr}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Strategy Editorial Blueprint */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 lg:p-10">
          {/* Top Blueprint Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-stone-200 items-stretch">
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                {/* Unboxed metadata row with middot separators */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
                  <span className="font-semibold text-[#9A3412]">
                    الاستراتيجية {activeStrategy.numberLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeStrategy.schoolAr}</span>
                  <span aria-hidden="true">·</span>
                  <span>الأفق الزمني: {activeStrategy.timeHorizonAr}</span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-stone-900 font-editorial mb-3 text-balance">
                  {activeStrategy.titleAr}
                </h3>
                <p className="text-base text-stone-600 leading-relaxed mb-6">
                  {activeStrategy.subtitleAr}
                </p>

                {/* Core Philosophy & Why It Works */}
                <div className="space-y-4 text-sm text-stone-800 leading-relaxed bg-[#FBF9F5] p-5 rounded-lg border border-stone-200">
                  <div>
                    <span className="font-bold text-stone-900">الفلسفة التركيبية: </span>
                    {activeStrategy.corePhilosophyAr}
                  </div>
                  <div className="pt-3 border-t border-stone-200">
                    <span className="font-bold text-[#9A3412]">لماذا تتفوق إحصائياً؟ </span>
                    {activeStrategy.whyItWorksAr}
                  </div>
                </div>
              </div>

              {/* Action Bar & Mathematical Formula */}
              <div className="mt-6 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-stone-500 mb-1">المعادلة الرياضية الحاكمة للميزة (Mathematical Edge):</div>
                  <code
                    dir="ltr"
                    className="inline-block text-xs lg:text-sm font-tabular bg-stone-100 text-stone-900 px-3 py-1.5 rounded border border-stone-200"
                  >
                    {activeStrategy.mathematicalEdgeFormula}
                  </code>
                </div>

                <button
                  type="button"
                  onClick={() => onLoadIntoSimulator(activeStrategy)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>تطبيق المعاملات في مختبر المحاكاة</span>
                </button>
              </div>
            </div>

            {/* Right Visual & Benchmark Metrics Column */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-[#FBF9F5] border border-stone-200 rounded-lg p-5">
              {activeStrategy.imagePath && !imageFailed[activeStrategy.id] ? (
                <div className="relative w-full h-44 rounded-md overflow-hidden mb-5 border border-stone-200 bg-stone-100">
                  <img
                    src={activeStrategy.imagePath}
                    alt={activeStrategy.titleAr}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImageFailed((prev) => ({ ...prev, [activeStrategy.id]: true }))
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-36 rounded-md mb-5 border border-stone-200 bg-[#F3EFE6] flex flex-col items-center justify-center p-4 text-center">
                  <BookOpen className="w-7 h-7 text-[#9A3412] mb-2" />
                  <span className="text-xs font-semibold text-stone-700">
                    مخطط استراتيجية رقم {activeStrategy.numberLabel}
                  </span>
                  <span className="text-[11px] text-stone-500 mt-0.5">
                    {activeStrategy.schoolAr}
                  </span>
                </div>
              )}

              {/* Quantitative Benchmarks Table */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-stone-900 pb-2 border-b border-stone-200">
                  المعايير الإحصائية المرجعية للاستراتيجية
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-200/70">
                  <span className="text-stone-600">نسبة النجاح المرجعية (Win Rate):</span>
                  <span className="font-tabular font-semibold text-stone-900">
                    {activeStrategy.winRateBenchmark}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-200/70">
                  <span className="text-stone-600">متوسط العائد للمخاطرة (R-Multiple):</span>
                  <span className="font-tabular font-semibold text-emerald-700">
                    +{activeStrategy.rewardToRiskBenchmark}R : 1R
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-200/70">
                  <span className="text-stone-600">المخاطرة الموصى بها للصفقة:</span>
                  <span className="font-tabular font-semibold text-[#9A3412]">
                    {activeStrategy.recommendedRiskPct}% من رأس المال
                  </span>
                </div>
                <div className="pt-2 text-xs text-stone-600 leading-relaxed">
                  {activeStrategy.mathematicalEdgeExplanationAr}
                </div>
              </div>
            </div>
          </div>

          {/* Entry Checklist & Exit/Risk Rules Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-b border-stone-200">
            {/* Column 1: Interactive Entry Rules Checklist */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-stone-900">
                  قائمة فحص شروط الدخول (انقر للتحقق قبل الصفقة)
                </h4>
                <span className="text-xs font-tabular text-stone-600">
                  مكتمل: {completedEntryRules} / {totalEntryRules}
                </span>
              </div>

              <div className="space-y-3">
                {activeStrategy.entryRulesAr.map((rule, index) => {
                  const ruleKey = `${activeStrategy.id}-entry-${index}`;
                  const isChecked = !!checkedRules[ruleKey];
                  return (
                    <button
                      key={ruleKey}
                      type="button"
                      onClick={() => toggleRule(ruleKey)}
                      className={`w-full text-right p-3.5 rounded-lg border transition-colors flex items-start gap-3 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 text-stone-900'
                          : 'bg-[#FBF9F5] border-stone-200 text-stone-800 hover:bg-[#F3EFE6]'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
                      )}
                      <span className="text-sm leading-relaxed">{rule}</span>
                    </button>
                  );
                })}
              </div>

              {completedEntryRules === totalEntryRules && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    اكتملت جميع شروط الدخول ({totalEntryRules}/{totalEntryRules}) — الفرصة مؤهلة للتنفيذ وفق القواعد المؤسسية.
                  </span>
                </div>
              )}
            </div>

            {/* Column 2: Exit & Capital Protection Rules */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-stone-900">
                  قواعد الخروج وإدارة المخاطر وحماية رأس المال
                </h4>
                <span className="text-xs text-stone-500">صرامة التنفيذ 100%</span>
              </div>

              <div className="space-y-3">
                {activeStrategy.exitAndRiskRulesAr.map((rule, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[#FBF9F5] border border-stone-200 text-sm text-stone-800 leading-relaxed"
                  >
                    <span className="font-tabular font-bold text-[#9A3412] ml-2">
                      0{index + 1}.
                    </span>
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Source Books Footnote Strip */}
          <div className="pt-6">
            <div className="text-xs font-semibold text-stone-500 mb-3">
              المصادر المرجعية لهذه الاستراتيجية من مستودع kelvin200/some-investment-books:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeStrategy.sourceBooks.map((book, idx) => (
                <a
                  key={idx}
                  href="https://github.com/kelvin200/some-investment-books"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3.5 rounded-lg bg-[#FBF9F5] border border-stone-200 hover:border-stone-400 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900 group-hover:text-[#9A3412] transition-colors mb-1">
                      {book.titleAr}
                    </div>
                    <div dir="ltr" className="text-[11px] text-stone-500 text-right line-clamp-1">
                      {book.titleEn}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-stone-600">
                    <span>{book.author}</span>
                    <ArrowUpLeft className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#9A3412]" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
