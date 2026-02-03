import AuthTester from "@/components/AuthTester";
import { getLocale } from "@/lib/i18n-server";

export default function AuthTestPage() {
  const locale = getLocale();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <AuthTester locale={locale} />
    </main>
  );
}
