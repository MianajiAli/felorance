import type { Locale } from "./i18n";

export type LocalizedText = Record<Locale, string>;

export interface Collection {
  name: LocalizedText;
  description: LocalizedText;
  highlight: LocalizedText;
}

export interface Product {
  slug: string;
  title: LocalizedText;
  detail: LocalizedText;
  price: string;
  status: LocalizedText;
}

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  tag: LocalizedText;
  date: string;
  excerpt: LocalizedText;
  content: LocalizedText[];
}

export const collections: Collection[] = [
  {
    name: { fa: "نقره مهتاب", en: "Moonlit Silver" },
    description: {
      fa: "فیلیگرن دستی با الهام از آسمان شب و نور ملایم ماه.",
      en: "Handcrafted filigree inspired by twilight skies and soft moonlight.",
    },
    highlight: { fa: "۹۲۵ نقره، اوپال آزمایشگاهی", en: "925 silver, lab-grown opal" },
  },
  {
    name: { fa: "ورا پرل", en: "Vera Pearl" },
    description: {
      fa: "لایه‌سازی مدرن مروارید برای استفاده روزانه.",
      en: "Modern pearl layering for everyday elegance.",
    },
    highlight: {
      fa: "مروارید آب شیرین + ورمیل رزگلد",
      en: "Freshwater pearl + rose gold vermeil",
    },
  },
  {
    name: { fa: "آستریا", en: "Asteria" },
    description: {
      fa: "سیلوئت‌های آسمانی با گرادیان‌های نرم سنگ‌های قیمتی.",
      en: "Celestial gemstone silhouettes with soft gradients.",
    },
    highlight: { fa: "بلو توپاز، مون‌استون، استرلینگ", en: "Blue topaz, moonstone, sterling" },
  },
];

export const products: Product[] = [
  {
    slug: "luna-drop-earrings",
    title: { fa: "گوشواره لونا", en: "Luna Drop Earrings" },
    detail: {
      fa: "آویز حجمی با اوپال دست‌نشانی شده و قفل ضد حساسیت.",
      en: "A sculpted drop with hand-set opal and hypoallergenic closure.",
    },
    price: "$148",
    status: { fa: "موجود", en: "In stock" },
  },
  {
    slug: "eclipse-chain",
    title: { fa: "گردنبند اکلپس", en: "Eclipse Chain" },
    detail: {
      fa: "زنجیر قابل تنظیم با مدالیون‌های نقره برس‌خورده.",
      en: "Adjustable chain with brushed silver medallions.",
    },
    price: "$218",
    status: { fa: "پرفروش", en: "Best seller" },
  },
  {
    slug: "solstice-cuff",
    title: { fa: "کاف سولستیس", en: "Solstice Cuff" },
    detail: {
      fa: "کاف استیتمنت با حکاکی ستاره‌ای و فینیش ساتن.",
      en: "Statement cuff with satin finish and star engraving.",
    },
    price: "$188",
    status: { fa: "موجود", en: "In stock" },
  },
  {
    slug: "aurora-set",
    title: { fa: "ست آرورا", en: "Aurora Set" },
    detail: {
      fa: "ست محدود با مون‌استون، اوپال و لینک‌های اسکلپت.",
      en: "Limited set featuring moonstone, opal, and sculpted links.",
    },
    price: "$298",
    status: { fa: "نسخه محدود", en: "Limited" },
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "ethical-gemstones",
    title: { fa: "چطور سنگ‌های اخلاقی انتخاب می‌کنیم", en: "How we source ethical gemstones" },
    tag: { fa: "یادداشت استودیو", en: "Studio Notes" },
    date: "2024-09-22",
    excerpt: {
      fa: "راهنمای کوتاه تیم فلورنس برای ردیابی زنجیره تامین شفاف.",
      en: "A short guide from the Felorance team on transparent sourcing.",
    },
    content: [
      {
        fa: "ما با تامین‌کننده‌هایی کار می‌کنیم که گواهی استخراج مسئولانه و گزارش کامل دارند.",
        en: "We partner with suppliers who carry responsible mining certifications and full traceability reports.",
      },
      {
        fa: "هر سنگ قیمتی قبل از ورود به استودیو از نظر کیفیت و سلامت محیطی بررسی می‌شود.",
        en: "Every gemstone is evaluated for quality and environmental impact before it enters our studio.",
      },
    ],
  },
  {
    slug: "layering-silver",
    title: { fa: "ترکیب نقره با رنگ‌های گرم", en: "Layering silver with warm tones" },
    tag: { fa: "استایلینگ", en: "Styling" },
    date: "2024-10-05",
    excerpt: {
      fa: "پالت‌های پیشنهادی برای هماهنگی نقره و رزگلد در یک استایل.",
      en: "Recommended palettes to balance silver and rose gold in one look.",
    },
    content: [
      {
        fa: "برای استایل روزانه، نقره مات را با رزگلد براق ترکیب کنید.",
        en: "For daily styling, combine matte silver with high-polish rose gold.",
      },
      {
        fa: "از اکسسوری‌های بافت‌دار برای ایجاد کنتراست بصری استفاده کنید.",
        en: "Use textured accessories to build visual contrast and depth.",
      },
    ],
  },
  {
    slug: "craft-behind-clasp",
    title: { fa: "جزئیات ساخت قفل‌ها", en: "The craft behind every clasp" },
    tag: { fa: "پشت صحنه", en: "Behind the scenes" },
    date: "2024-10-17",
    excerpt: {
      fa: "چرا قفل‌های ما به اندازه‌ی خود زیور اهمیت دارند.",
      en: "Why our clasps matter as much as the jewelry they secure.",
    },
    content: [
      {
        fa: "هر قفل با دست صیقل داده می‌شود تا حتی در استفاده روزمره احساس لوکس داشته باشد.",
        en: "Each clasp is hand-polished so it feels luxurious even with daily wear.",
      },
      {
        fa: "سیستم قفل دوبل ما برای امنیت بیشتر طراحی شده است.",
        en: "Our double-lock system is engineered for added security.",
      },
    ],
  },
];
