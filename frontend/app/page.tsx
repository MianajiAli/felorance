import { collections, products, blogPosts } from "@/lib/storefront-data";
import { getLocale } from "@/lib/i18n-server";

const stats = [
  {
    label: { fa: "زمان آماده‌سازی سفارش", en: "Custom fittings" },
    value: { fa: "۴۸ ساعت", en: "48h" },
  },
  { label: { fa: "استودیوهای فعال", en: "Studio locations" }, value: { fa: "۶", en: "6" } },
  {
    label: { fa: "رضایت مشتری", en: "Customer satisfaction" },
    value: { fa: "۴.۹/۵", en: "4.9/5" },
  },
];

const testimonials = [
  {
    name: { fa: "آریل م.", en: "Arielle M." },
    quote: {
      fa: "جزئیات فوق‌العاده بود و حس کاملاً سفارشی داشت.",
      en: "The pieces feel bespoke and the unboxing was stunning. Every detail is intentional.",
    },
  },
  {
    name: { fa: "نورا س.", en: "Noura S." },
    quote: {
      fa: "بالاخره برندی که لوکس است اما برای استفاده روزانه مناسب.",
      en: "Finally a jewelry brand that feels premium yet wearable daily.",
    },
  },
];

export default function Home() {
  const locale = getLocale();
  const isRtl = locale === "fa";
  const align = isRtl ? "text-right" : "text-left";

  const t = {
    heroEyebrow: {
      fa: "استودیو نقره فلورنس",
      en: "Felorance Silver Studio",
    },
    heroTitle: {
      fa: "تجربه کامل خرید زیورآلات؛ از الهام تا تحویل.",
      en: "A complete jewelry experience, from discovery to delivery.",
    },
    heroSubtitle: {
      fa: "فلورنس ترکیبی از طراحی مدرن و ساخت دستی است. مجموعه‌های خاص را ببینید، جلسه استایل رزرو کنید و سفارش‌ها را یکجا مدیریت کنید.",
      en: "Felorance blends modern craftsmanship with timeless silhouettes. Explore curated collections, book custom fittings, and manage your orders in one seamless space.",
    },
    shopCollections: { fa: "مشاهده مجموعه‌ها", en: "Shop collections" },
    wishlist: { fa: "ساخت لیست علاقه‌مندی", en: "Start a wishlist" },
    livePreview: { fa: "پیش‌نمایش زنده استودیو", en: "Live studio preview" },
    nowShipping: { fa: "ارسال فعال", en: "Now shipping" },
    featuredSet: { fa: "ست آرورا", en: "Aurora Set" },
    featuredSetDesc: {
      fa: "دراپ محدود با اوپال، مون‌استون و لینک‌های اسکلپت.",
      en: "A limited drop featuring opal, moonstone, and sculpted silver links.",
    },
    featuredHighlights: {
      fa: ["سنگ‌های اخلاقی", "ارسال رایگان خرید بالای ۱۵۰ دلار", "بسته‌بندی هدیه اختصاصی"],
      en: ["Ethically sourced gemstones", "Free express shipping over $150", "Personalized gift wrap included"],
    },
    collectionsTitle: { fa: "مجموعه‌ها", en: "Collections" },
    collectionsSubtitle: { fa: "امضای ما برای هر حال و هوا.", en: "Signature lines designed for every mood." },
    bookSession: { fa: "رزرو جلسه استایل", en: "Book a styling session" },
    newArrivals: { fa: "جدیدترین‌ها", en: "New arrivals" },
    newArrivalsSubtitle: { fa: "دراپ‌های تازه برای لایه‌سازی.", en: "Fresh drops crafted for layering." },
    openAdmin: { fa: "باز کردن پنل ادمین", en: "Open admin panel" },
    bestSellers: { fa: "پرفروش‌ها", en: "Best sellers" },
    bestSellersSubtitle: { fa: "پایه‌های نقره‌ای با لبه مدرن.", en: "Silver staples with a modern edge." },
    bestSellersDesc: {
      fa: "موجودی، ارسال‌ها و گزارش‌های لحظه‌ای را از داشبورد مدیریت کنید.",
      en: "Track inventory, manage fulfillment, and access real-time reporting from your dashboard.",
    },
    journal: { fa: "ژورنال", en: "Journal" },
    journalSubtitle: { fa: "داستان‌هایی از استودیو.", en: "Stories from the studio." },
    subscribe: { fa: "عضویت در خبرنامه", en: "Subscribe for updates" },
    testimonials: { fa: "نظرات مشتریان", en: "Testimonials" },
    testimonialsSubtitle: { fa: "انتخاب اول استایلیست‌ها در جهان.", en: "Loved by stylists worldwide." },
    concierge: { fa: "مشاوره اختصاصی", en: "Concierge" },
    conciergeTitle: { fa: "برای خرید بعدی برنامه‌ریزی کنید.", en: "Plan your next purchase." },
    conciergeDesc: {
      fa: "دسترسی سریع به دراپ‌های خصوصی، استایل شخصی و رزرو حضوری.",
      en: "Get priority access to private drops, personal styling, and in-studio bookings.",
    },
    requestConsultation: { fa: "درخواست مشاوره", en: "Request a consultation" },
    footerTagline: { fa: "خلق میراث‌های مدرن از ۲۰۱۶.", en: "Designing modern heirlooms since 2016." },
    clientLogin: { fa: "ورود مشتری", en: "Client login" },
    adminDashboard: { fa: "داشبورد ادمین", en: "Admin dashboard" },
    contactStudio: { fa: "تماس با استودیو", en: "Contact studio" },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: "Felorance Jewelry",
    url: "https://felorance.example",
    description: t.heroSubtitle[locale],
    areaServed: "Worldwide",
    makesOffer: products.slice(0, 3).map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: product.title[locale],
      },
      price: product.price.replace("$", ""),
      priceCurrency: "USD",
    })),
  };

  return (
    <main className={`mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 ${align}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            {t.heroEyebrow[locale]}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {t.heroTitle[locale]}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">{t.heroSubtitle[locale]}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#collections"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {t.shopCollections[locale]}
            </a>
            <a
              href="/auth/sign-up"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-200"
            >
              {t.wishlist[locale]}
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label.en}
                className="rounded-2xl border border-white/50 bg-[var(--card)] p-4 shadow-sm"
              >
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {stat.value[locale]}
                </p>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  {stat.label[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-white/60 bg-gradient-to-br from-slate-900 via-slate-800 to-rose-500 p-1 shadow-2xl">
          <div className="h-full rounded-[28px] bg-slate-950 p-8 text-white">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white/70">{t.livePreview[locale]}</p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{t.nowShipping[locale]}</span>
            </div>
            <div className="mt-10 space-y-6">
              <h2 className="text-3xl font-semibold">{t.featuredSet[locale]}</h2>
              <p className="text-white/70">{t.featuredSetDesc[locale]}</p>
              <div className="grid gap-4 text-sm">
                {t.featuredHighlights[locale].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-rose-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-white/60">
                {isRtl ? "قیمت ویژه" : "Featured price"}
              </p>
              <p className="text-3xl font-semibold">$298</p>
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              {t.collectionsTitle[locale]}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
              {t.collectionsSubtitle[locale]}
            </h2>
          </div>
          <a
            href="/auth/sign-in"
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {t.bookSession[locale]}
          </a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {collections.map((collection) => (
            <div
              key={collection.name.en}
              className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {collection.name[locale]}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {collection.description[locale]}
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-rose-500">
                {collection.highlight[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="new-arrivals" className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              {t.newArrivals[locale]}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
              {t.newArrivalsSubtitle[locale]}
            </h2>
          </div>
          <a
            href="/admin"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
          >
            {t.openAdmin[locale]}
          </a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.slug}
              className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {product.title[locale]}
                </h3>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                  {product.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {product.detail[locale]}
              </p>
              <button className="mt-6 w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-200">
                {isRtl ? "افزودن به سبد" : "Add to cart"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="best-sellers" className="mt-20">
        <div className="rounded-[32px] border border-white/60 bg-[var(--card)] p-10 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
                {t.bestSellers[locale]}
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                {t.bestSellersSubtitle[locale]}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t.bestSellersDesc[locale]}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Inventory alerts", "Live order tracking", "Client gifting notes", "Studio staff access"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-200"
                    >
                      {isRtl
                        ? {
                            "Inventory alerts": "هشدار موجودی",
                            "Live order tracking": "پیگیری زنده سفارش",
                            "Client gifting notes": "یادداشت‌های هدیه",
                            "Studio staff access": "دسترسی تیم استودیو",
                          }[item]
                        : item}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { label: { fa: "درآمد ماهانه", en: "Monthly revenue" }, value: "$84,320", delta: "+12%" },
                { label: { fa: "زمان ارسال", en: "Fulfillment time" }, value: "1.4 days", delta: "-18%" },
                { label: { fa: "مشترکان فعال", en: "Active subscribers" }, value: "12,482", delta: "+6%" },
                { label: { fa: "رزرو حضوری", en: "In-studio bookings" }, value: "362", delta: "+24%" },
              ].map((card) => (
                <div key={card.label.en} className="rounded-3xl border border-slate-100 bg-[var(--muted)] p-6">
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-200">
                    {card.label[locale]}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
                  <p className="mt-2 text-xs font-semibold text-emerald-500">{card.delta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="journal" className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              {t.journal[locale]}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
              {t.journalSubtitle[locale]}
            </h2>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {t.subscribe[locale]}
          </a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {blogPosts.map((entry) => (
            <article
              key={entry.slug}
              className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                {entry.tag[locale]}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                {entry.title[locale]}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{entry.excerpt[locale]}</p>
              <p className="mt-6 text-xs text-slate-500 dark:text-slate-300">{entry.date}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-white/60 bg-[var(--card)] p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            {t.testimonials[locale]}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            {t.testimonialsSubtitle[locale]}
          </h2>
          <div className="mt-8 space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name.en} className="rounded-2xl bg-[var(--muted)] p-6">
                <p className="text-sm text-slate-600 dark:text-slate-200">“{testimonial.quote[locale]}”</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  {testimonial.name[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          id="contact"
          className="rounded-[32px] border border-slate-900 bg-slate-900 p-10 text-white shadow-lg"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">
            {t.concierge[locale]}
          </p>
          <h2 className="mt-2 text-3xl font-semibold">{t.conciergeTitle[locale]}</h2>
          <p className="mt-4 text-sm text-white/70">{t.conciergeDesc[locale]}</p>
          <form className="mt-8 space-y-4">
            <input
              type="text"
              placeholder={isRtl ? "نام کامل" : "Full name"}
              className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
            />
            <input
              type="email"
              placeholder={isRtl ? "ایمیل" : "Email address"}
              className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900"
            >
              {t.requestConsultation[locale]}
            </button>
          </form>
        </div>
      </section>

      <footer className="mt-20 rounded-[32px] border border-white/60 bg-[var(--card)] p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {isRtl ? "جواهرات فلورنس" : "Felorance Jewelry"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-300">{t.footerTagline[locale]}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 dark:text-slate-200">
            <a href="/auth/sign-in" className="hover:text-slate-900 dark:hover:text-white">
              {t.clientLogin[locale]}
            </a>
            <a href="/admin" className="hover:text-slate-900 dark:hover:text-white">
              {t.adminDashboard[locale]}
            </a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white">
              {t.contactStudio[locale]}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
