"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

interface AuthTesterProps {
  locale: Locale;
}

const AuthTester = ({ locale }: AuthTesterProps) => {
  const [status, setStatus] = useState<string>("guest");

  useEffect(() => {
    const stored = localStorage.getItem("felorance_auth_state");
    if (stored) {
      setStatus(stored);
    }
  }, []);

  const setAuthState = (value: string) => {
    localStorage.setItem("felorance_auth_state", value);
    setStatus(value);
  };

  const labels = {
    title: { fa: "تست احراز هویت", en: "Auth test" },
    subtitle: { fa: "وضعیت فعلی حساب کاربری را شبیه‌سازی کنید.", en: "Simulate account status locally." },
    guest: { fa: "مهمان", en: "Guest" },
    member: { fa: "عضو", en: "Member" },
    vip: { fa: "وی‌آی‌پی", en: "VIP" },
    current: { fa: "وضعیت فعلی", en: "Current status" },
  };

  return (
    <div className="rounded-[32px] border border-white/60 bg-[var(--card)] p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        {labels.title[locale]}
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {labels.subtitle[locale]}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
          onClick={() => setAuthState("guest")}
        >
          {labels.guest[locale]}
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
          onClick={() => setAuthState("member")}
        >
          {labels.member[locale]}
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
          onClick={() => setAuthState("vip")}
        >
          {labels.vip[locale]}
        </button>
      </div>
      <div className="mt-6 rounded-2xl bg-[var(--muted)] p-4 text-sm text-slate-700 dark:text-slate-200">
        {labels.current[locale]}: <span className="font-semibold">{status}</span>
      </div>
    </div>
  );
};

export default AuthTester;
