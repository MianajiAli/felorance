import { getLocale } from "@/lib/i18n-server";

export default function SignInPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  const t = {
    title: { fa: "بازگشت خوش آمدید", en: "Welcome back" },
    heading: { fa: "ورود به حساب فلورنس", en: "Sign in to your vault" },
    subtitle: {
      fa: "سفارش‌ها، لیست علاقه‌مندی و جلسات استایل خود را یکجا مدیریت کنید.",
      en: "Access your orders, wishlist, and private styling sessions in one place.",
    },
    email: { fa: "ایمیل", en: "Email address" },
    password: { fa: "رمز عبور", en: "Password" },
    submit: { fa: "ورود", en: "Sign in" },
    link: { fa: "ثبت نام", en: "Create an account" },
    memberTitle: { fa: "مزایای عضویت", en: "Member benefits" },
    memberSubtitle: { fa: "مشاور زیورآلات شما آماده است.", en: "Your jewelry concierge awaits." },
    benefits: {
      fa: ["ذخیره سایز و یادداشت حکاکی", "دسترسی سریع به دراپ‌ها", "رزرو خصوصی با استایلیست"],
      en: ["Saved size profiles and engraving notes", "Priority access to limited drops", "Private appointments with our stylists"],
    },
    lastOrder: { fa: "آخرین ارسال", en: "Last order shipped" },
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className={`rounded-[32px] border border-white/60 bg-[var(--card)] p-10 shadow-sm ${isRtl ? "text-right" : "text-left"}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            {t.title[locale]}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
            {t.heading[locale]}
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t.subtitle[locale]}</p>
          <form className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                {t.email[locale]}
              </label>
              <input
                type="email"
                placeholder="name@felorance.com"
                className="mt-2 w-full rounded-full border border-slate-200 bg-transparent px-4 py-3 text-sm dark:border-slate-700"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                {t.password[locale]}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-full border border-slate-200 bg-transparent px-4 py-3 text-sm dark:border-slate-700"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              {t.submit[locale]}
            </button>
          </form>
          <p className="mt-6 text-xs text-slate-500 dark:text-slate-300">
            {isRtl ? "حساب ندارید؟" : "Need access?"}{" "}
            <a className="font-semibold text-slate-900 dark:text-white" href="/auth/sign-up">
              {t.link[locale]}
            </a>
          </p>
        </div>
        <div className="rounded-[32px] border border-slate-900 bg-slate-900 p-10 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">
            {t.memberTitle[locale]}
          </p>
          <h2 className="mt-3 text-2xl font-semibold">{t.memberSubtitle[locale]}</h2>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            {t.benefits[locale].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-rose-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl bg-white/10 p-6">
            <p className="text-xs uppercase tracking-wide text-white/60">{t.lastOrder[locale]}</p>
            <p className="mt-2 text-2xl font-semibold">{isRtl ? "۲ ساعت پیش" : "2 hours ago"}</p>
            <p className="mt-2 text-xs text-white/70">{isRtl ? "ارسال از استودیو نیویورک" : "From our New York studio"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
