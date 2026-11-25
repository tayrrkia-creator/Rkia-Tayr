export interface SynthesizedStrategy {
  id: string;
  numberLabel: string;
  titleAr: string;
  subtitleAr: string;
  schoolAr: string;
  timeHorizonAr: string;
  winRateBenchmark: number;
  rewardToRiskBenchmark: number;
  recommendedRiskPct: number;
  imagePath?: string;
  corePhilosophyAr: string;
  whyItWorksAr: string;
  sourceBooks: { titleEn: string; titleAr: string; author: string }[];
  entryRulesAr: string[];
  exitAndRiskRulesAr: string[];
  mathematicalEdgeFormula: string;
  mathematicalEdgeExplanationAr: string;
}

export interface RepositoryBook {
  id: string;
  titleEn: string;
  titleAr: string;
  author: string;
  year: number;
  categoryKey:
    | 'psychology_style'
    | 'technical_price_action'
    | 'trend_momentum'
    | 'value_fundamentals'
    | 'quant_systems_options'
    | 'forex_macro_history';
  categoryLabelAr: string;
  levelAr: 'تأسيسي' | 'متوسط' | 'متقدم' | 'تطوير العقلية';
  repoFileName: string;
  ratingNote?: string;
  summaryAr: string;
  goldenRuleAr: string;
}

export const STRATEGY_CATEGORIES = [
  { key: 'all', labelAr: 'جميع المدارس (95+ كتاباً)' },
  { key: 'psychology_style', labelAr: 'تطوير الأسلوب وعلم نفس التداول' },
  { key: 'technical_price_action', labelAr: 'التحليل الفني والسلوك السعري والشموع' },
  { key: 'trend_momentum', labelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح' },
  { key: 'value_fundamentals', labelAr: 'استثمار القيمة وبناء الثروة والأسهم' },
  { key: 'quant_systems_options', labelAr: 'التداول الكمي وبناء الأنظمة والخيارات' },
  { key: 'forex_macro_history', labelAr: 'أسواق العملات والماكرو وتاريخ الأزمات' },
] as const;

export const SYNTHESIZED_STRATEGIES: SynthesizedStrategy[] = [
  {
    id: 'dual-momentum-turtle',
    numberLabel: '01',
    titleAr: 'استراتيجية «الزخم المزدوج وقنوات السلاحف»',
    subtitleAr: 'دمج الزخم المطلق والنسبي (Antonacci) مع اختراقات قنوات دونشيان وتحجيم العقود بالمدى الحقيقي (Turtle ATR)',
    schoolAr: 'اتباع الاتجاه الكمي والزخم الماكروي',
    timeHorizonAr: 'متوسط إلى طويل الأجل (تقييم يومي / إعادة توازن شهرية)',
    winRateBenchmark: 42,
    rewardToRiskBenchmark: 3.4,
    recommendedRiskPct: 1.0,
    imagePath: '/src/assets/images/strategy_trend_turtle_1795613426576.jpg',
    corePhilosophyAr:
      'أكبر نقطة ضعف في أنظمة اتباع الاتجاه الكلاسيكية (مثل نظام السلاحف 1983) هي الخسائر المتكررة (Whipsaws) عندما يدخل السوق في مسار عرضي أو هبوطي مضطرب. بحلول دمج فلتر «الزخم المزدوج» لغاري أنطوناتشي كمرشح علوي قبل تفعيل اختراقات السلاحف لـ 20 أو 55 يوماً، يتداول النظام فقط في الأصول التي تتفوق على أذون الخزانة (زخم مطلق) وتتفوق على نظيراتها العالمية (زخم نسبي).',
    whyItWorksAr:
      'تستغل هذه الاستراتيجية ظاهرة تفوق الزخم (Momentum Premia) المثبتة إحصائياً عبر قرنين من البيانات: الزخم النسبي يلتقط القوة النسبية للقطاعات الرابحة، بينما الزخم المطلق يعمل كمظلة نجاة تخرجك إلى السندات قصيرة الأجل فور تحول العائد السنوي إلى أقل من عائد النقد الخالي من المخاطر.',
    sourceBooks: [
      {
        titleEn: 'Dual Momentum Investing (2015)',
        titleAr: 'الاستثمار بالزخم المزدوج',
        author: 'Gary Antonacci',
      },
      {
        titleEn: 'Way of the Turtle (2007)',
        titleAr: 'طريقة السلحفاة: الأساليب السرية للمتداولين الأسطوريين',
        author: 'Curtis Faith',
      },
      {
        titleEn: 'Trend Following (2009) & The Trend Following Bible (2012)',
        titleAr: 'اتباع الاتجاه وإنجيل متتبعي الاتجاه',
        author: 'Michael Covel & Andrew Abraham',
      },
      {
        titleEn: 'Reminiscences of a Stock Operator (1923/2008)',
        titleAr: 'مذكرات مضارب في بورصة الأسهم',
        author: 'Edwin Lefèvre (Jesse Livermore)',
      },
    ],
    entryRulesAr: [
      'الخطوة 1 (فلتر الزخم المطلق): قارن عائد الأصل أو المؤشر خلال آخر 12 شهراً بعائد أذون الخزانة قصيرة الأجل؛ إذا كان أقل، يُمنع الشراء ويتحول رأس المال إلى الملاذ النقدي.',
      'الخطوة 2 (فلتر الزخم النسبي): اختر الأصل أو القطاع الأعلى عائداً خلال 12 شهراً بين الأسهم المحلية، الأسهم الدولية، أو السلع.',
      'الخطوة 3 (نقطة التنفيذ - اختراق السلاحف): ادخل شراءً عند إغلاق السعر أعلى من قمة آخر 20 يوماً (النظام قصير الأجل S1) أو قمة 55 يوماً (النظام الرئيسي S2).',
      'الخطوة 4 (الهرمية على طريقة ليفرمور والسلاحف): أضف وحدة جديدة (1 Unit) كلما تحرك السعر لصالحك بمقدار 0.5N (نصف قيمة مؤشر ATR لـ 20 يوماً)، بحد أقصى 4 وحدات.',
    ],
    exitAndRiskRulesAr: [
      'وقف الخسارة الصلب: يُوضع دائماً على بعد 2N (ضعف مؤشر متوسط المدى الحقيقي ATR-20) أسفل نقطة الدخول الأخيرة.',
      'حجم الوحدة الواحدة: لا تتجاوز مخاطرة الوحدة 1% من إجمالي الحساب، أي: حجم العقد = (1% × رأس المال) ÷ (2 × ATR).',
      'الخروج الهيكلي لجني الأرباح: أغلق كامل المركز إذا كسر السعر أدنى قاع لآخر 10 أيام (للنظام S1) أو آخر 20 يوماً (للنظام S2).',
    ],
    mathematicalEdgeFormula: 'Unit Size = (0.01 × Equity) / (2 × ATR₂₀) | Stop = Entry − 2N',
    mathematicalEdgeExplanationAr:
      'توحيد المخاطرة عبر التقلب (N = ATR20) يضمن أن حركة يومية عادية في سهم متقلب أو عملة لا تضرب وقف الخسارة عشوائياً، وأن كل صفقة تحمل نفس الأثر المالي (1%) بغض النظر عن الأصل.',
  },
  {
    id: 'elder-triple-screen-vpa',
    numberLabel: '02',
    titleAr: 'مصفوفة «الشاشة الثلاثية وتحليل الحجم والسعر»',
    subtitleAr: 'دمج نظام الشاشات الثلاث ومؤشر القوة (Alexander Elder) مع قراءة أحجام التداول المؤسسية (Anna Coulling)',
    schoolAr: 'التحليل الفني متعدد الأطر الزمنية والسيولة',
    timeHorizonAr: 'تداول متأرجح (Swing Trading - من 3 إلى 15 يوماً)',
    winRateBenchmark: 54,
    rewardToRiskBenchmark: 2.6,
    recommendedRiskPct: 1.5,
    imagePath: '/src/assets/images/strategy_price_action_1795613431074.jpg',
    corePhilosophyAr:
      'يفشل معظم المتداولين لأنهم ينظرون إلى إطار زمني واحد ويستخدمون مؤشرات متشابهة تعطي إشارات متضاربة. حل الدكتور ألكسندر إلدر هذه المعضلة عبر «الشاشة الثلاثية» (المد والجزر، الموجة، والاختراق)، وعند دمجها مع «تحليل الحجم والسعر VPA» لآنا كولينغ، نصبح قادرين على التأكد من أن التراجع السعري هو جني أرباح ضعيف السيولة وليس تصريفاً مؤسسياً.',
    whyItWorksAr:
      'الشاشة الأولى تفرض عليك السباحة مع اتجاه الإطار الزمني الأكبر (5 أضعاف إطارك)، والشاشة الثانية تستخدم المذبذبات في مكانها الصحيح الوحيد (اصطياد التراجعات المؤقتة عكس المد العام)، بينما يكشف حجم التداول (Effort vs. Result) بصمة صناع السوق قبل الانطلاق.',
    sourceBooks: [
      {
        titleEn: 'The New Trading for a Living (2014) & Come Into My Trading Room (2002)',
        titleAr: 'التداول الجديد من أجل المعيشة وادخل إلى غرفة تداولي',
        author: 'Dr. Alexander Elder',
      },
      {
        titleEn: 'A Complete Guide To Volume Price Analysis (2013)',
        titleAr: 'الدليل الكامل لتحليل الحجم والسعر',
        author: 'Anna Coulling',
      },
      {
        titleEn: 'Mastering the Trade (2nd Ed, 2012)',
        titleAr: 'إتقان التداول: تقنيات مجربة للتداول اليومي والمتأرجح',
        author: 'John F. Carter',
      },
      {
        titleEn: 'The Art and Science of Technical Analysis (2012)',
        titleAr: 'فن وعلم التحليل الفني: هيكل السوق والسلوك السعري',
        author: 'Adam Grimes',
      },
    ],
    entryRulesAr: [
      'الشاشة الأولى (المد السوقي - الإطار الأسبوعي): حدد الاتجاه العام عبر ميل المتوسط المتحرك الأسي EMA-26 وميل مدرج MACD؛ إذا كان كلاهما صاعداً، يُسمح بالشراء فقط.',
      'الشاشة الثانية (الموجة العكسية - الإطار اليومي): انتظر تراجع السعر نحو منطقة القيمة بين EMA-13 وEMA-26 بالتزامن مع هبوط مؤشر القوة (Elder Force Index لـ 2 يوم) تحت خط الصفر.',
      'فلتر الحجم والسعر (Anna Coulling VPA): تحقق من أن شموع التراجع الهابطة مصحوبة بأحجام تداول متناقصة (انعدام ضغط البيع المؤسسي) أو ظهور شمعة مطرقة ذات حجم تداول ضخم (Stopping Volume).',
      'الشاشة الثالثة (الزناد التنفيذي): ضع أمر شراء معلقاً (Buy Stop) أعلى قمة شمعة اليوم السابق بـ 1 سنت/نقطة؛ إذا لم يتفعل واستمر الهبوط، حرّك الأمر نزولاً مع قمة كل يوم جديد.',
    ],
    exitAndRiskRulesAr: [
      'قاعدة القرش (2% Rule): يمنع منعاً باتاً أن تتجاوز الخسارة المحتملة في أي صفقة واحدة 2% من صافي قيمة المحفظة شاملاً العمولات والانزلاق السعري.',
      'قاعدة أسماك البيرانا (6% Rule): إذا خسر حسابك 6% من قيمته بداية الشهر (أو كانت هناك صفقات مفتوحة مجموع مخاطرتها 6%)، يُغلق التداول فوراً حتى نهاية الشهر.',
      'هدف الربح: يُجنى نصف المركز عند سقف قناة الكلتنر/المغلف العلوي (Auto-Envelope)، ويُترك النصف الثاني بوقف متحرك أسفل EMA-13 اليومي.',
    ],
    mathematicalEdgeFormula: 'Force Index(2) = EMA₂[Volume × (Closeₜ − Closeₜ₋₁)] < 0 in Uptrend',
    mathematicalEdgeExplanationAr:
      'مؤشر القوة لإلدر يضرب تغير السعر في حجم التداول؛ عندما يهبط تحت الصفر أثناء اتجاه أسبوعي صاعد مع انحسار حجم الشموع الهابطة، فإنه يحدد اللحظة الدقيقة لنفاد البائعين الهواة.',
  },
  {
    id: 'graham-buffett-greenblatt-value',
    numberLabel: '03',
    titleAr: 'معادلة «الخندق الاقتصادي والصيغة السحرية وهامش الأمان»',
    subtitleAr: 'الدمج الكمي-النوعي بين هامش أمان جراهام، خندق بافيت وفيشر، والصيغة السحرية لجوئيل جرينبلات',
    schoolAr: 'استثمار القيمة المركّبة (Compound Value Investing)',
    timeHorizonAr: 'استثمار طويل الأجل (من سنتين إلى 10 سنوات)',
    winRateBenchmark: 68,
    rewardToRiskBenchmark: 3.2,
    recommendedRiskPct: 2.0,
    imagePath: '/src/assets/images/strategy_value_moat_1795613429056.jpg',
    corePhilosophyAr:
      'تطور استثمار القيمة في كتب مستودع kelvin200 عبر ثلاث مراحل: بنيامين جراهام اشترى «أعقاب السجائر» الرخيصة جداً، ثم علّم فيليب فيشر وتشارلي مونجر وارن بافيت شراء «شركات عظيمة بسعر عادل»، ثم جاء جوئيل جرينبلات ليصيغ ذلك في معادلة رقمية بسيطة (الصيغة السحرية). هذه الاستراتيجية تدمج المراحل الثلاث في نظام فلترة صارم.',
    whyItWorksAr:
      'الشركات التي تحقق عائداً مرتفعاً على رأس المال المستثمر (ROC > 25%) تعيد استثمار أرباحها داخلياً بمعدل فائدة مركبة استثنائي؛ وعند شرائها بعائد أرباح تشغيلي مرتفع (EBIT/EV > 10%) وهامش أمان 30%، فإنك تحصل على محركين للربح: نمو القيمة الجوهرية + توسع مكرر الربحية.',
    sourceBooks: [
      {
        titleEn: 'The Intelligent Investor (2003)',
        titleAr: 'المستثمر الذكي: كتاب المشورة العملية',
        author: 'Benjamin Graham & Jason Zweig',
      },
      {
        titleEn: 'The Little Book That Beats the Market (2006)',
        titleAr: 'الكتاب الصغير الذي يهزم السوق (الصيغة السحرية)',
        author: 'Joel Greenblatt',
      },
      {
        titleEn: 'Common Stocks and Uncommon Profits (2003)',
        titleAr: 'أسهم عادية وأرباح غير عادية',
        author: 'Philip A. Fisher',
      },
      {
        titleEn: 'The Essays of Warren Buffett (1998) & The Five Rules for Successful Stock Investing (2004)',
        titleAr: 'مقالات وارن بافيت والقواعد الخمس للاستثمار الناجح (مورنينغستار)',
        author: 'Warren Buffett & Pat Dorsey',
      },
    ],
    entryRulesAr: [
      'الفلتر الكمي الأول (جودة الشركة - Greenblatt ROC): يجب أن يكون العائد على رأس المال الملموس = EBIT ÷ (رأس المال العامل الصافي + الأصول الثابتة الصافية) أعلى من 25%.',
      'الفلتر الكمي الثاني (رخص السعر - Earnings Yield): يجب أن يكون عائد الأرباح التشغيلية = EBIT ÷ القيمة المؤسسية (EV) أعلى من 10% (أو ضعف عائد السندات الحكومية لعشر سنوات).',
      'الفلتر النوعي (خندق بافيت وأسئلة فيشر الـ 15): هل تمتلك الشركة قدرة تسعيرية (Pricing Power) تتيح لها رفع الأسعار فوق التضخم دون فقدان الحصة السوقية؟ وهل التدفق النقدي الحر FCF/Sales يتجاوز 5%؟',
      'شرط التنفيذ (هامش أمان جراهام): لا تشترِ إلا عندما يتداول السهم بخصم لا يقل عن 30% عن قيمته الجوهرية المحسوبة بالتدفقات النقدية المخصومة المتحفظة.',
    ],
    exitAndRiskRulesAr: [
      'بناء المحفظة (قاعدة جرينبلات): كوّن محفظة من 20 إلى 30 سهماً تجتاز الفلتر، أو من 8 إلى 12 سهماً إذا أجريت فحص الخندق النوعي العميق (مدرسة بافيت وفيشر).',
      'قاعدة البيع الضريبي والزمني: احتفظ بالسهم لمدة سنة كاملة على الأقل؛ أعد التوازن سنوياً باستبدال الشركات التي فقدت خندقها التنافسي أو تراجع عائد رأس مالها.',
      'بيع التقييم المفرط: اخرج من السهم فقط إذا تجاوز سعره السوقي 125% من قيمته الجوهرية المتفائلة أو حدث تدهور هيكلي دائم في نموذج العمل.',
    ],
    mathematicalEdgeFormula: 'ROC = EBIT / (NWC + Net Fixed Assets) ≥ 25% | Margin of Safety ≥ 30%',
    mathematicalEdgeExplanationAr:
      'استخدام EBIT بدلاً من صافي الربح، والقيمة المؤسسية (EV = القيمة السوقية + الديون − النقد) بدلاً من القيمة السوقية فقط، يمنع خداع المستثمر بالشركات المثقلة بالديون.',
  },
  {
    id: 'canslim-livermore-pivots',
    numberLabel: '04',
    titleAr: 'منظومة «CAN SLIM ونقطة المحور المتفجرة»',
    subtitleAr: 'دمج زخم نمو الأرباح الفصلي (William O’Neil) مع أنماط الكوب والعروة الموثقة إحصائياً (Bulkowski) ومكرر PEG (Peter Lynch)',
    schoolAr: 'زخم النمو المؤسسي والاختراقات القيادية',
    timeHorizonAr: 'متوسط الأجل (من 4 أسابيع إلى 12 شهراً)',
    winRateBenchmark: 48,
    rewardToRiskBenchmark: 3.1,
    recommendedRiskPct: 1.25,
    corePhilosophyAr:
      'درس ويليام أونيل كل سهم حقق تضاعفاً هائلاً في السوق الأمريكي منذ عام 1880 حتى اليوم، واكتشف أن الأسهم العظيمة لا تبدو «رخيصة» بمكرر الربحية التقليدي قبل انطلاقها، بل تتسم بتسارع أرباح فصلية (>25%)، وتجميع مؤسسي هادئ يظهر على الرسم البياني كقاعدة «كوب وعروة» أو «قاعدة مسطحة»، قبل أن تنفجر عند نقطة المحور (Pivotal Point) التي ابتكرها جيسي ليفرمور.',
    whyItWorksAr:
      'الصناديق الاستثمارية الكبرى لا تستطيع شراء مراكزها في يوم واحد؛ لذا تشكل قواعد تجميعية تمتد من 7 إلى 65 أسبوعاً. الدخول لحظة اختراق القمة بحجم تداول يتجاوز المتوسط بـ +50% يضعك في نفس اتجاه السيولة المؤسسية الضخمة مع وقف خسارة ضيق جداً.',
    sourceBooks: [
      {
        titleEn: 'How to Make Money in Stocks - 4th Edition (2009)',
        titleAr: 'كيف تربح المال في الأسهم: نظام رابح في الأوقات الجيدة والسيئة',
        author: 'William J. O’Neil',
      },
      {
        titleEn: 'One Up On Wall Street (2000)',
        titleAr: 'تفوق على وول ستريت',
        author: 'Peter Lynch',
      },
      {
        titleEn: 'Encyclopedia of Chart Patterns - 2nd Edition (2005)',
        titleAr: 'موسوعة الأنماط السعرية (الإحصاءات الميدانية للنماذج)',
        author: 'Thomas N. Bulkowski',
      },
      {
        titleEn: 'Jesse Livermore - World’s Greatest Stock Trader (2001)',
        titleAr: 'جيسي ليفرمور: أعظم متداول أسهم في العالم',
        author: 'Richard Smitten',
      },
    ],
    entryRulesAr: [
      'شرط الأرباح (C & A + Peter Lynch PEG): نمو ربحية السهم الفصلية الحالية (Current EPS) بنسبة لا تقل عن +25% على أساس سنوي، ونمو سنوي مستمر لـ 3 سنوات، مع نسبة PEG (مكرر الربحية ÷ معدل النمو) قريبة من 1.0.',
      'شرط القيادة (L & I): أن يكون خط القوة النسبية (Relative Strength) للسهم في أعلى 15% من السوق، مع دخول صناديق استثمارية ذات أداء متفوق في آخر ربعين.',
      'شرط النموذج السعري (Bulkowski Validation): تشكل قاعدة سعرية سليمة (Cup with Handle أو Double Bottom أو Flat Base) لا يتجاوز عمق تصحيحها 15%–33%، مع جفاف واضح في أحجام التداول داخل منطقة «العروة».',
      'نقطة الدخول (نقطة محور ليفرمور): الشراء فور اختراق قمة العروة بشرط أن يكون حجم تداول يوم الاختراق أعلى بنسبة +50% على الأقل من متوسط حجم 50 يوماً، وألا تطارد السهم إذا ابتعد أكثر من 5% فوق نقطة المحور.',
    ],
    exitAndRiskRulesAr: [
      'القانون الذهبي لأونيل (وقف الخسارة 7%–8%): مهما كانت قناعتك بالشركة، أغلق الصفقة فوراً ودون تردد إذا هبط السعر بنسبة 7% أو 8% تحت سعر شرائك عند نقطة المحور.',
      'قاعدة جني الأرباح القياسية: اجنِ الأرباح عند تحقيق +20% إلى +25%، باستثناء حالة واحدة: إذا حقق السهم +20% خلال أقل من 3 أسابيع من نقطة الاختراق، فيجب الاحتفاظ به لـ 8 أسابيع كاملة على الأقل (قاعدة الأسهم الصاروخية).',
      'حظر التداول عكس السوق العام (M - Market Direction): لا تفتح أي صفقة شراء جديدة إذا دخل المؤشر العام للسوق في مرحلة توزيع (Distribution Days متكررة).',
    ],
    mathematicalEdgeFormula: 'Max Loss = −7.5% | Standard Target = +22.5% → Minimum R:R = 3.0 : 1',
    mathematicalEdgeExplanationAr:
      'قطع الخسائر الصارم عند 7.5% مع استهداف 22.5% يمنحك نسبة عائد إلى مخاطرة 3:1؛ ما يعني أنك تحقق ربحاً صافياً حتى لو فشلت 65% من اختراقاتك.',
  },
  {
    id: 'naked-price-action-cot',
    numberLabel: '05',
    titleAr: 'استراتيجية «التداول المجرد وفخاخ السيولة وتقارير الـ COT»',
    subtitleAr: 'الجمع بين مراكز صناع السوق في تقرير التزامات المتداولين (COT) ونماذج الشموع المجردة بدون مؤشرات (Naked Forex)',
    schoolAr: 'السلوك السعري المجرد (Price Action) وتدفقات الأموال الذكية',
    timeHorizonAr: 'تداول يومي ومتأرجح على أطر 4 ساعات واليومي',
    winRateBenchmark: 58,
    rewardToRiskBenchmark: 2.5,
    recommendedRiskPct: 1.0,
    imagePath: '/src/assets/images/strategy_price_action_1795613431074.jpg',
    corePhilosophyAr:
      'جميع المؤشرات الفنية التقليدية مشتقة من السعر السابق وبالتالي فهي متأخرة زمنياً. في كتب *Naked Forex* لوالتر بيترز و*Japanese Candlestick Charting* لستيف نيسون و*Trading Price Action* لآل بروكس، يتعلم المتداول قراءة الرسم البياني العاري تماماً. وعندما نضيف إلى ذلك بيانات «تقرير التزامات المتداولين COT» لستيفن بريز، فإننا نكتشف متى يصل صغار المضاربين إلى ذروة الشراء بينما يقوم التجاريون (Commercial Hedgers) بالبيع المكثف.',
    whyItWorksAr:
      'عند مناطق الدعم والمقاومة التاريخية، تتجمع أوامر وقف الخسارة للمتداولين الأفراد. يصنع السوق «ذيل الكنغر» (Kangaroo Tail / Pin Bar) لضرب تلك الأوامر وامتصاص السيولة في الاتجاه الحقيقي للمؤسسات التجارية الكبرى (Commercials).',
    sourceBooks: [
      {
        titleEn: 'Naked Forex - High-Probability Techniques for Trading Without Indicators (2012)',
        titleAr: 'الفوركس المجرد: تقنيات عالية الاحتمال للتداول بدون مؤشرات',
        author: 'Alex Nekritin & Walter Peters',
      },
      {
        titleEn: 'The Commitments of Traders Bible (2008) & Sentiment in the Forex Market (2008)',
        titleAr: 'إنجيل التزامات المتداولين (COT) ومعنويات سوق العملات',
        author: 'Stephen Briese & Jamie Saettele',
      },
      {
        titleEn: 'Japanese Candlestick Charting Techniques (2001) & Beyond Candlesticks (1994)',
        titleAr: 'تقنيات رسم الشموع اليابانية وما وراء الشموع',
        author: 'Steve Nison',
      },
      {
        titleEn: 'Trading Price Action Trends (2011) & Understanding Price Action (2014)',
        titleAr: 'تداول اتجاهات السلوك السعري وفهم حركة السعر',
        author: 'Al Brooks & Bob Volman',
      },
    ],
    entryRulesAr: [
      'الخطوة 1 (فلتر الأموال الذكية - مؤشر COT): راقب مؤشر COT Index؛ عندما يصل الفرق بين مراكز التجاريين (Commercials) وكبار المضاربين (Large Specs) إلى تطرف تاريخي (>85% أو <15%)، استعد لانعكاس رئيسي.',
      'الخطوة 2 (تحديد مناطق السيولة): ارسم مناطق الدعم والمقاومة الأفقية الرئيسية على الإطار اليومي أو 4 ساعات (Zones وليست خطوطاً مفردة) حيث ارتد السعر مرتين سابقاً على الأقل.',
      'الخطوة 3 (نموذج ذيل الكنغر أو القبلة الأخيرة - Last Kiss): انتظر تشكل شمعة «ذيل الكنغر» (جسم الشمعة في الثلث السفلي/العلوي، والذيل أطول بـ 3 مرات من الجسم، ومحصور داخل نطاق الشمعة اليسرى «العين اليسرى» مع مساحة فارغة على اليسار لا تقل عن 10 شموع).',
      'الخطوة 4 (تفعيل الصفقة): ادخل بأمر معلق (Buy/Sell Stop) بعد كسر أنف شمعة الكنغر بـ 3 إلى 5 نقاط، وألغِ الأمر فوراً إذا لم يتفعل خلال الشمعة التالية.',
    ],
    exitAndRiskRulesAr: [
      'وقف الخسارة الهيكلي: يُوضع خلف ذيل الكنغر مباشرة؛ وإذا كان الذيل طويلاً بشكل مبالغ فيه (أكبر من 2.5 ضعف متوسط الشموع العشر السابقة)، تُرفض الصفقة.',
      'تأمين الصفقة (قاعدة والتر بيترز): لا تحرك وقف الخسارة إلى نقطة الدخول مبكراً؛ اترك الصفقة تتنفس حتى تصل إلى المنطقة الأفقية الأولى (First Trouble Area).',
      'التقسيم الذكي للخروج: أغلق 50% عند المنطقة الأفقية الأولى (بحد أدنى 1.5R)، واترك 50% بوقف متحرك خلف قاع/قمة كل منطقة تجميع جديدة.',
    ],
    mathematicalEdgeFormula: 'COT Index = 100 × (NetPos − Min₃yr) / (Max₃yr − Min₃yr) ∈ [0, 15] or [85, 100]',
    mathematicalEdgeExplanationAr:
      'التجاريون (Commercials) هم المنتجون والمصارف الذين يمتلكون المعلومات الحقيقية للعرض والطلب الفعلي؛ عندما يكون مؤشرهم عند 90%+ ويظهر ذيل كنغر على منطقة يومية، تتضاعف احتمالية نجاح الانعكاس.',
  },
  {
    id: 'quant-mean-reversion-kelly',
    numberLabel: '06',
    titleAr: 'استراتيجية «الارتداد الكمي للمتوسط وتكامل الأزواج»',
    subtitleAr: 'المراجحة الإحصائية والعودة للمتوسط (Ernie Chan) مع التحقق العلمي للإشارات (Aronson) ونصف معيار كيلي',
    schoolAr: 'التداول الخوارزمي الكمي والمراجحة الإحصائية',
    timeHorizonAr: 'قصير إلى متوسط الأجل (من يوم واحد إلى 10 أيام)',
    winRateBenchmark: 64,
    rewardToRiskBenchmark: 1.45,
    recommendedRiskPct: 1.0,
    corePhilosophyAr:
      'بينما تربح استراتيجيات اتباع الاتجاه من الذيل الإحصائي للتحركات الكبرى، يوضح الدكتور إيرني تشان في *Algorithmic Trading* وديفيد أرونسون في *Evidence-Based Technical Analysis* أن الأسواق تقضي أكثر من 70% من وقتها في حالة تذبذب وارتداد نحو المتوسط (Mean Reversion)، خصوصاً عند تداول «الأزواج المتكاملة إحصائياً» (Cointegrated Pairs) أو صناديق المؤشرات المترابطة.',
    whyItWorksAr:
      'قد ينحرف سهم فردي بلا عودة بسبب إفلاس أو تغير هيكلي، أما الفارق السعري (Spread) بين أصلين متكاملين اقتصادياً وإحصائياً (مثل الذهب وشركات تعدين الذهب، أو خام برنت وخام غرب تكساس، أو سهمين قياديين في نفس القطاع) فإنه يخضع لقوة جذب إحصائية تعيده نحو متوسطه التاريخي (Stationary Process).',
    sourceBooks: [
      {
        titleEn: 'Algorithmic Trading - Winning Strategies and Their Rationale (2013)',
        titleAr: 'التداول الخوارزمي: الاستراتيجيات الرابحة ومنطقها العلمي',
        author: 'Dr. Ernest P. Chan',
      },
      {
        titleEn: 'Evidence-Based Technical Analysis (2007)',
        titleAr: 'التحليل الفني القائم على الأدلة والمنهج العلمي',
        author: 'David Aronson',
      },
      {
        titleEn: 'Building Reliable Trading Systems (2013)',
        titleAr: 'بناء أنظمة تداول موثوقة تؤدي في الواقع كما في الاختبار التاريخي',
        author: 'Keith Fitschen',
      },
      {
        titleEn: 'When Genius Failed - The Rise and Fall of LTCM (2001)',
        titleAr: 'عندما فشلت العبقرية: صعود وسقوط صندوق LTCM',
        author: 'Roger Lowenstein',
      },
    ],
    entryRulesAr: [
      'الخطوة 1 (فحص التكامل المشترك - Cointegration): اختر زوجاً من الأصول في نفس القطاع وتأكد من اجتياز الفارق السعري لاختبار ADF (Augmented Dickey-Fuller) وأن عمر النصف للارتداد (Half-Life) يتراوح بين 3 و15 يوماً.',
      'الخطوة 2 (حساب الدرجة المعيارية Z-Score): احسب انحراف الفارق الحالي عن متوسطه المتحرك لـ 20 يوماً مقسوماً على الانحراف المعياري: Z = (Spread − SMA20) / StdDev20.',
      'الخطوة 3 (إشارة الدخول المزدوجة): عندما يتجاوز Z-Score مستوى +2.0، قم ببيع الأصل المرتفع وشراء الأصل المتأخر بنفس القيمة الدولارية الموزونة بمعامل التحوط (Hedge Ratio β).',
      'الخطوة 4 (بديل الأصل المفرد - Bollinger Band Mean Reversion): على مؤشرات الأسهم الكبرى (مثل S&P 500 ETFs)، اشترِ عندما يغلق السعر تحت حزام بولينجر السفلي (2.0σ) بشرط أن يكون السعر أعلى من متوسط 200 يوم العام.',
    ],
    exitAndRiskRulesAr: [
      'الخروج الطبيعي عند المتوسط: أغلق طرفي الصفقة فور عودة مؤشر Z-Score إلى خط الصفر (0.0) أو إلى +0.5/-0.5.',
      'درس انهيار صندوق LTCM (وقف الطوارئ): في كتاب *When Genius Failed*، أفلس عباقرة نوبل لأنهم افترضوا أن الانحراف لا يتجاوز 4σ واستخدموا رافعة مالية ضخمة؛ لذا يجب وضع وقف خسارة زمني وسعري صارم إذا وصل Z-Score إلى ±3.5.',
      'تحجيم الرافعة بنصف معيار كيلي (Half-Kelly): لا تستخدم أبداً معيار كيلي الكامل؛ استخدم نصف كيلي فقط لتقليص التراجع الأقصى (Drawdown) بـ 75% مع الاحتفاظ بـ 75% من معدل النمو المركب.',
    ],
    mathematicalEdgeFormula: 'Z-Score = (Spreadₜ − μ₂₀) / σ₂₀ | Entry: |Z| ≥ 2.0 → Exit: Z = 0',
    mathematicalEdgeExplanationAr:
      'تداول الفارق المحايد للسوق (Market-Neutral Spread) يعزل محفظتك عن انهيارات السوق الشاملة لأنك في حالة شراء وبيع متزامنين بنسب موزونة إحصائياً.',
  },
  {
    id: 'soros-taleb-reflexivity-barbell',
    numberLabel: '07',
    titleAr: 'استراتيجية «الانعكاسية الماكروية ومحفظة الجرس المحدبة»',
    subtitleAr: 'دمج نظرية الانعكاسية لجورج سوروس مع عدم التماثل المحدب لنسيم طالب وتسعير التقلب الضمني لناتنبرغ',
    schoolAr: 'الماكرو العالمي، التقلب، والرهانات غير المتماثلة',
    timeHorizonAr: 'تكتيكي مرتبط بالدورات الاقتصادية والأزمات',
    winRateBenchmark: 35,
    rewardToRiskBenchmark: 5.5,
    recommendedRiskPct: 0.75,
    corePhilosophyAr:
      'تفترض الاقتصادات الكلاسيكية أن الأسواق تتجه دائماً نحو التوازن وأن الأسعار تعكس الأساسيات فقط. لكن جورج سوروس أثبت في *The Alchemy of Finance* أن الأسعار نفسها تغيّر الأساسيات عبر حلقة تغذية راجعة سماها «الانعكاسية» (Reflexivity)، ما يصنع فقاعات وانهيارات ضخمة (كما وثق روبرت شيلر في *Irrational Exuberance* ومايكل لويس في *The Big Short*). استراتيجية «الجرس» (Barbell) لنسيم طالب تصمم محفظتك للاستفادة من هذه الانفجارات دون المخاطرة بالإفلاس.',
    whyItWorksAr:
      'بدلاً من وضع 100% من مالك في أصول «متوسطة المخاطر» قد تنهار معاً وقت الأزمة، تضع 85%–90% في أصول فائقة الأمان (سندات خزانة/نقد)، وتخصص 10%–15% لفرص ذات عائد غير متماثل (مخاطرة محدودة جداً وعائد يصل إلى 5R–10R عند انفجار الفقاعات أو تغير دورة التقلب الضمني).',
    sourceBooks: [
      {
        titleEn: 'The Alchemy of Finance - Reading the Mind of the Market (1994)',
        titleAr: 'خيمياء التمويل: قراءة عقل السوق ونظرية الانعكاسية',
        author: 'George Soros',
      },
      {
        titleEn: 'Fooled by Randomness (2005) & The Big Short (2011)',
        titleAr: 'مخدوعون بالعشوائية والبيع الكبير (داخل آلة يوم القيامة)',
        author: 'Nassim Nicholas Taleb & Michael Lewis',
      },
      {
        titleEn: 'Option Volatility & Pricing (1994)',
        titleAr: 'تقلب الخيارات وتسعيرها: استراتيجيات وتقنيات متقدمة',
        author: 'Sheldon Natenberg',
      },
      {
        titleEn: 'Irrational Exuberance (3rd Ed, 2016) & Extraordinary Popular Delusions (2001)',
        titleAr: 'الوفرة غير العقلانية والأوهام الشعبية الاستثنائية وجنون الجماهير',
        author: 'Robert J. Shiller & Charles Mackay',
      },
    ],
    entryRulesAr: [
      'الخطوة 1 (هيكل محفظة الجرس - Barbell Allocation): احتفظ بـ 85% من رأس المال في أصول سيادية سائلة أو استراتيجيات ذات تراجع شبه معدوم.',
      'الخطوة 2 (رصد حلقة الانعكاسية - Soros Boom/Bust Model): ابحث عن سوق يغذي فيه ارتفاع السعر نفسه ائتمانياً (مثل ارتفاع أسعار العقارات أو العملات أو أسهم التكنولوجيا الذي يزيد من قدرة المقترضين على الاقتراض والشراء أكثر).',
      'الخطوة 3 (فحص التقلب الضمني لناتنبرغ): راقب التقلب الضمني (Implied Volatility) مقارنة بالتقلب التاريخي (Historical Volatility)؛ عندما يكون السوق في حالة تراخٍ مفرط والـ IV في أدنى مستوياته السنوية، تصبح عقود الخيارات أو الفروقات السعرية (Spreads) رخيصة إحصائياً.',
      'الخطوة 4 (الدخول عند نقطة الانعطاف): ادخل فقط عندما يظهر أول صدع فني (فشل السعر في تسجيل قمة جديدة رغم أخبار إيجابية قصوى) باستخدام مركز محدود الخسارة مسبقاً.',
    ],
    exitAndRiskRulesAr: [
      'سقف الخسارة الصارم للرهان الواحد: لا يتجاوز 0.5% إلى 1% من إجمالي الثروة، بحيث يمكنك تحمل 5 محاولات مبكرة دون المساس بـ 85% من أصل المحفظة.',
      'جني الأرباح عند ذروة التقلب (Volatility Crush): عندما تنفجر الأزمة ويقفز التقلب الضمني (VIX/IV) إلى مستويات الذعر القصوى، أغلق عقود الخيارات طويلة الأجل لأن قيمتها الزمنية تتضخم لأقصى حد قبل أن تبدأ البنوك المركزية بالتدخل.',
    ],
    mathematicalEdgeFormula: 'Portfolio = 85% Risk-Free T-Bills + 15% Convex Asymmetric Trades (R:R ≥ 5:1)',
    mathematicalEdgeExplanationAr:
      'العائد المحدب (Convex Payoff) يعني أن خسارتك القصوى محددة سلفاً (1R) بينما ربحك يتسارع هندسياً كلما زادت حدة الحركة السوقية.',
  },
  {
    id: 'van-tharp-douglas-r-expectancy',
    numberLabel: '08',
    titleAr: 'بروتوكول «مضاعفات المخاطرة (R-Multiples) والاحتمال العقلي»',
    subtitleAr: 'دمج هندسة التوقع الرياضي وتحجيم المراكز (Van Tharp) مع الانضباط الاحتمالي لـ 20 صفقة (Mark Douglas & Market Wizards)',
    schoolAr: 'هندسة المخاطر وعلم نفس الأداء المؤسسي',
    timeHorizonAr: 'يطبق على جميع الأطر الزمنية والاستراتيجيات بلا استثناء',
    winRateBenchmark: 45,
    rewardToRiskBenchmark: 2.8,
    recommendedRiskPct: 1.0,
    corePhilosophyAr:
      'أهم خلاصة مشتركة بين مقابلات جاك شواغر في *Market Wizards*، وأبحاث فان ثارب في *Trade Your Way to Financial Freedom*، وكتاب مارك دوغلاس *Trading in the Zone* هي أن معظم المتداولين يقضون 90% من وقتهم في البحث عن «مؤشر سحري للدخول» بينما يثبت العلم أن 90% من التباين في عوائد المحافظ ينبع من عاملين فقط: تحديد حجم الصفقة (Position Sizing) والتفكير بلغة الاحتمالات عبر عينة من 20 صفقة متتالية.',
    whyItWorksAr:
      'عندما تقيس كل صفقة بوحدة المخاطرة الأولية (1R)، تتحرر عاطفياً من قيمة الدولارات؛ فلا تعود تخشى ضرب وقف الخسارة (-1R) لأنك تعلم رياضياً أن متوسط أرباحك (+2.8R إلى +4R) يضمن نمو المحفظة عبر عينة العشرين صفقة.',
    sourceBooks: [
      {
        titleEn: 'Trade Your Way to Financial Freedom - 2nd Edition (2006)',
        titleAr: 'تداول بطريقتك نحو الحرية المالية',
        author: 'Dr. Van K. Tharp',
      },
      {
        titleEn: 'Trading in the Zone (2000) & The Disciplined Trader (1990)',
        titleAr: 'التداول في المنطقة والمتداول المنضبط',
        author: 'Mark Douglas',
      },
      {
        titleEn: 'Market Wizards (2012), The New Market Wizards (1992) & Stock Market Wizards (2001)',
        titleAr: 'سحرة السوق، سحرة السوق الجدد، وسحرة سوق الأسهم',
        author: 'Jack D. Schwager',
      },
      {
        titleEn: 'Principles: Life and Work (2017)',
        titleAr: 'المبادئ: الحياة والعمل (شفافية القرار المنهجي)',
        author: 'Ray Dalio',
      },
    ],
    entryRulesAr: [
      'القاعدة 1 (تعريف 1R قبل الدخول): قبل ضغط زر التنفيذ، حدد السعر الدقيق الذي يثبت أن فكرتك خاطئة؛ المسافة بين سعر الدخول وهذا السعر هي (1R).',
      'القاعدة 2 (اختبار التوقع الرياضي الموجب): لا تتداول أي نظام ما لم يكن توقعه الرياضي E = (Win% × AvgWin_R) − (Loss% × AvgLoss_R) أكبر من +0.35R.',
      'القاعدة 3 (تمرين مارك دوغلاس لـ 20 صفقة): التزم بتنفيذ 20 صفقة متتالية مطابقة لشروط استراتيجيتك دون تعديل القواعد أو مضاعفة المخاطرة انتقاماً بعد صفقة خاسرة؛ لأن نتيجة الصفقة المفردة عشوائية بينما نتيجة الـ 20 صفقة حتمية إحصائياً.',
      'القاعدة 4 (مبادئ راي داليو - سجل الأخطاء): وثّق كل صفقة في دفتر التداول، وافصل بين «جودة القرار» (هل التزمت بالخطة؟) و«نتيجة الصفقة» (ربح أم خسارة).',
    ],
    exitAndRiskRulesAr: [
      'حظر توسيع وقف الخسارة: تحريك وقف الخسارة بعيداً أثناء سير الصفقة ضدك يحوّل خسارة مخططة (-1R) إلى كارثة (-4R) تدمر التوقع الرياضي لعشرين صفقة كاملة.',
      'التخفيض المتدرج أثناء التراجع (Anti-Martingale): إذا تراجع رصيد الحساب بنسبة 10% عن قمته، خفّض نسبة المخاطرة في الصفقة من 1.5% إلى 0.75% حتى يستعيد الحساب ثقته ومنحنى الصعود.',
    ],
    mathematicalEdgeFormula: 'Expectancy (R) = (P_win × AvgWin_R) − (P_loss × 1R) ≥ +0.40R',
    mathematicalEdgeExplanationAr:
      'تحويل جميع الأرباح والخسائر إلى مضاعفات المخاطرة (R-Multiples) يكشف فوراً ما إذا كنت تقطع أرباحك مبكراً وتترك خسائرك تتضخم.',
  },
];

export const KELVIN_REPOSITORY_BOOKS: RepositoryBook[] = [
  // 1. Psychology & Developing Style
  {
    id: 'trading-in-the-zone',
    titleEn: 'Trading in the Zone: Master the Market with Confidence, Discipline and a Winning Attitude',
    titleAr: 'التداول في المنطقة: إتقان السوق بثقة وانضباط وعقلية رابحة',
    author: 'Mark Douglas',
    year: 2000,
    categoryKey: 'psychology_style',
    categoryLabelAr: 'تطوير الأسلوب وعلم نفس التداول',
    levelAr: 'تطوير العقلية',
    repoFileName: 'Trading in the Zone - Master the Market with Confidence, Discipline and a Winning Attitude 2000.pdf',
    ratingNote: '4.5/5 (541 تقييم في Trading.txt)',
    summaryAr:
      'الكتاب الأهم في المكتبة حول سيكولوجية المتداول. يشرح مارك دوغلاس كيف أن التفكير بلغة الاحتمالات يزيل الخوف والتردد؛ فالمتداول المحترف لا يحاول التنبؤ بالصفقة القادمة، بل يتعامل مع السوق ككازينو يمتلك فيه ميزة إحصائية على مدى سلسلة من الصفقات.',
    goldenRuleAr:
      'القاعدة الذهبية: أي شيء يمكن أن يحدث في صفقة واحدة؛ لا تحتاج لمعرفة ما سيحدث تالياً كي تربح المال على مدى 20 صفقة.',
  },
  {
    id: 'the-disciplined-trader',
    titleEn: 'The Disciplined Trader: Developing Winning Attitudes',
    titleAr: 'المتداول المنضبط: تطوير المواقف الذهنية الرابحة',
    author: 'Mark Douglas',
    year: 1990,
    categoryKey: 'psychology_style',
    categoryLabelAr: 'تطوير الأسلوب وعلم نفس التداول',
    levelAr: 'تطوير العقلية',
    repoFileName: 'The Disciplined Trader - Developing Winning Attitudes 1990 - annotated.pdf',
    ratingNote: '4.4/5 (205 تقييم في Trading.txt — نسخة مشروحة)',
    summaryAr:
      'يحلل لماذا تفشل القواعد الذهنية التي نجحت معنا في الحياة الاجتماعية والأكاديمية عندما نطبقها في الأسواق المالية، وكيف نبني بيئة عقلية داخلية تقبل المخاطرة دون ألم نفسي.',
    goldenRuleAr:
      'القاعدة الذهبية: السوق لا يمنحك المال ولا يعاقبك؛ الألم ينشأ فقط من رفضك الداخلي لتقبل احتمالية الخسارة قبل الدخول.',
  },
  {
    id: 'principles-dalio',
    titleEn: 'Principles: Life and Work',
    titleAr: 'المبادئ: الحياة والعمل',
    author: 'Ray Dalio',
    year: 2017,
    categoryKey: 'psychology_style',
    categoryLabelAr: 'تطوير الأسلوب وعلم نفس التداول',
    levelAr: 'تطوير العقلية',
    repoFileName: 'Principles - Life and Work 2017.epub',
    ratingNote: '4.4/5 (604 تقييم في Trading.txt)',
    summaryAr:
      'مؤسس أكبر صندوق تحوط في العالم (Bridgewater) يشرح منهجية تحويل كل خطأ استثماري إلى «مبدأ مكتوب» ثم إلى «خوارزمية قرار»، مع تطبيق الشفافية الجذرية ووزن الآراء حسب الجدارة.',
    goldenRuleAr:
      'القاعدة الذهبية: الألم + التأمل والتحليل = التقدم؛ حوّل كل قرار تداول متكرر إلى قاعدة معيارية قابلة للاختبار.',
  },
  {
    id: 'market-wizards',
    titleEn: 'Market Wizards: Interviews With Top Traders',
    titleAr: 'سحرة السوق: حوارات مع نخبة المتداولين العالميين',
    author: 'Jack D. Schwager',
    year: 2012,
    categoryKey: 'psychology_style',
    categoryLabelAr: 'تطوير الأسلوب وعلم نفس التداول',
    levelAr: 'تطوير العقلية',
    repoFileName: 'Market Wizards - Interviews With Top Traders 2012.pdf',
    summaryAr:
      'مقابلات معمقة مع بول تيودور جونز، بروس كوفنر، إد سيكوتا، وريتشارد دينيس. يكشف الكتاب أن لكل ساحر أسلوباً مختلفاً تماماً، لكنهم يتفقون جميعاً بنسبة 100% على صرامة قطع الخسائر وتوافق الأسلوب مع شخصية المتداول.',
    goldenRuleAr:
      'القاعدة الذهبية (بول تيودور جونز): الدفاع أهم من الهجوم؛ فكر دائماً كم يمكنك أن تخسر قبل أن تفكر كم ستربح.',
  },
  {
    id: 'new-market-wizards',
    titleEn: 'The New Market Wizards: Conversations with America’s Top Traders',
    titleAr: 'سحرة السوق الجدد: حوارات مع كبار متداولي أمريكا',
    author: 'Jack D. Schwager',
    year: 1992,
    categoryKey: 'psychology_style',
    categoryLabelAr: 'تطوير الأسلوب وعلم نفس التداول',
    levelAr: 'متقدم',
    repoFileName: 'The New Market Wizards - Conversations with America\'s Top Traders 1992.pdf',
    summaryAr:
      'الجزء الثاني الشهير الذي يتضمن مقابلة ستانلي دراكنميلر وويليام إيكهارت، ويركز على عدم التماثل في تحجيم الصفقات عندما تتوافق العوامل الأساسية والفنية.',
    goldenRuleAr:
      'القاعدة الذهبية (دراكنميلر): بناء الثروة طويلة الأجل يتطلب الحفاظ على رأس المال، ثم التركيز القوي عندما تكون الاحتمالات في صفك بوضوح.',
  },
  {
    id: 'stock-market-wizards',
    titleEn: 'Stock Market Wizards: Interviews with America’s Top Stock Traders',
    titleAr: 'سحرة سوق الأسهم: مقابلات مع أفضل متداولي الأسهم',
    author: 'Jack D. Schwager',
    year: 2001,
    categoryKey: 'psychology_style',
    categoryLabelAr: 'تطوير الأسلوب وعلم نفس التداول',
    levelAr: 'متوسط',
    repoFileName: 'Stock Market Wizards - Interviews with America\'s Top Stock Traders 2001.pdf',
    summaryAr:
      'يركز حصرياً على متداولي الأسهم (بمن فيهم مارك مينيرفيني ودان زانجر) وكيف حققوا عوائد من ثلاثة أرقام خلال أسواق الصعود والهبوط عبر ضبط توقيت الاختراقات.',
    goldenRuleAr:
      'القاعدة الذهبية: لا تحتفظ أبداً بسهم خاسر على أمل أن يتحول إلى استثمار طويل الأجل.',
  },
  {
    id: 'reminiscences-stock-operator',
    titleEn: 'Reminiscences of a Stock Operator',
    titleAr: 'مذكرات مضارب في بورصة الأسهم (سيرة جيسي ليفرمور)',
    author: 'Edwin Lefèvre',
    year: 2008,
    categoryKey: 'psychology_style',
    categoryLabelAr: 'تطوير الأسلوب وعلم نفس التداول',
    levelAr: 'تطوير العقلية',
    repoFileName: 'Reminiscences of a Stock Operator 2008.pdf',
    summaryAr:
      'الكلاسيكية الخالدة التي يقرؤها كل متداول محترف. تلخص رحلة جيسي ليفرمور واكتشافه لنقاط المحور (Pivotal Points) وأن الأموال الكبيرة لا تُجنى من التذبذبات اليومية بل من الجلوس الصبور مع الاتجاه العام.',
    goldenRuleAr:
      'القاعدة الذهبية: لم يكن تفكيري هو الذي جلب لي الأموال الكبيرة، بل كان جلوسي وثباتي في المركز الرابح.',
  },
  {
    id: 'millionaire-traders',
    titleEn: 'Millionaire Traders: How Everyday People Are Beating Wall Street at Its Own Game',
    titleAr: 'المتداولون المليونيرات: كيف يهزم أشخاص عاديون وول ستريت',
    author: 'Kathy Lien & Boris Schlossberg',
    year: 2007,
    categoryKey: 'psychology_style',
    categoryLabelAr: 'تطوير الأسلوب وعلم نفس التداول',
    levelAr: 'متوسط',
    repoFileName: 'Millionaire Traders - How Everyday People Are Beating Wall Street at Its Own Game 2007.pdf',
    summaryAr:
      'مقابلات مع 12 متداولاً فردياً بنوا ثروات حقيقية من الصفر في الأسهم والعملات والعقود الآجلة، مع التركيز على روتينهم اليومي وإدارة الخسائر المتتالية.',
    goldenRuleAr:
      'القاعدة الذهبية: التخصص في زوج عملات واحد أو نمط سعري واحد وإتقانه أهم من متابعة 50 شاشة في وقت واحد.',
  },

  // 2. Technical Analysis, Price Action & Candlesticks
  {
    id: 'japanese-candlesticks-nison',
    titleEn: 'Japanese Candlestick Charting Techniques (2nd Edition)',
    titleAr: 'تقنيات رسم الشموع اليابانية: الدليل المعاصر لتقنيات الاستثمار الشرقية',
    author: 'Steve Nison',
    year: 2001,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'تأسيسي',
    repoFileName: 'Japanese Candlestick Charting Techniques 2nd edition 2001.pdf',
    ratingNote: '4.5/5 (236 تقييم في Trading.txt)',
    summaryAr:
      'المرجع المؤسس الذي أدخل الشموع اليابانية إلى العالم الغربي. يشرح نماذج الابتلاع، المطرقة، نجمة الصباح والمساء، وأهمية دمج الشموع مع مستويات الدعم والمقاومة الغربية.',
    goldenRuleAr:
      'القاعدة الذهبية: نموذج الشمعة اليابانية لا قيمة له إذا ظهر في منتصف نطاق سعري عشوائي؛ قوته الحقيقية تظهر فقط عند اختبار دعم أو مقاومة رئيسية.',
  },
  {
    id: 'beyond-candlesticks',
    titleEn: 'Beyond Candlesticks: New Japanese Charting Techniques Revealed',
    titleAr: 'ما وراء الشموع اليابانية: كشف تقنيات الرسم اليابانية المتقدمة',
    author: 'Steve Nison',
    year: 1994,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'تأسيسي',
    repoFileName: 'Beyond Candlesticks - New Japanese Charting Techniques Revealed 1994 (1) - annotated.pdf',
    ratingNote: '4.2/5 (نسخة مشروحة في المستودع)',
    summaryAr:
      'يكشف مخططات رينكو (Renko)، كاجي (Kagi)، وكسر الخطوط الثلاثة (Three-Line Break) التي تعزل الضجيج الزمني وتركز على الحركة السعرية الصافية.',
    goldenRuleAr:
      'القاعدة الذهبية: مخططات رينكو وكسر الخطوط الثلاثة تفلتر التذبذب العرضي وتبقيك داخل الاتجاه طالما لم يتحقق انعكاس بحجم صندوق كامل.',
  },
  {
    id: 'volume-price-analysis-coulling',
    titleEn: 'A Complete Guide To Volume Price Analysis',
    titleAr: 'الدليل الكامل لتحليل الحجم والسعر (VPA)',
    author: 'Anna Coulling',
    year: 2013,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'متوسط',
    repoFileName: 'A Complete Guide To Volume Price Analysis 2013.pdf',
    summaryAr:
      'يبني على منهج ريتشارد وايكوف وجيسي ليفرمور في قراءة العلاقة بين مدى الشمعة وحجم التداول: متى يتطابق الجهد مع النتيجة (حركة حقيقية) ومتى يتناقض الجهد مع النتيجة (فخ صناع السوق).',
    goldenRuleAr:
      'القاعدة الذهبية: شمعة صغيرة المدى بحجم تداول عملاق بعد اتجاه طويل تعني أن صناع السوق يمتصون العقود تمهيداً لانعكاس وشيك.',
  },
  {
    id: 'naked-forex-peters',
    titleEn: 'Naked Forex: High-Probability Techniques for Trading Without Indicators',
    titleAr: 'الفوركس المجرد: تقنيات عالية الاحتمال للتداول بدون مؤشرات',
    author: 'Alex Nekritin & Walter Peters',
    year: 2012,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'متوسط',
    repoFileName: 'Naked Forex - High-Probability Techniques for Trading Without Indicators 2012.pdf',
    ratingNote: '4.2/5 (95 تقييم في Trading.txt)',
    summaryAr:
      'يقدم 6 نماذج سلوك سعري محددة القواعد رياضياً بدون أي مؤشر فني: ذيل الكنغر (Kangaroo Tail)، الظل الكبير (Big Shadow)، الحزام الكبير، القبلة الأخيرة (Last Kiss)، والترند العصري.',
    goldenRuleAr:
      'القاعدة الذهبية: ارسم مناطق الدعم والمقاومة كحزم تمر بأقصى عدد من القمم والقيعان، وانتظر حافزاً سعرياً (Catalyst) واضحاً قبل الدخول.',
  },
  {
    id: 'trading-price-action-trends-brooks',
    titleEn: 'Trading Price Action Trends: Technical Analysis of Price Charts Bar by Bar',
    titleAr: 'تداول اتجاهات السلوك السعري: تحليل الرسوم البيانية شمعة بشمعة',
    author: 'Al Brooks',
    year: 2011,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'متقدم',
    repoFileName: 'Trading Price Action Trends - Technical Analysis of Price Charts Bar by Bar for the Serious Trader 2011.pdf',
    summaryAr:
      'دراسة مجهرية معمقة لكل شمعة على الرسم البياني، وكيفية التمييز بين الاتجاه القوي (Spike and Channel)، واختبار القمم والقيعان باحتساب العد التنازلي للمحاولات (Two-Legged Pullbacks H2/L2).',
    goldenRuleAr:
      'القاعدة الذهبية: في الاتجاه الصاعد القوي، أفضل فرصة شراء هي التراجع ذو الموجتين (High-2 Pullback) نحو المتوسط المتحرك لـ 20 شمعة.',
  },
  {
    id: 'understanding-price-action-volman',
    titleEn: 'Understanding Price Action: Practical Analysis of the 5-Minute Time Frame',
    titleAr: 'فهم السلوك السعري: تحليل عملي لإطار الـ 5 دقائق',
    author: 'Bob Volman',
    year: 2014,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'متقدم',
    repoFileName: 'Understanding Price Action - Practical Analysis of the 5-Minute Time Frame 2014.pdf',
    summaryAr:
      'يركز على التراكم السعري الضيق (Build-up) قبل اختراق خطوط الاتجاه الأفقية والمائلة، وكيف يمنحك التراكم الضيق وقف خسارة صغيراً جداً مع احتمالية انفجار فوري.',
    goldenRuleAr:
      'القاعدة الذهبية: لا تتداول أي اختراق لم يسبقه ضغط وتراكم سعري واضح (Pre-breakout Tension) مباشرة تحت خط الحاجز.',
  },
  {
    id: 'art-and-science-technical-analysis-grimes',
    titleEn: 'The Art and Science of Technical Analysis: Market Structure, Price Action, and Trading Strategies',
    titleAr: 'فن وعلم التحليل الفني: هيكل السوق، السلوك السعري، واستراتيجيات التداول',
    author: 'Adam Grimes',
    year: 2012,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'تأسيسي',
    repoFileName: 'The Art and Science of Technical Analysis - Market Structure, Price Action, and Trading Strategies 2012.pdf',
    ratingNote: '4.6/5 (79 تقييم في Trading.txt)',
    summaryAr:
      'يفند الخرافات الفنية إحصائياً (مثل نسب فيبوناتشي العشوائية) ويثبت أن الميزة الحقيقية في التحليل الفني تكمن في 4 أنماط رئيسية فقط: التراجع (Pullback)، الاختراق (Breakout)، فشل الاختراق (Failure Test)، واستمرار الزخم.',
    goldenRuleAr:
      'القاعدة الذهبية: ابحث عن نموذج "اختبار الفشل" (Spring / Upthrust لـ Wyckoff) حيث يخترق السعر قمة أو قاعاً سابقاً ثم يرتد فوراً داخله؛ إنه يوفر أعلى نسبة عائد للمخاطرة.',
  },
  {
    id: 'technical-analysis-financial-markets-murphy',
    titleEn: 'Technical Analysis of the Financial Markets',
    titleAr: 'التحليل الفني للأسواق المالية: الدليل الشامل لطرق التداول وتطبيقاتها',
    author: 'John J. Murphy',
    year: 1999,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'تأسيسي',
    repoFileName: 'Technical Analysis of the Financial Markets - A Comprehensive Guide to Trading Methods and Applications 1999.pdf',
    ratingNote: '4.6/5 (227 تقييم في Trading.txt)',
    summaryAr:
      'الكتاب المرجعي الرسمي لجمعية المحللين الفنيين؛ يغطي نظرية داو، الأنماط الكلاسيكية، المتوسطات المتحركة، المذبذبات، والتحليل التداخلي بين الأسواق (Intermarket Analysis).',
    goldenRuleAr:
      'القاعدة الذهبية: راقب العلاقة التداخلية بين السندات، الأسهم، السلع، والدولار؛ فحركة عوائد السندات تسبق عادة تحولات أسواق الأسهم.',
  },
  {
    id: 'handbook-technical-analysis-lim',
    titleEn: 'The Handbook of Technical Analysis: The Practitioner’s Comprehensive Guide',
    titleAr: 'دليل الممارس الشامل للتحليل الفني',
    author: 'Mark Andrew Lim',
    year: 2016,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'تأسيسي',
    repoFileName: 'The Handbook of Technical Analysis - The Practitioner\'s Comprehensive Guide to Technical Analysis 2016.pdf',
    ratingNote: '5.0/5 (في قائمة Trading.txt)',
    summaryAr:
      'أشمل موسوعة أكاديمية وعملية في المستودع (أكثر من 900 صفحة) تغطي الفلاتر السعرية والزمنية، التباعدات (Divergences)، دورات السوق، وإعداد أوامر الدخول والخروج.',
    goldenRuleAr:
      'القاعدة الذهبية: استخدم فلتر التأكيد المزدوج (نسبة مئوية + إغلاق شمعتين) لتجنب الاختراقات الكاذبة عند المستويات الحرجة.',
  },
  {
    id: 'encyclopedia-chart-patterns-bulkowski',
    titleEn: 'Encyclopedia of Chart Patterns (2nd Edition)',
    titleAr: 'موسوعة الأنماط السعرية (الإحصاءات الميدانية)',
    author: 'Thomas N. Bulkowski',
    year: 2005,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'تأسيسي',
    repoFileName: 'Encyclopedia of Chart Patterns 2nd edition 2005.pdf',
    ratingNote: '4.3/5 (90 تقييم في Trading.txt)',
    summaryAr:
      'بدلاً من الآراء النظرية، اختبر بولكوفسكي أكثر من 38,000 نموذج سعري على مدى عقود ليحدد نسبة فشل كل نموذج ومتوسط الصعود بعد الاختراق وأثر التراجع (Throwback/Pullback).',
    goldenRuleAr:
      'القاعدة الذهبية: نماذج الراية الضيقة العالية (High-Tight Flag) والرأس والكتفين المقلوب تسجل أقل نسب فشل إحصائياً عندما يصاحب الاختراق قفزة في الحجم.',
  },
  {
    id: 'trading-ichimoku-clouds',
    titleEn: 'Trading with Ichimoku Clouds: The Essential Guide to Ichimoku Kinko Hyo',
    titleAr: 'التداول بسحب الإيشيموكو: الدليل الأساسي للتوازن السعري والزمني',
    author: 'Manesh Patel',
    year: 2010,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'متوسط',
    repoFileName: 'Trading with Ichimoku Clouds - The Essential Guide to Ichimoku Kinko Hyo Technical Analysis 2010.pdf',
    summaryAr:
      'يشرح نظام غويتشي هوسودا المتكامل (خطوط التنكان، الكيجون، الشيكو سبان، وسحابة الكومو المستقبلية) وكيف يجمع الدعم والمقاومة والزخم في نظرة واحدة.',
    goldenRuleAr:
      'القاعدة الذهبية: لا تدخل صفقة شراء عند خروج السعر من سحابة الإيشيموكو ما لم يكن الخط المتأخر (Chikou Span) حراً تماماً وفوق السعر قبل 26 فترة.',
  },
  {
    id: 'harmonic-trading-carney',
    titleEn: 'Harmonic Trading, Volume One & Two: Profiting from the Natural Order of the Financial Markets',
    titleAr: 'التداول التوافقي (الجزء الأول والثاني): الربح من النسب الهندسية في الأسواق',
    author: 'Scott M. Carney',
    year: 2010,
    categoryKey: 'technical_price_action',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'متقدم',
    repoFileName: 'Harmonic Trading, Volume One - Profiting from the Natural Order of the Financial Markets 2010.pdf',
    summaryAr:
      'يحدد مناطق الانعكاس المحتملة (PRZ) عبر نماذج الخفاش (Bat)، الجارتلي (Gartley)، الفراشة (Butterfly)، والسلطعون (Crab) باستخدام نسب فيبوناتشي الدقيقة.',
    goldenRuleAr:
      'القاعدة الذهبية: منطقة الانعكاس المحتملة (PRZ) ليست أمر دخول أعمى؛ انتظر استقرار السعر داخلها وظهور شمعة رفض واضحة قبل التنفيذ.',
  },

  // 3. Trend Following, Momentum & Swing Trading
  {
    id: 'dual-momentum-antonacci',
    titleEn: 'Dual Momentum Investing: An Innovative Strategy for Higher Returns with Lower Risk',
    titleAr: 'الاستثمار بالزخم المزدوج: استراتيجية مبتكرة لعوائد أعلى بمخاطر أقل',
    author: 'Gary Antonacci',
    year: 2015,
    categoryKey: 'trend_momentum',
    categoryLabelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح',
    levelAr: 'متوسط',
    repoFileName: 'Dual Momentum Investing - An Innovative Strategy for Higher Returns with Lower Risk 2015.epub',
    ratingNote: '4.7/5 (340 تقييم — الأعلى تقييماً في المستودع)',
    summaryAr:
      'يقدم نموذج GEM (Global Equity Momentum) الذي يفحص مرة واحدة شهرياً ما إذا كانت الأسهم الأمريكية تتفوق على الدولية (زخم نسبي) وما إذا كان الفائز يتفوق على أذون الخزانة (زخم مطلق).',
    goldenRuleAr:
      'القاعدة الذهبية: الزخم النسبي يختار لك الحصان الأسرع، بينما الزخم المطلق يخرجك من مضمار السباق بالكامل عندما تبدأ العاصفة الهبوطية.',
  },
  {
    id: 'way-of-the-turtle-faith',
    titleEn: 'Way of the Turtle: The Secret Methods that Turned Ordinary People into Legendary Traders',
    titleAr: 'طريقة السلحفاة: الأساليب السرية التي حولت أشخاصاً عاديين إلى متداولين أسطوريين',
    author: 'Curtis Faith',
    year: 2007,
    categoryKey: 'trend_momentum',
    categoryLabelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح',
    levelAr: 'متوسط',
    repoFileName: 'Way of the Turtle - The Secret Methods that Turned Ordinary People into Legendary Traders 2007.pdf',
    summaryAr:
      'يروي أنجح السلاحف في تجربة ريتشارد دينيس وويليام إيكهارت القواعد الكاملة غير المنقوصة لنظام السلاحف، ويكشف لماذا فشل بعض المتداولين رغم امتلاكهم لنفس القواعد بسبب التردد في تنفيذ الاختراقات.',
    goldenRuleAr:
      'القاعدة الذهبية: لا تفوت أي إشارة اختراق لأن معظم أرباح العام بأكمله تأتي من صفقتين أو ثلاث صفقات اتجاهية كبرى فقط.',
  },
  {
    id: 'complete-turtle-trader-covel',
    titleEn: 'The Complete TurtleTrader & Trend Following',
    titleAr: 'المتداول السلحفاة الكامل وفلسفة اتباع الاتجاه',
    author: 'Michael W. Covel',
    year: 2009,
    categoryKey: 'trend_momentum',
    categoryLabelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح',
    levelAr: 'متوسط',
    repoFileName: 'Trend Following - Learn to Make Millions in Up or Down Markets 2009.pdf',
    summaryAr:
      'يوثق أداء صناديق اتباع الاتجاه (مثل باركر، دن، وهايت) وكيف حققت أرباحاً هائلة أثناء أزمة 2008 لأنها لا تتنبأ بالسوق بل تتبع السعر أينما ذهب بيعاً وشراءً.',
    goldenRuleAr:
      'القاعدة الذهبية: تخلَّ عن رغبتك في أن تكون على صواب أو أن تشتري من القاع؛ اشترِ القوة وبع الضعف.',
  },
  {
    id: 'new-trading-for-a-living-elder',
    titleEn: 'The New Trading for a Living: Psychology, Discipline, Trading Tools and Systems, Risk Control',
    titleAr: 'التداول الجديد من أجل المعيشة: علم النفس، الانضباط، الأدوات، وضبط المخاطر',
    author: 'Dr. Alexander Elder',
    year: 2014,
    categoryKey: 'trend_momentum',
    categoryLabelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح',
    levelAr: 'متوسط',
    repoFileName: 'The New Trading for a Living - Psychology, Discipline, Trading Tools and Systems, Risk Control, Trade Management 2014.pdf',
    ratingNote: '4.4/5 (99 تقييم في Trading.txt)',
    summaryAr:
      'تحديث شامل لكلاسيكية 1993 يجمع أركان التداول الثلاثة (3 M’s: Mind, Method, Money): نظام الشاشة الثلاثية، نظام الاندفاع (Impulse System)، وقاعدتي 2% و6% لإدارة رأس المال.',
    goldenRuleAr:
      'القاعدة الذهبية: في نظام الاندفاع (Impulse)، عندما يتحول EMA-13 ومدرج MACD إلى اللون الأخضر يُحظر البيع، وعندما يتحولان للأحمر يُحظر الشراء.',
  },
  {
    id: 'how-to-day-trade-aziz',
    titleEn: 'How to Day Trade for a Living: Tools, Tactics, Money Management, Discipline',
    titleAr: 'كيف تتداول يومياً من أجل المعيشة: الأدوات والتكتيكات وإدارة المال',
    author: 'Andrew Aziz',
    year: 2015,
    categoryKey: 'trend_momentum',
    categoryLabelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح',
    levelAr: 'متوسط',
    repoFileName: 'How to Day Trade for a Living - Tools, Tactics, Money Management, Discipline and Trading Psychology 3rd edition.epub',
    ratingNote: '4.7/5 (880 تقييم — الأكثر شعبية في Trading.txt)',
    summaryAr:
      'دليل عملي مركز للتداول اليومي على الأسهم النشطة (Stocks in Play) باستخدام استراتيجيات VWAP، اختراق نطاق الافتتاح (ORB)، ونموذج ABCD.',
    goldenRuleAr:
      'القاعدة الذهبية: تداول فقط الأسهم التي تمتلك محفزاً إخبارياً وحجم تداول نسبي (Relative Volume) أعلى من 2.0، واستخدم خط VWAP كمرجع اتجاه مؤسسي.',
  },
  {
    id: 'mastering-the-trade-carter',
    titleEn: 'Mastering the Trade: Proven Techniques for Profiting from Intraday and Swing Trading Setups',
    titleAr: 'إتقان التداول: تقنيات مجربة للربح من إعدادات التداول اليومي والمتأرجح',
    author: 'John F. Carter',
    year: 2012,
    categoryKey: 'trend_momentum',
    categoryLabelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح',
    levelAr: 'متوسط',
    repoFileName: 'Mastering the Trade - Proven Techniques for Profiting from Intraday and Swing Trading Setups 2nd edition 2012 (1) - annotated.pdf',
    ratingNote: '4.3/5 (327 تقييم — نسخة مشروحة في المستودع)',
    summaryAr:
      'يقدم استراتيجية TTM Squeeze الشهيرة (دخول أحزمة بولينجر داخل قنوات كلتنر أثناء هدوء السوق قبل الانفجار السعري) وإعدادات فجوات الافتتاح ومؤشر TICK.',
    goldenRuleAr:
      'القاعدة الذهبية: عندما تضيق أحزمة بولينجر حتى تدخل بالكامل داخل قنوات كلتنر، فإن السوق يشحن طاقته لانفجار اتجاهي وشيك.',
  },
  {
    id: 'master-swing-trader-farley',
    titleEn: 'The Master Swing Trader & The Master Swing Trader Toolkit',
    titleAr: 'متداول السوينغ المحترف وحقيبة أدوات النجاة في السوق',
    author: 'Alan S. Farley',
    year: 2010,
    categoryKey: 'trend_momentum',
    categoryLabelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح',
    levelAr: 'متقدم',
    repoFileName: 'The Master Swing Trader Toolkit - The Market Survival Guide 2010.pdf',
    summaryAr:
      'يشرح دورة النمط السعري (Pattern Cycles) ومفهوم التقارب المتعدد (Cross-Verification) حيث تلتقي المتوسطات المتحركة مع خطوط الاتجاه والفجوات السعرية في نقطة واحدة.',
    goldenRuleAr:
      'القاعدة الذهبية: ابحث عن تقاطع 3 مستويات فنية مستقلة في سعر واحد (مثلاً: تصحيح 61.8% + قمة سابقة مكسورة + متوسط 50 يوماً) للحصول على ارتداد عالي الدقة.',
  },
  {
    id: 'long-term-secrets-short-term-williams',
    titleEn: 'Long-Term Secrets to Short-Term Trading',
    titleAr: 'أسرار المدى الطويل للتداول قصير الأجل',
    author: 'Larry Williams',
    year: 1999,
    categoryKey: 'trend_momentum',
    categoryLabelAr: 'اتباع الاتجاه والزخم والتداول المتأرجح',
    levelAr: 'متقدم',
    repoFileName: 'Long-Term Secrets to Short-Term Trading 1999.pdf',
    summaryAr:
      'لاري ويليامز (الذي حول 10,000 دولار إلى 1.1 مليون دولار في بطولة روبنز الموثقة) يشرح اختراقات التقلب (Volatility Breakouts)، أنماط أيام الأسبوع، ونموذج Oops! الارتدادي.',
    goldenRuleAr:
      'القاعدة الذهبية: السوق ينتقل بانتظام من أيام ذات مدى سعري ضيق جداً إلى أيام ذات مدى سعري واسع؛ اشترِ اختراق النطاق بعد أيام الانكماش الضيق.',
  },

  // 4. Value Investing, Fundamentals & Stock Selection
  {
    id: 'intelligent-investor-graham',
    titleEn: 'The Intelligent Investor: A Book of Practical Counsel',
    titleAr: 'المستثمر الذكي: كتاب المشورة العملية',
    author: 'Benjamin Graham',
    year: 2003,
    categoryKey: 'value_fundamentals',
    categoryLabelAr: 'استثمار القيمة وبناء الثروة والأسهم',
    levelAr: 'تأسيسي',
    repoFileName: 'The Intelligent Investor - A Book of Practical Counsel 2003.pdf',
    summaryAr:
      'الكتاب الذي وصفه وارن بافيت بأنه أفضل كتاب عن الاستثمار كُتب على الإطلاق. يقدم الفصل الثامن (السيد سوق Mr. Market) والفصل العشرين (هامش الأمان Margin of Safety).',
    goldenRuleAr:
      'القاعدة الذهبية: السيد سوق موجود لخدمتك لا لإرشادك؛ اشترِ منه فقط عندما يعرض عليك حصة في شركة حقيقية بخصم لا يقل عن 30% من قيمتها الجوهرية.',
  },
  {
    id: 'little-book-beats-market-greenblatt',
    titleEn: 'The Little Book That Beats the Market',
    titleAr: 'الكتاب الصغير الذي يهزم السوق (الصيغة السحرية)',
    author: 'Joel Greenblatt',
    year: 2006,
    categoryKey: 'value_fundamentals',
    categoryLabelAr: 'استثمار القيمة وبناء الثروة والأسهم',
    levelAr: 'تأسيسي',
    repoFileName: 'The Little Book That Beats the Market 2006.pdf',
    summaryAr:
      'يثبت كيف أن ترتيب الشركات حسب معيارين فقط (العائد على رأس المال ROC + عائد الأرباح التشغيلية EBIT/EV) وشراء أعلى 20–30 شركة سنوياً يتفوق على مؤشر السوق بفارق كبير.',
    goldenRuleAr:
      'القاعدة الذهبية: شراء شركات جيدة (ROC مرتفع) بأسعار رخيصة (EBIT/EV مرتفع) بشكل منهجي يتغلب على العواطف البشرية.',
  },
  {
    id: 'common-stocks-uncommon-profits-fisher',
    titleEn: 'Common Stocks and Uncommon Profits and Other Writings',
    titleAr: 'أسهم عادية وأرباح غير عادية',
    author: 'Philip A. Fisher',
    year: 2003,
    categoryKey: 'value_fundamentals',
    categoryLabelAr: 'استثمار القيمة وبناء الثروة والأسهم',
    levelAr: 'متوسط',
    repoFileName: 'Common Stocks and Uncommon Profits and Other Writings 2nd edition 2003.pdf',
    summaryAr:
      'يقدم منهجية البحث الميداني (Scuttlebutt) والنقاط الخمس عشرة لتقييم الشركات ذات النمو طويل الأجل، وسؤال العملاء والمنافسين والموردين عن جودة إدارة الشركة.',
    goldenRuleAr:
      'القاعدة الذهبية: إذا قمت بعملك البحثي بدقة عند شراء شركة نمو استثنائية، فإن أفضل وقت لبيعها هو "أبداً تقريباً".',
  },
  {
    id: 'how-to-make-money-in-stocks-oneil',
    titleEn: 'How to Make Money in Stocks: A Winning System in Good Times and Bad (4th Ed)',
    titleAr: 'كيف تربح المال في الأسهم: نظام CAN SLIM الرابح',
    author: 'William J. O’Neil',
    year: 2009,
    categoryKey: 'value_fundamentals',
    categoryLabelAr: 'استثمار القيمة وبناء الثروة والأسهم',
    levelAr: 'متوسط',
    repoFileName: 'How to Make Money in Stocks - A Winning System in Good Times and Bad 4th edition 2009.pdf',
    summaryAr:
      'يجمع بين التحليل الأساسي لنمو الأرباح والتحليل الفني لقواعد التجميع في منظومة CAN SLIM السباعية مع تحليل 100 رسم بياني لأكبر الأسهم الرابحة في التاريخ.',
    goldenRuleAr:
      'القاعدة الذهبية: اقطع كل خسارة عند 7%–8% من سعر الشراء بلا استثناء، ولا تقم أبداً بالتعديل السعري الهابط (Averaging Down) في سهم خاسر.',
  },
  {
    id: 'one-up-on-wall-street-lynch',
    titleEn: 'One Up On Wall Street',
    titleAr: 'تفوق على وول ستريت',
    author: 'Peter Lynch',
    year: 2000,
    categoryKey: 'value_fundamentals',
    categoryLabelAr: 'استثمار القيمة وبناء الثروة والأسهم',
    levelAr: 'تأسيسي',
    repoFileName: 'One Up On Wall Street 2000.epub',
    summaryAr:
      'مدير صندوق ماجلان الأسطوري يصنف الأسهم إلى 6 فئات (البطيئة، القوية، سريعة النمو، الدورية، المتعافية، وأصول القيمة الخفية) ويشرح كيف يكتشف المستثمر الفرد شركات الـ Tenbaggers قبل المحللين.',
    goldenRuleAr:
      'القاعدة الذهبية: اعرف ما تملكه ولماذا تملكه؛ وابحث عن الشركات سريعة النمو التي يتداول سهمها بنسبة PEG أقل من 1.0.',
  },
  {
    id: 'essays-of-warren-buffett',
    titleEn: 'The Essays of Warren Buffett: Lessons for Corporate America & University of Berkshire Hathaway',
    titleAr: 'مقالات وارن بافيت وجامعة بيركشاير هاثاواي (دروس 30 عاماً)',
    author: 'Warren Buffett, Lawrence Cunningham & Daniel Pecaut',
    year: 2017,
    categoryKey: 'value_fundamentals',
    categoryLabelAr: 'استثمار القيمة وبناء الثروة والأسهم',
    levelAr: 'متوسط',
    repoFileName: 'The Essays of Warren Buffett - Lessons for Corporate America 1998.pdf',
    summaryAr:
      'تجميع موضوعي لرسائل بافيت للمساهمين مع تدوين 30 عاماً من اجتماعات بيركشاير السنوية حول الخندق التنافسي، تخصيص رأس المال، وحساب أرباح المالك (Owner Earnings).',
    goldenRuleAr:
      'القاعدة الذهبية: الوقت هو صديق الشركة الرائعة وعدو الشركة المتواضعة؛ ابقَ داخل دائرة كفاءتك.',
  },
  {
    id: 'little-book-common-sense-bogle',
    titleEn: 'The Little Book of Common Sense Investing & A Random Walk Down Wall Street',
    titleAr: 'الكتاب الصغير للاستثمار الفطري السليم وجولة عشوائية في وول ستريت',
    author: 'John C. Bogle & Burton G. Malkiel',
    year: 2015,
    categoryKey: 'value_fundamentals',
    categoryLabelAr: 'استثمار القيمة وبناء الثروة والأسهم',
    levelAr: 'تأسيسي',
    repoFileName: 'The Little Book of Common Sense Investing - The Only Way to Guarantee Your Fair Share of Stock Market Returns 2007.pdf',
    ratingNote: '4.6/5 (807 تقييم في Trading.txt)',
    summaryAr:
      'الحجة العلمية والمالية للاستثمار السلبي عبر صناديق المؤشرات منخفضة التكلفة (Low-Cost Index Funds) وكيف تلتهم رسوم الإدارة المركبة 60% من ثروة المستثمر على مدى 30 عاماً.',
    goldenRuleAr:
      'القاعدة الذهبية: لا تبحث عن الإبرة في كومة القش؛ اشترِ كومة القش بأكملها بأقل عمولة إدارية ممكنة ودع الفائدة المركبة تعمل.',
  },
  {
    id: 'five-rules-morningstar-dorsey',
    titleEn: 'The Five Rules for Successful Stock Investing: Morningstar’s Guide',
    titleAr: 'القواعد الخمس للاستثمار الناجح في الأسهم (دليل مورنينغستار)',
    author: 'Pat Dorsey',
    year: 2004,
    categoryKey: 'value_fundamentals',
    categoryLabelAr: 'استثمار القيمة وبناء الثروة والأسهم',
    levelAr: 'تأسيسي',
    repoFileName: 'The Five Rules for Successful Stock Investing - Morningstar\'s Guide to Building Wealth and Winning in the Market 2004.pdf',
    summaryAr:
      'دليل عملي لتحليل القوائم المالية وتحديد المصادر الأربعة للخندق الاقتصادي: الأصول غير الملموسة، تكلفة التحول للعميل، أثر الشبكة، وميزة التكلفة المنخفضة.',
    goldenRuleAr:
      'القاعدة الذهبية: افحص دائماً قائمة التدفقات النقدية؛ إذا كانت الأرباح المحاسبية تنمو بينما التدفق النقدي التشغيلي يتراجع، فهذا إنذار خطر محاسبي.',
  },

  // 5. Quantitative Trading, Systems & Options
  {
    id: 'trade-your-way-financial-freedom-tharp',
    titleEn: 'Trade Your Way to Financial Freedom (2nd Edition)',
    titleAr: 'تداول بطريقتك نحو الحرية المالية',
    author: 'Dr. Van K. Tharp',
    year: 2006,
    categoryKey: 'quant_systems_options',
    categoryLabelAr: 'التداول الكمي وبناء الأنظمة والخيارات',
    levelAr: 'متوسط',
    repoFileName: 'Trade Your Way to Financial Freedom 2nd edition 2006.pdf',
    summaryAr:
      'المصدر الأساسي لمفهوم مضاعفات المخاطرة (R-Multiples)، التوقع الرياضي (Expectancy)، ومقياس جودة النظام (SQN)، ونماذج تحديد حجم الصفقة.',
    goldenRuleAr:
      'القاعدة الذهبية: إشارات الدخول تحدد التوقع الرياضي، لكن خوارزمية تحديد حجم الصفقة (Position Sizing) هي التي تحدد كم ستكسب فعلياً وما إذا كنت ستنجو من التراجع.',
  },
  {
    id: 'algorithmic-trading-chan',
    titleEn: 'Algorithmic Trading: Winning Strategies and Their Rationale',
    titleAr: 'التداول الخوارزمي: الاستراتيجيات الرابحة ومنطقها العلمي',
    author: 'Dr. Ernest P. Chan',
    year: 2013,
    categoryKey: 'quant_systems_options',
    categoryLabelAr: 'التداول الكمي وبناء الأنظمة والخيارات',
    levelAr: 'متقدم',
    repoFileName: 'Algorithmic Trading - Winning Strategies and Their Rationale 2013.pdf',
    ratingNote: '4.1/5 (37 تقييم في Trading.txt)',
    summaryAr:
      'يشرح رياضياً وبرمجياً استراتيجيات العودة للمتوسط (Stationarity & Cointegration)، مرشح كالمان (Kalman Filter)، واستراتيجيات الزخم العابر، مع تطبيق معيار كيلي للرافعة المثلى.',
    goldenRuleAr:
      'القاعدة الذهبية: استخدم اختبار التكامل المشترك (Cointegration) بدلاً من معامل الارتباط البسيط (Correlation) عند بناء استراتيجيات تداول الأزواج.',
  },
  {
    id: 'building-reliable-trading-systems-fitschen',
    titleEn: 'Building Reliable Trading Systems: Tradable Strategies That Perform As They Backtest',
    titleAr: 'بناء أنظمة تداول موثوقة تؤدي في الواقع كما في الاختبار التاريخي',
    author: 'Keith Fitschen',
    year: 2013,
    categoryKey: 'quant_systems_options',
    categoryLabelAr: 'التداول الكمي وبناء الأنظمة والخيارات',
    levelAr: 'متوسط',
    repoFileName: 'Building Reliable Trading Systems - Tradable Strategies That Perform As They Backtest and Meet Your Risk-Reward Goals 2013.pdf',
    ratingNote: '4.2/5 (29 تقييم في Trading.txt)',
    summaryAr:
      'مبتكر نظام Aberration الشهير يشرح كيف نتجنب فخ الإفراط في تحسين المعاملات (Curve-Fitting / Overfitting) على البيانات التاريخية.',
    goldenRuleAr:
      'القاعدة الذهبية: النظام القوي يعمل بنفس المعاملات عبر سلة واسعة من الأسواق دون تفصيل معامِل خاص لكل سوق على حدة.',
  },
  {
    id: 'evidence-based-technical-analysis-aronson',
    titleEn: 'Evidence-Based Technical Analysis: Applying the Scientific Method and Statistical Inference',
    titleAr: 'التحليل الفني القائم على الأدلة: تطبيق المنهج العلمي والاستدلال الإحصائي',
    author: 'David Aronson',
    year: 2007,
    categoryKey: 'quant_systems_options',
    categoryLabelAr: 'التحليل الفني والسلوك السعري والشموع',
    levelAr: 'تأسيسي',
    repoFileName: 'Evidence-Based Technical Analysis - Applying the Scientific Method and Statistical Inference to Trading Signals 2007.pdf',
    ratingNote: '4.0/5 (69 تقييم في Trading.txt)',
    summaryAr:
      'يطبق منهجية الفرضية الصفرية وتصحيح انحياز التنقيب في البيانات (Data-Mining Bias) على أكثر من 6,400 قاعدة تحليل فني لاكتشاف الإشارات ذات الدلالة الإحصائية الحقيقية.',
    goldenRuleAr:
      'القاعدة الذهبية: أي استراتيجية لم تُختبر خارج العينة (Out-of-Sample) مع خصم انحياز التنقيب في البيانات هي مجرد مصادفة تاريخية.',
  },
  {
    id: 'option-volatility-pricing-natenberg',
    titleEn: 'Option Volatility & Pricing: Advanced Trading Strategies and Techniques',
    titleAr: 'تقلب الخيارات وتسعيرها: استراتيجيات وتقنيات التداول المتقدمة',
    author: 'Sheldon Natenberg',
    year: 1994,
    categoryKey: 'quant_systems_options',
    categoryLabelAr: 'التداول الكمي وبناء الأنظمة والخيارات',
    levelAr: 'متقدم',
    repoFileName: 'Option Volatility & Pricing - Advanced Trading Strategies and Techniques 1994.pdf',
    summaryAr:
      'الكتاب المقدس لمتداولي الخيارات وصناع السوق في شيكاغو. يشرح اليونانيات (Delta, Gamma, Theta, Vega)، التحوط الديناميكي (Delta-Neutral Hedging)، وتداول انحراف التقلب (Volatility Skew).',
    goldenRuleAr:
      'القاعدة الذهبية: في سوق الخيارات أنت لا تتداول اتجاه السهم فقط، بل تتداول الفرق بين التقلب الضمني المسعّر حالياً والتقلب الفعلي الذي سيحدث مستقبلاً.',
  },
  {
    id: 'option-spread-strategies-saliba',
    titleEn: 'Option Spread Strategies: Trading Up, Down, and Sideways Markets',
    titleAr: 'استراتيجيات فروق الخيارات: التداول في الأسواق الصاعدة والهابطة والعرضية',
    author: 'Anthony J. Saliba',
    year: 2009,
    categoryKey: 'quant_systems_options',
    categoryLabelAr: 'التداول الكمي وبناء الأنظمة والخيارات',
    levelAr: 'متقدم',
    repoFileName: 'Option Spread Strategies - Trading Up, Down, and Sideways Markets 2009.pdf',
    summaryAr:
      'دليل تطبيقي لبناء استراتيجيات Vertical Spreads، Iron Condors، Butterflies، وCalendar Spreads لضبط سقف الخسارة وتحييد تآكل القيمة الزمنية.',
    goldenRuleAr:
      'القاعدة الذهبية: بيع الخيارات المغطاة عبر الفروقات (Credit/Debit Spreads) يحميك من مخاطر الذيل غير المحدودة مع الاستفادة من تآكل الوقت (Theta).',
  },

  // 6. Forex, Macro, Reflexivity & Financial Crises
  {
    id: 'alchemy-of-finance-soros',
    titleEn: 'The Alchemy of Finance: Reading the Mind of the Market',
    titleAr: 'خيمياء التمويل: قراءة عقل السوق ونظرية الانعكاسية',
    author: 'George Soros',
    year: 1994,
    categoryKey: 'forex_macro_history',
    categoryLabelAr: 'أسواق العملات والماكرو وتاريخ الأزمات',
    levelAr: 'متقدم',
    repoFileName: 'The Alchemy of Finance - Reading the Mind of the Market 2nd edition 1994.pdf',
    summaryAr:
      'يعرض سوروس نظريته الفلسفية والمالية «الانعكاسية» مع يوميات تداول حية لصندوق كوانتوم، موضحاً كيف تتشكل دورات الازدهار والانهيار في العملات والائتمان.',
    goldenRuleAr:
      'القاعدة الذهبية: الأسواق منحازة دائماً، وهذا الانحياز يؤثر في الأساسيات الاقتصادية نفسها؛ اربح من ركوب الاتجاه الذاتي التغذية واخرج فور وصوله لمرحلة التشبع.',
  },
  {
    id: 'fooled-by-randomness-taleb',
    titleEn: 'Fooled by Randomness: The Hidden Role of Chance in Life and in the Markets',
    titleAr: 'مخدوعون بالعشوائية: الدور الخفي للصدفة في الحياة والأسواق',
    author: 'Nassim Nicholas Taleb',
    year: 2005,
    categoryKey: 'forex_macro_history',
    categoryLabelAr: 'أسواق العملات والماكرو وتاريخ الأزمات',
    levelAr: 'متقدم',
    repoFileName: 'Fooled by Randomness - The Hidden Role of Chance in Life and in the Markets 2005.pdf',
    summaryAr:
      'يحلل انحياز البقاء (Survivorship Bias) وعدم التماثل الإحصائي، ولماذا يفلس المتداولون الذين يجنون أرباحاً صغيرة منتظمة عبر تحمل مخاطر بجعة سوداء نادرة.',
    goldenRuleAr:
      'القاعدة الذهبية: لا تخلط بين غياب الدليل على وقوع الكارثة وبين الدليل على غيابها؛ صمم محفظتك بحيث تستفيد من الأحداث المتطرفة بدلاً من أن تدمرها.',
  },
  {
    id: 'attacking-currency-trends-gregersen',
    titleEn: 'Attacking Currency Trends: How to Anticipate and Trade Big Moves in the Forex Market',
    titleAr: 'مهاجمة اتجاهات العملات: كيف تتوقع وتتداول التحركات الكبرى في الفوركس',
    author: 'Greg Michalowski',
    year: 2011,
    categoryKey: 'forex_macro_history',
    categoryLabelAr: 'أسواق العملات والماكرو وتاريخ الأزمات',
    levelAr: 'متوسط',
    repoFileName: 'Attacking Currency Trends - How to Anticipate and Trade Big Moves in the Forex Market 2011.pdf',
    ratingNote: '4.6/5 (61 تقييم في Trading.txt)',
    summaryAr:
      'منهجية عملية لركوب الاتجاهات الكبرى في الفوركس عبر استخدام المتوسطات المتحركة 100 و200 ساعة/يوم كحدود فاصلة (Borderlines) للمخاطرة المنخفضة.',
    goldenRuleAr:
      'القاعدة الذهبية: استخدم المتوسط المتحرك 100 و200 كحاجز دفاعي؛ ادخل بالقرب منهما عندما يعيد السعر اختبارهما، وضع وقف الخسارة خلفهما مباشرة.',
  },
  {
    id: 'day-trading-swing-currency-lien',
    titleEn: 'Day Trading and Swing Trading the Currency Market (2nd Edition)',
    titleAr: 'التداول اليومي والمتأرجح في سوق العملات: استراتيجيات فنية وأساسية',
    author: 'Kathy Lien',
    year: 2008,
    categoryKey: 'forex_macro_history',
    categoryLabelAr: 'أسواق العملات والماكرو وتاريخ الأداول',
    levelAr: 'متوسط',
    repoFileName: 'Day Trading and Swing Trading the Currency Market - Technical and Fundamental Strategies to Profit from Market Moves 2nd edition 2008.pdf',
    summaryAr:
      'يجمع بين المحركات الأساسية للعملات (فروق أسعار الفائدة، ميزان المدفوعات، خصائص كل عملة رئيسية) وبين استراتيجيات فنية جاهزة مثل التلاشي المزدوج واختراق الجلسة الأوروبية.',
    goldenRuleAr:
      'القاعدة الذهبية: فروق عوائد السندات لعامين بين دولتين هي المؤشر القائد الأقوى لاتجاه زوج العملات على المدى المتوسط.',
  },
  {
    id: 'commitments-of-traders-bible-briese',
    titleEn: 'The Commitments of Traders Bible: How To Profit from Insider Market Intelligence',
    titleAr: 'إنجيل التزامات المتداولين (COT): كيف تربح من استخبارات السوق الداخلية',
    author: 'Stephen Briese',
    year: 2008,
    categoryKey: 'forex_macro_history',
    categoryLabelAr: 'أسواق العملات والماكرو وتاريخ الأزمات',
    levelAr: 'متقدم',
    repoFileName: 'The Commitments of Traders Bible - How To Profit from Insider Market Intelligence 2008.pdf',
    summaryAr:
      'يشرح بالتفصيل كيفية قراءة التقرير الأسبوعي لهيئة CFTC الأمريكية، وبناء مؤشر COT Index لرصد اللحظة التي يشتري فيها المتحوطون التجاريون بأقصى طاقتهم.',
    goldenRuleAr:
      'القاعدة الذهبية: عندما يصل صافي شراء التجاريين (Commercials) إلى قمة 3 سنوات بينما يبيع المضاربون الأفراد، فإن القاع الرئيسي للسوق قد تشكل.',
  },
  {
    id: 'when-genius-failed-ltcm',
    titleEn: 'When Genius Failed: The Rise and Fall of Long-Term Capital Management',
    titleAr: 'عندما فشلت العبقرية: صعود وسقوط صندوق LTCM',
    author: 'Roger Lowenstein',
    year: 2001,
    categoryKey: 'forex_macro_history',
    categoryLabelAr: 'أسواق العملات والماكرو وتاريخ الأزمات',
    levelAr: 'تطوير العقلية',
    repoFileName: 'When Genius Failed - The Rise and Fall of Long-Term Capital Management 2001.pdf',
    summaryAr:
      'قصة انهيار صندوق التحوط الذي ضم حائزي جائزة نوبل (ميرتون وشولز) عام 1998 بسبب الرافعة المالية المفرطة (25:1) وافتراض أن الأسواق تتبع التوزيع الطبيعي الغاوسي.',
    goldenRuleAr:
      'القاعدة الذهبية: في أوقات الذعر المالي، تقفز معاملات الارتباط بين جميع الأصول إلى 1.0 وتجف السيولة؛ الرافعة المالية العالية تحول أي انحراف مؤقت إلى إفلاس دائم.',
  },
  {
    id: 'the-big-short-flash-boys-lewis',
    titleEn: 'The Big Short: Inside the Doomsday Machine & Flash Boys',
    titleAr: 'البيع الكبير (داخل آلة يوم القيامة) وفتيان الفلاش',
    author: 'Michael Lewis',
    year: 2015,
    categoryKey: 'forex_macro_history',
    categoryLabelAr: 'أسواق العملات والماكرو وتاريخ الأزمات',
    levelAr: 'تطوير العقلية',
    repoFileName: 'The Big Short - Inside the Doomsday Machine 2011.epub',
    summaryAr:
      'يروي كيف قرأ مايكل بيري وستيف آيزمان وتشارلي ليدلي البيانات الأولية لقروض الرهن العقاري التي تجاهلها الجميع، وبنوا رهانات غير متماثلة بعقود CDS قبل انهيار 2008.',
    goldenRuleAr:
      'القاعدة الذهبية: لا تثق بتصنيفات وكالات الائتمان أو إجماع وول ستريت؛ اقرأ البيانات الأساسية الأولية وابحث عن الاختلالات المسعّرة بأرخص تكلفة تأمين.',
  },
  {
    id: 'cryptoassets-burniske',
    titleEn: 'Cryptoassets: The Innovative Investor’s Guide to Bitcoin and Beyond',
    titleAr: 'الأصول الرقمية المشفرة: دليل المستثمر المبتكر للبيتكوين وما بعدها',
    author: 'Chris Burniske & Jack Tatar',
    year: 2017,
    categoryKey: 'forex_macro_history',
    categoryLabelAr: 'أسواق العملات والماكرو وتاريخ الأزمات',
    levelAr: 'متوسط',
    repoFileName: 'Cryptoassets - The Innovative Investor\'s Guide to Bitcoin and Beyond 2017.pdf',
    summaryAr:
      'يقدم إطاراً مؤسسياً لتقييم الأصول الرقمية عبر معادلة التبادل النقدي (MV = PQ)، نسبة شارب، وفحص الورقة البيضاء والنشاط التطويري للشبكة.',
    goldenRuleAr:
      'القاعدة الذهبية: تخصيص نسبة صغيرة (1%–5%) في أصل غير مترابط ذي تقلب مرتفع مع إعادة التوازن الدورية يرفع نسبة شارب لإجمالي المحفظة.',
  },
];
