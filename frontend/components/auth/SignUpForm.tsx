"use client";

import { useState } from "react";
import type { Language } from "@/lib/types";

interface SignUpFormProps {
  language: Language;
}

const SignUpForm = ({ language }: SignUpFormProps) => {
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
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000/api"}/auth/register/`, {
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
        try {
          window.localStorage.setItem("felorance-access", data.tokens.access);
        } catch {
          // ignore storage errors (private mode or disabled storage)
        }
      }
      setStatus(isFa ? "ثبت‌نام انجام شد." : "Account created successfully.");
    } catch (error) {
      setStatus(
        isFa
          ? "ثبت‌نام ناموفق بود. اطلاعات را بررسی کنید."
          : "Sign up failed. Please verify your details."
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
            {isFa ? "نام" : "First name"}
          </label>
          <input
            name="first_name"
            type="text"
            placeholder={isFa ? "رها" : "Raha"}
            className="mt-2 w-full rounded-full border border-subtle px-4 py-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            {isFa ? "نام خانوادگی" : "Last name"}
          </label>
          <input
            name="last_name"
            type="text"
            placeholder={isFa ? "اکبری" : "Akbari"}
            className="mt-2 w-full rounded-full border border-subtle px-4 py-3 text-sm"
            required
          />
        </div>
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
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)]"
        >
          {isLoading ? (isFa ? "در حال ثبت‌نام..." : "Creating account...") : isFa ? "ثبت‌نام" : "Create account"}
        </button>
      </form>
      {status ? <p className="mt-4 text-xs text-emerald-500">{status}</p> : null}
    </>
  );
};

export default SignUpForm;
