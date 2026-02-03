"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSettings } from "@/components/SettingsProvider";

const posts = {
  ethical-gemstones: {
    fa: {
      title: "چگونه سنگ‌های اخلاقی انتخاب می‌کنیم",
      intro: "ما با تامین‌کنندگان شفاف و قابل ردگیری کار می‌کنیم.",
      content: [
        "تمام سنگ‌ها گواهی منشا دارند و مسیر تامین آن‌ها ثبت می‌شود.",
        "هر همکاری جدید در استودیو بازبینی کیفیت و اخلاق دارد.",
        "در انتخاب سنگ‌ها به پایداری زیست‌محیطی توجه ویژه داریم.",
      ],
    },
    en: {
      title: "How we source ethical gemstones",
      intro: "We work with transparent, traceable partners across the supply chain.",
      content: [
        "Every stone includes provenance documentation and sourcing notes.",
        "New partners go through quality and ethics audits before onboarding.",
        "We prioritize sustainable extraction and low-impact processes.",
      ],
    },
  },
  "silver-layering": {
    fa: {
      title: "لایه‌بندی نقره با رنگ‌های گرم",
      intro: "نقره با رزگلد و سنگ‌های طبیعی ترکیب دلنشینی ایجاد می‌کند.",
      content: [
        "یک قطعه شاخص را انتخاب کنید و لایه‌ها را حول آن بسازید.",
        "تعادل بافت‌ها باعث می‌شود استایل شما حرفه‌ای‌تر شود.",
        "از چیدمان گردنبندها با طول‌های متفاوت استفاده کنید.",
      ],
    },
    en: {
      title: "Layering silver with warm tones",
      intro: "Silver pairs beautifully with rose gold and earthy stones.",
      content: [
        "Start with a statement piece and build complementary layers.",
        "Balance textures to keep the look intentional and refined.",
        "Mix chain lengths to create depth and movement.",
      ],
    },
  },
  "studio-craft": {
    fa: {
      title: "ظرافت در ساخت هر قفل",
      intro: "ما هر قفل را مثل یک قطعه هنری کوچک می‌سازیم.",
      content: [
        "قفل‌ها با قالب اختصاصی و پرداخت دستی شکل می‌گیرند.",
        "آزمایش‌های دوام برای هر مدل انجام می‌شود.",
        "هر قفل با امضای فلورنس به پایان می‌رسد.",
      ],
    },
    en: {
      title: "The craft behind every clasp",
      intro: "We treat every clasp as a miniature artwork.",
      content: [
        "Each clasp is cast in-house and hand polished for a soft finish.",
        "Durability tests are run on every new design.",
        "Every clasp carries a Felorance signature mark.",
      ],
    },
  },
} as const;

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { language } = useSettings();
  const isFa = language === "fa";
  const post = useMemo(() => posts[params.slug as keyof typeof posts], [params.slug]);

  if (!post) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="surface rounded-[32px] p-10 text-center">
          <p className="text-sm text-muted">{isFa ? "مقاله پیدا نشد" : "Article not found"}</p>
          <Link href="/blog" className="mt-6 inline-block font-semibold text-[var(--foreground)]">
            {isFa ? "بازگشت به وبلاگ" : "Back to blog"}
          </Link>
        </div>
      </main>
    );
  }

  const content = post[language];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="surface rounded-[32px] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {isFa ? "داستان استودیو" : "Studio story"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{content.title}</h1>
        <p className="mt-4 text-sm text-muted">{content.intro}</p>
        <div className="mt-8 space-y-4 text-sm text-muted">
          {content.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/blog" className="text-sm font-semibold text-[var(--foreground)]">
            {isFa ? "بازگشت" : "Back"}
          </Link>
        </div>
      </article>
    </main>
  );
}
