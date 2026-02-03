import { getLocale } from "@/lib/i18n-server";

export default function SignUpPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  const t = {
    title: { fa: "عضویت در فلورنس", en: "Join Felorance" },
    heading: { fa: "ساخت حساب کاربری", en: "Create your account" },
    subtitle: {
      fa: "لیست علاقه‌مندی بسازید، سفارش‌ها را پیگیری کنید و به دراپ‌های ویژه دسترسی بگیرید.",
      en: "Build wishlists, track orders, and unlock exclusive studio drops.",
    },
    firstName: { fa: "نام", en: "First name" },
    lastName: { fa: "نام خانوادگی", en: "Last name" },
    email: { fa: "ایمیل", en: "Email address" },
    password: { fa: "رمز عبور", en: "Password" },
    submit: { fa: "ثبت نام", en: "Create account" },
    link: { fa: "ورود", en: "Sign in" },
    perksTitle: { fa: "مزایا", en: "What you get" },
    perksSubtitle: { fa: "استایلینگ شخصی با تکنولوژی.", en: "Personalized styling meets tech." },
    perks: {
      fa: ["ذخیره سایز برای خرید سریع", "یادآوری رزرو با استایلیست", "دسترسی زودهنگام به همکاری‌ها"],
      en: ["Custom sizing saved for fast checkout", "Stylist notes and appointment reminders", "Early access to collaborations"],
    },
    reward: { fa: "اعتبار خوش آمد", en: "Member reward" },
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  {t.firstName[locale]}
                </label>
                <input
                  type="text"
                  placeholder={isRtl ? "آریا" : "Arielle"}
                  className="mt-2 w-full rounded-full border border-slate-200 bg-transparent px-4 py-3 text-sm dark:border-slate-700"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  {t.lastName[locale]}
                </label>
                <input
                  type="text"
                  placeholder={isRtl ? "مرادی" : "Morgan"}
                  className="mt-2 w-full rounded-full border border-slate-200 bg-transparent px-4 py-3 text-sm dark:border-slate-700"
                />
              </div>
            </div>
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
            {isRtl ? "حساب دارید؟" : "Already have access?"}{" "}
            <a className="font-semibold text-slate-900 dark:text-white" href="/auth/sign-in">
              {t.link[locale]}
            </a>
          </p>
        </div>
        <div className="rounded-[32px] border border-slate-900 bg-slate-900 p-10 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">
            {t.perksTitle[locale]}
          </p>
          <h2 className="mt-3 text-2xl font-semibold">{t.perksSubtitle[locale]}</h2>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            {t.perks[locale].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-rose-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl bg-white/10 p-6">
            <p className="text-xs uppercase tracking-wide text-white/60">{t.reward[locale]}</p>
            <p className="mt-2 text-2xl font-semibold">$35</p>
            <p className="mt-2 text-xs text-white/70">{isRtl ? "روی اولین سفارش اعمال می‌شود" : "Applied on your first order"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
