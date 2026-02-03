import SignInForm from "@/components/auth/SignInForm";
import { getServerSettings } from "@/lib/server-settings";

export default function SignInPage() {
  const { language } = getServerSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface rounded-[32px] p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {isFa ? "خوش آمدید" : "Welcome back"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold">{isFa ? "ورود به حساب" : "Sign in to your vault"}</h1>
          <p className="mt-3 text-sm text-muted">
            {isFa
              ? "به سفارش‌ها، علاقه‌مندی‌ها و جلسات استایلینگ دسترسی داشته باشید."
              : "Access your orders, wishlist, and private styling sessions in one place."}
          </p>
          <SignInForm language={language} />
          <p className="mt-6 text-xs text-muted">
            {isFa ? "حساب ندارید؟" : "Need access?"} 
            <a className="font-semibold text-[var(--foreground)]" href="/auth/sign-up">
              {isFa ? "ثبت‌نام" : "Create an account"}
            </a>
          </p>
        </div>
        <div className="surface-strong rounded-[32px] p-10 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">
            {isFa ? "مزایا" : "Member benefits"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            {isFa ? "کانسیرج اختصاصی شما" : "Your jewelry concierge awaits."}
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            {[
              isFa ? "پروفایل سایز و حکاکی ذخیره‌شده" : "Saved size profiles and engraving notes",
              isFa ? "دسترسی زودهنگام به دراپ‌ها" : "Priority access to limited drops",
              isFa ? "رزرو خصوصی با استایلیست" : "Private appointments with our stylists",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-rose-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl bg-white/10 p-6">
            <p className="text-xs uppercase tracking-wide text-white/60">
              {isFa ? "آخرین ارسال" : "Last order shipped"}
            </p>
            <p className="mt-2 text-2xl font-semibold">{isFa ? "۲ ساعت پیش" : "2 hours ago"}</p>
            <p className="mt-2 text-xs text-white/70">
              {isFa ? "از استودیو نیویورک" : "From our New York studio"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
