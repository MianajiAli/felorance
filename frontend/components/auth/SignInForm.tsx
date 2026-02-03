"use client";

import { useState } from "react";
import type { Language } from "@/lib/types";

interface SignInFormProps {
  language: Language;
}

const SignInForm = ({ language }: SignInFormProps) => {
  const isFa = language === "fa";
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      mobile: formData.get("mobile"),
      password: formData.get("password"),
      otp: formData.get("otp"),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000/api"}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      if (data?.tokens?.access) {
        document.cookie = `felorance-access=${data.tokens.access}; path=/; max-age=3600`;
        window.localStorage.setItem("felorance-access", data.tokens.access);
      }
      setStatus(isFa ? "ورود با موفقیت انجام شد." : "Signed in successfully.");
    } catch (error) {
      setStatus(
        isFa
          ? "ورود ناموفق بود. شماره موبایل یا رمز را بررسی کنید."
          : "Sign in failed. Please check your mobile number or password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            {isFa ? "شماره موبایل" : "Mobile number"}
          </label>
          <input
            name="mobile"
            type="tel"
            placeholder={isFa ? "۰۹۱۲۱۲۳۴۵۶۷" : "09121234567"}
            className="mt-2 w-full rounded-full border border-subtle px-4 py-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            {isFa ? "رمز عبور" : "Password"}
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="mt-2 w-full rounded-full border border-subtle px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            {isFa ? "کد یکبار مصرف" : "OTP code"}
          </label>
          <input
            name="otp"
            type="text"
            placeholder={isFa ? "اختیاری" : "Optional"}
            className="mt-2 w-full rounded-full border border-subtle px-4 py-3 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)]"
        >
          {isLoading ? (isFa ? "در حال ورود..." : "Signing in...") : isFa ? "ورود" : "Sign in"}
        </button>
      </form>
      {status ? <p className="mt-4 text-xs text-emerald-500">{status}</p> : null}
    </>
  );
};

export default SignInForm;
