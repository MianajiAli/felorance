import { formatPrice, getPosts, getProducts } from "@/lib/api";
import { getServerSettings } from "@/lib/server-settings";

const collections = {
  fa: [
    {
      name: "ماهتاب",
      description: "فیلیگری دست‌ساز با الهام از آسمان شب.",
      highlight: "نقره ۹۲۵، اوپال آزمایشگاهی",
    },
    {
      name: "ورای مروارید",
      description: "لایه‌بندی مروارید مدرن برای هر روز.",
      highlight: "مروارید آب شیرین، روکِش رزگلد",
    },
    {
      name: "آستریا",
      description: "سیلوئت‌های کیهانی با رنگ‌های لطیف.",
      highlight: "توپاز آبی، مون‌استون، استرلینگ",
    },
  ],
  en: [
    {
      name: "Moonlit Silver",
      description: "Handcrafted filigree inspired by twilight skies.",
      highlight: "925 silver, lab-grown opal",
    },
    {
      name: "Vera Pearl",
      description: "Modern pearl layering for everyday elegance.",
      highlight: "Freshwater pearl + rose gold vermeil",
    },
    {
      name: "Asteria",
      description: "Celestial gemstone silhouettes with soft gradients.",
      highlight: "Blue topaz, moonstone, sterling",
    },
  ],
};

const products = {
  fa: [
    {
      title: "گوشواره لونا",
      price: "۵٫۹۰۰٫۰۰۰ تومان",
      detail: "قطره‌ی نقره با اوپال دست‌نشانده.",
    },
    {
      title: "زنجیر اکلیپس",
      price: "۸٫۴۰۰٫۰۰۰ تومان",
      detail: "زنجیر قابل تنظیم با مدال‌های مات.",
    },
    {
      title: "دستبند سولستیس",
      price: "۷٫۱۰۰٫۰۰۰ تومان",
      detail: "کاف استیتمنت با حکاکی ستاره.",
    },
  ],
  en: [
    {
      title: "Luna Drop Earrings",
      price: "$148",
      detail: "A sculpted drop with hand-set opal.",
    },
    {
      title: "Eclipse Chain",
      price: "$218",
      detail: "Adjustable chain with brushed silver medallions.",
    },
    {
      title: "Solstice Cuff",
      price: "$188",
      detail: "Statement cuff with satin finish and star engraving.",
    },
  ],
};

const testimonials = {
  fa: [
    {
      name: "آریانا م.",
      quote: "جزئیات دقیق و بسته‌بندی فوق‌العاده بود. حس سفارشی می‌دهد.",
    },
    {
      name: "نورا س.",
      quote: "بالاخره برندی که لوکس است و برای استفاده روزمره هم مناسب.",
    },
  ],
  en: [
    {
      name: "Arielle M.",
      quote: "The pieces feel bespoke and the unboxing was stunning. Every detail is intentional.",
    },
    {
      name: "Noura S.",
      quote: "Finally a jewelry brand that feels premium yet wearable daily.",
    },
  ],
};

const journal = {
  fa: [
    {
      title: "چگونه سنگ‌های اخلاقی تهیه می‌کنیم",
      tag: "یادداشت استودیو",
      date: "۱ مهر",
    },
    {
      title: "ترکیب نقره با طیف‌های گرم",
      tag: "استایلینگ",
      date: "۱۳ مهر",
    },
    {
      title: "جزئیات ساخت هر قفل",
      tag: "پشت صحنه",
      date: "۲۵ مهر",
    },
  ],
  en: [
    {
      title: "How we source ethical gemstones",
      tag: "Studio Notes",
      date: "Sep 22",
    },
    {
      title: "Layering silver with warm tones",
      tag: "Styling",
      date: "Oct 05",
    },
    {
      title: "The craft behind every clasp",
      tag: "Behind the scenes",
      date: "Oct 17",
    },
  ],
};

export default async function Home() {
  const { language } = await getServerSettings();
  const isFa = language === "fa";
  const [apiProducts, apiPosts] = await Promise.all([
    getProducts().catch(() => []),
    getPosts().catch(() => []),
  ]);

  const featuredProducts =
    apiProducts.length > 0
      ? apiProducts.slice(0, 3).map((product) => ({
          title: product.name,
          price: formatPrice(product.price, language, product.currency),
          detail: product.description || product.material,
        }))
      : products[language];

  const latestJournal =
    apiPosts.length > 0
      ? apiPosts.slice(0, 3).map((post) => ({
          title: post.title,
          tag: post.meta_keywords?.split(",")[0] ?? (isFa ? "ژورنال" : "Journal"),
          date: new Date(post.created_at).toLocaleDateString(language === "fa" ? "fa-IR" : "en-US"),
        }))
      : journal[language];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {isFa ? "استودیو جواهرات نقره" : "Silver Jewelry Studio"}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {isFa
              ? "یک تجربه کامل خرید جواهرات، از کشف تا تحویل."
              : "A complete jewelry experience, from discovery to delivery."}
          </h1>
          <p className="text-lg text-muted">
            {isFa
              ? "فلورنس با تلفیق طراحی مدرن و اصالت کلاسیک، کالکشن‌هایی برای هر سلیقه ارائه می‌دهد."
              : "Felorance blends modern craftsmanship with timeless silhouettes. Explore curated collections, book custom fittings, and manage your orders in one seamless space."}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#collections"
              className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition"
            >
              {isFa ? "خرید کالکشن‌ها" : "Shop collections"}
            </a>
            <a
              href="/auth/sign-up"
              className="rounded-full border border-subtle px-6 py-3 text-sm font-semibold text-muted transition hover:text-[var(--foreground)]"
            >
              {isFa ? "ساخت لیست علاقه‌مندی" : "Start a wishlist"}
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { label: isFa ? "فیتینگ اختصاصی" : "Custom fittings", value: "48h" },
              { label: isFa ? "مراکز استودیو" : "Studio locations", value: "6" },
              { label: isFa ? "رضایت مشتری" : "Customer satisfaction", value: "4.9/5" },
            ].map((stat) => (
              <div key={stat.label} className="surface rounded-2xl p-4">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-subtle bg-gradient-to-br from-slate-900 via-slate-800 to-rose-500 p-1 shadow-2xl">
          <div className="h-full rounded-[28px] bg-slate-950 p-8 text-white">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white/70">
                {isFa ? "پیش‌نمایش زنده استودیو" : "Live studio preview"}
              </p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                {isFa ? "در حال ارسال" : "Now shipping"}
              </span>
            </div>
            <div className="mt-10 space-y-6">
              <h2 className="text-3xl font-semibold">{isFa ? "ست آورورا" : "Aurora Set"}</h2>
              <p className="text-white/70">
                {isFa
                  ? "دراپ محدود با اوپال، مون‌استون و لینک‌های نقره." 
                  : "A limited drop featuring opal, moonstone, and sculpted silver links."}
              </p>
              <div className="grid gap-4 text-sm">
                {[
                  isFa ? "سنگ‌های اخلاقی" : "Ethically sourced gemstones",
                  isFa ? "ارسال سریع بالای ۵ میلیون" : "Free express shipping over $150",
                  isFa ? "بسته‌بندی هدیه اختصاصی" : "Personalized gift wrap included",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-rose-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-white/60">
                {isFa ? "قیمت ویژه" : "Featured price"}
              </p>
              <p className="text-3xl font-semibold">{isFa ? "۱۲٫۹۰۰٫۰۰۰ تومان" : "$298"}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              {isFa ? "کالکشن‌ها" : "Collections"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              {isFa ? "خطوط امضادار برای هر حال‌وهوا" : "Signature lines designed for every mood."}
            </h2>
          </div>
          <a
            href="/auth/sign-in"
            className="rounded-full border border-subtle px-5 py-2 text-sm font-semibold text-muted"
          >
            {isFa ? "رزرو جلسه استایل" : "Book a styling session"}
          </a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {collections[language].map((collection) => (
            <div key={collection.name} className="surface rounded-3xl p-6">
              <h3 className="text-xl font-semibold">{collection.name}</h3>
              <p className="mt-2 text-sm text-muted">{collection.description}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {collection.highlight}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="new-arrivals" className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              {isFa ? "جدیدترین‌ها" : "New arrivals"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              {isFa ? "دراپ‌های تازه برای لایه‌بندی" : "Fresh drops crafted for layering."}
            </h2>
          </div>
          <a
            href="/admin"
            className="rounded-full bg-[var(--foreground)] px-5 py-2 text-sm font-semibold text-[var(--background)]"
          >
            {isFa ? "پنل ادمین" : "Open admin panel"}
          </a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.title} className="surface rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <span className="accent-pill rounded-full px-3 py-1 text-xs font-semibold">
                  {product.price}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">{product.detail}</p>
              <button className="mt-6 w-full rounded-full border border-subtle px-4 py-2 text-sm font-semibold text-muted transition hover:text-[var(--foreground)]">
                {isFa ? "افزودن به علاقه‌مندی" : "Add to wishlist"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="best-sellers" className="mt-20">
        <div className="surface rounded-[32px] p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                {isFa ? "پرفروش‌ها" : "Best sellers"}
              </p>
              <h2 className="text-3xl font-semibold">
                {isFa ? "پایه‌های نقره با لبه‌ای مدرن" : "Silver staples with a modern edge."}
              </h2>
              <p className="text-sm text-muted">
                {isFa
                  ? "موجودی، ارسال و گزارش‌های لحظه‌ای را از داشبورد اختصاصی مدیریت کنید."
                  : "Track inventory, manage fulfillment, and access real-time reporting from your dedicated dashboard."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  isFa ? "هشدار موجودی" : "Inventory alerts",
                  isFa ? "پیگیری لحظه‌ای سفارش" : "Live order tracking",
                  isFa ? "یادداشت هدیه مشتری" : "Client gifting notes",
                  isFa ? "دسترسی تیم استودیو" : "Studio staff access",
                ].map((item) => (
                  <span key={item} className="rounded-full border border-subtle px-4 py-2 text-xs font-semibold text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  label: isFa ? "درآمد ماهانه" : "Monthly revenue",
                  value: isFa ? "۴٫۲ میلیارد" : "$84,320",
                  delta: "+12%",
                },
                {
                  label: isFa ? "زمان ارسال" : "Fulfillment time",
                  value: isFa ? "۱٫۴ روز" : "1.4 days",
                  delta: "-18%",
                },
                {
                  label: isFa ? "اعضای فعال" : "Active subscribers",
                  value: isFa ? "۱۲٬۴۸۲" : "12,482",
                  delta: "+6%",
                },
                {
                  label: isFa ? "رزرو استودیو" : "In-studio bookings",
                  value: isFa ? "۳۶۲" : "362",
                  delta: "+24%",
                },
              ].map((card) => (
                <div key={card.label} className="surface-muted rounded-3xl p-6">
                  <p className="text-xs uppercase tracking-wide text-muted">{card.label}</p>
                  <p className="mt-3 text-2xl font-semibold">{card.value}</p>
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
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              {isFa ? "ژورنال" : "Journal"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              {isFa ? "داستان‌هایی از استودیو" : "Stories from the studio."}
            </h2>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-subtle px-5 py-2 text-sm font-semibold text-muted"
          >
            {isFa ? "عضویت در خبرنامه" : "Subscribe for updates"}
          </a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {latestJournal.map((entry) => (
            <article key={entry.title} className="surface rounded-3xl p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {entry.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{entry.title}</h3>
              <p className="mt-6 text-xs text-muted">{entry.date}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface rounded-[32px] p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {isFa ? "نظرات" : "Testimonials"}
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            {isFa ? "مورد اعتماد استایلیست‌ها" : "Loved by stylists worldwide."}
          </h2>
          <div className="mt-8 space-y-6">
            {testimonials[language].map((testimonial) => (
              <div key={testimonial.name} className="surface-muted rounded-2xl p-6">
                <p className="text-sm text-muted">“{testimonial.quote}”</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div id="contact" className="surface-strong rounded-[32px] p-10 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">
            {isFa ? "کانسیرج" : "Concierge"}
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            {isFa ? "برای خرید بعدی برنامه‌ریزی کنید" : "Plan your next purchase."}
          </h2>
          <p className="mt-4 text-sm text-white/70">
            {isFa
              ? "دسترسی اختصاصی، استایلینگ شخصی و رزرو حضوری را دریافت کنید."
              : "Get priority access to private drops, personal styling, and in-studio bookings."}
          </p>
          <form className="mt-8 space-y-4">
            <input
              type="text"
              placeholder={isFa ? "نام و نام خانوادگی" : "Full name"}
              className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
            />
            <input
              type="email"
              placeholder={isFa ? "آدرس ایمیل" : "Email address"}
              className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900"
            >
              {isFa ? "درخواست مشاوره" : "Request a consultation"}
            </button>
          </form>
        </div>
      </section>

      <footer className="surface mt-20 rounded-[32px] p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">{isFa ? "فلورنس" : "Felorance Jewelry"}</p>
            <p className="text-sm text-muted">
              {isFa ? "طراحی جواهرات معاصر از ۲۰۱۶" : "Designing modern heirlooms since 2016."}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-muted">
            <a href="/auth/sign-in" className="hover:text-[var(--foreground)]">
              {isFa ? "ورود مشتری" : "Client login"}
            </a>
            <a href="/admin" className="hover:text-[var(--foreground)]">
              {isFa ? "داشبورد ادمین" : "Admin dashboard"}
            </a>
            <a href="/shop" className="hover:text-[var(--foreground)]">
              {isFa ? "فروشگاه" : "Shop"}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
