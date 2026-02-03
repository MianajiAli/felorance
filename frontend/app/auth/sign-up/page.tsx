import SignUpForm from "@/components/auth/SignUpForm";
import { getServerSettings } from "@/lib/server-settings";

export default async function SignUpPage() {
  const { language } = await getServerSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface rounded-[32px] p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {isFa ? "عضویت" : "Join Felorance"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold">{isFa ? "ایجاد حساب" : "Create your account"}</h1>
          <p className="mt-3 text-sm text-muted">
            {isFa
              ? "لیست علاقه‌مندی، پیگیری سفارش و دسترسی اختصاصی." 
              : "Build wishlists, track orders, and unlock exclusive studio drops."}
          </p>
          <SignUpForm language={language} />
          <p className="mt-6 text-xs text-muted">
            {isFa ? "قبلا عضو شده‌اید؟" : "Already have access?"} 
            <a className="font-semibold text-[var(--foreground)]" href="/auth/sign-in">
              {isFa ? "ورود" : "Sign in"}
            </a>
          </p>
        </div>
        <div className="surface-strong rounded-[32px] p-10 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">
            {isFa ? "مزایا" : "What you get"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            {isFa ? "استایلینگ شخصی + تکنولوژی" : "Personalized styling meets tech."}
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            {[
              isFa ? "ذخیره سایز برای پرداخت سریع" : "Custom sizing saved for fast checkout",
              isFa ? "یادداشت‌های استایلیست" : "Stylist notes and appointment reminders",
              isFa ? "دسترسی زودهنگام" : "Early access to collaborations",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-rose-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl bg-white/10 p-6">
            <p className="text-xs uppercase tracking-wide text-white/60">
              {isFa ? "جایزه عضویت" : "Member reward"}
            </p>
            <p className="mt-2 text-2xl font-semibold">{isFa ? "۱,۵۰۰,۰۰۰ تومان" : "$35 welcome credit"}</p>
            <p className="mt-2 text-xs text-white/70">
              {isFa ? "روی سفارش اول اعمال می‌شود" : "Applied on your first order"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
