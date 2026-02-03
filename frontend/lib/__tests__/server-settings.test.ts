import { describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: () => ({
    get: (key: string) => {
      if (key === "felorance-language") return { value: "en" };
      if (key === "felorance-theme") return { value: "dark" };
      return undefined;
    },
  }),
}));

import { getServerSettings } from "@/lib/server-settings";

describe("getServerSettings", () => {
  it("reads language and theme from cookies", () => {
    const settings = getServerSettings();
    expect(settings.language).toBe("en");
    expect(settings.theme).toBe("dark");
  });
});
