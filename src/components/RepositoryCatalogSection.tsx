import React, { useState, useMemo } from 'react';
import {
  KELVIN_REPOSITORY_BOOKS,
  STRATEGY_CATEGORIES,
  RepositoryBook,
} from '../data/kelvinBooksAndStrategies';
import { Search, ExternalLink, BookMarked, RotateCcw, X } from 'lucide-react';

export const RepositoryCatalogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBookModal, setActiveBookModal] = useState<RepositoryBook | null>(null);

  const filteredBooks = useMemo(() => {
    return KELVIN_REPOSITORY_BOOKS.filter((book) => {
      const matchesCat =
        selectedCategory === 'all' || book.categoryKey === selectedCategory;
      const matchesLevel =
        selectedLevel === 'all' || book.levelAr === selectedLevel;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat && matchesLevel;

      return (
        matchesCat &&
        matchesLevel &&
        (book.titleAr.toLowerCase().includes(q) ||
          book.titleEn.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.summaryAr.toLowerCase().includes(q) ||
          book.goldenRuleAr.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  return (
    <section id="library" className="py-16 border-b border-stone-200">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-300">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">
              الأرشيف المرجعي الكامل · kelvin200/some-investment-books
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 font-editorial text-balance">
              موسوعة الكتب المصنفة وخريطة التعلم المنهجية
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md leading-relaxed">
            يتضمن المستودع 155 ملفاً (تغطي أكثر من 95 كتاباً فريداً بصيغ PDF وEPUB وMOBI بالإضافة إلى ملف التصنيف المنهجي Trading.txt). استكشف خلاصة كل كتاب وقاعدته الذهبية بالعربية.
          </p>
        </div>

        {/* Repository Trading.txt 4-Stage Learning Curriculum Roadmap */}
        <div className="my-8 p-6 bg-[#F5F1E8] border border-stone-200 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-stone-300/80">
            <h3 className="text-base font-bold text-stone-900">
              خريطة التعلم المنهجية المستخرجة من ملف Trading.txt في المستودع
            </h3>
            <span className="text-xs text-stone-600">
              انقر على أي مرحلة لتصفية الكتب المطابقة لها
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                level: 'تطوير العقلية' as const,
                step: 'المرحلة 01',
                title: 'بناء الأسلوب والانضباط النفسي',
                desc: 'قبل تعلم المؤشرات: إتقان التفكير الاحتمالي (Mark Douglas) ومبادئ القرار المنهجي (Ray Dalio) وحكمة سحرة السوق.',
              },
              {
                level: 'تأسيسي' as const,
                step: 'المرحلة 02',
                title: 'التأسيس الفني واستثمار القيمة',
                desc: 'إتقان الشموع اليابانية (Nison)، هيكل السوق (Grimes & Murphy)، وهامش الأمان لبنيامين جراهام.',
              },
              {
                level: 'متوسط' as const,
                step: 'المرحلة 03',
                title: 'أنظمة الزخم والتداول المتأرجح',
                desc: 'تطبيق الزخم المزدوج (Antonacci)، الشاشة الثلاثية (Elder)، نظام السلاحف (Faith)، والتداول المجرد.',
              },
              {
                level: 'متقدم' as const,
                step: 'المرحلة 04',
                title: 'التداول الكمي والخيارات والماكرو',
                desc: 'المراجحة الإحصائية (Ernie Chan)، تسعير تقلب الخيارات (Natenberg)، ونظرية الانعكاسية لسوروس.',
              },
            ].map((stage) => {
              const isLevelActive = selectedLevel === stage.level;
              return (
                <button
                  key={stage.level}
                  type="button"
                  onClick={() =>
                    setSelectedLevel(isLevelActive ? 'all' : stage.level)
                  }
                  className={`text-right p-4 rounded-lg border transition-colors cursor-pointer ${
                    isLevelActive
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div
                    className={`text-xs font-tabular mb-1 ${
                      isLevelActive ? 'text-amber-300' : 'text-[#9A3412]'
                    }`}
                  >
                    {stage.step} · مستوى {stage.level}
                  </div>
                  <div className="font-bold text-sm mb-1.5">{stage.title}</div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isLevelActive ? 'text-stone-300' : 'text-stone-600'
                    }`}
                  >
                    {stage.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input & School Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Interactive Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {STRATEGY_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#9A3412] text-white border-[#9A3412]'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-[#F5F1E8]'
                  }`}
                >
                  {cat.labelAr}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <label htmlFor="book-search-input" className="sr-only">
              ابحث في الكتب أو المؤلفين أو القواعد الذهبية
            </label>
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="book-search-input"
              type="search"
              placeholder="ابحث باسم الكتاب، المؤلف، أو الاستراتيجية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* Filter Status Bar */}
        <div className="flex items-center justify-between text-xs text-stone-600 mb-6 pb-3 border-b border-stone-200">
          <div>
            عرض <span className="font-tabular font-bold text-stone-900">{filteredBooks.length}</span> مرجعاً رئيسياً
            {selectedLevel !== 'all' ? ` · المرحلة: ${selectedLevel}` : ''}
          </div>
          {(selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-[#9A3412] hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط الفلتر والبحث</span>
            </button>
          )}
        </div>

        {/* Books Grid or Empty State */}
        {filteredBooks.length === 0 ? (
          <div className="p-12 text-center bg-white border border-stone-200 rounded-xl">
            <BookMarked className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-900 mb-1">
              لا توجد كتب مطابقة لمعايير البحث الحالية
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              جرّب البحث بكلمات مثل «شموع»، «بافيت»، «Turtle»، «Elder»، أو «Momentum».
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              عرض جميع الكتب في المستودع
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between hover:border-stone-400 transition-colors"
              >
                <div>
                  {/* Clean Unboxed Metadata with Middot Separators (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mb-2.5">
                    <span className="text-[#9A3412] font-semibold">{book.levelAr}</span>
                    <span aria-hidden="true">·</span>
                    <span>{book.author}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-tabular">{book.year}</span>
                  </div>

                  {/* Primary Arabic Book Title */}
                  <h3 className="text-lg font-bold text-stone-900 font-editorial leading-snug mb-1">
                    {book.titleAr}
                  </h3>

                  {/* Original English Title from Repo */}
                  <div
                    dir="ltr"
                    className="text-xs text-stone-500 text-right font-tabular mb-4 line-clamp-1"
                  >
                    {book.titleEn}
                  </div>

                  {/* Arabic Executive Synthesis */}
                  <p className="text-xs text-stone-700 leading-relaxed mb-4">
                    {book.summaryAr}
                  </p>

                  {/* Actionable Golden Rule Box (No thick left/right border, clean subtle surface) */}
                  <div className="p-3.5 rounded-lg bg-[#FBF9F5] border border-stone-200 text-xs text-stone-800 leading-relaxed mb-4">
                    {book.goldenRuleAr}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveBookModal(book)}
                    className="text-xs font-semibold text-stone-900 hover:text-[#9A3412] transition-colors cursor-pointer"
                  >
                    بطاقة الفهرسة الكاملة
                  </button>

                  <a
                    href={`https://github.com/kelvin200/some-investment-books/blob/master/${encodeURIComponent(
                      book.repoFileName
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <span>ملف المستودع</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Accessible Book Accession Detail Modal */}
      {activeBookModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-book-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        >
          <div className="bg-[#FBF9F5] border border-stone-300 rounded-xl max-w-2xl w-full p-6 lg:p-8 shadow-xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-300">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span>{activeBookModal.categoryLabelAr}</span>
                  <span aria-hidden="true">·</span>
                  <span>المستوى: {activeBookModal.levelAr}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-tabular">{activeBookModal.year}</span>
                </div>
                <h3
                  id="modal-book-title"
                  className="text-2xl font-bold text-stone-900 font-editorial"
                >
                  {activeBookModal.titleAr}
                </h3>
                <p dir="ltr" className="text-xs text-stone-500 text-right mt-1">
                  {activeBookModal.titleEn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveBookModal(null)}
                aria-label="إغلاق نافذة تفاصيل الكتاب"
                className="p-2 text-stone-500 hover:text-stone-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-stone-200 text-xs">
              <div>
                <dt className="text-stone-500">المؤلف:</dt>
                <dd className="font-bold text-stone-900 mt-0.5">{activeBookModal.author}</dd>
              </div>
              <div>
                <dt className="text-stone-500">تقييم المستودع (Trading.txt):</dt>
                <dd className="font-bold text-[#9A3412] mt-0.5">
                  {activeBookModal.ratingNote || 'مرجع أساسي معتمد في الأرشيف'}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-stone-500">اسم الملف الأصلي في GitHub:</dt>
                <dd
                  dir="ltr"
                  className="font-tabular text-stone-800 bg-white px-2.5 py-1.5 rounded border border-stone-200 mt-1 text-right break-all"
                >
                  {activeBookModal.repoFileName}
                </dd>
              </div>
            </dl>

            <div className="py-5 space-y-4 text-sm text-stone-800 leading-relaxed">
              <div>
                <div className="font-bold text-stone-900 mb-1">الخلاصة التحليلية للكتاب:</div>
                <p>{activeBookModal.summaryAr}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-stone-200">
                <div className="font-bold text-[#9A3412] mb-1">
                  القاعدة التداولية القابلة للتطبيق فوراً:
                </div>
                <p>{activeBookModal.goldenRuleAr}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
              <a
                href={`https://github.com/kelvin200/some-investment-books/blob/master/${encodeURIComponent(
                  activeBookModal.repoFileName
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-colors"
              >
                <span>فتح الملف في مستودع GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setActiveBookModal(null)}
                className="px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
