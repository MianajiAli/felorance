import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/api";

describe("formatPrice", () => {
  it("formats prices for Persian locale", () => {
    const result = formatPrice(1500000, "fa", "IRR");
    expect(result).toContain("ریال");
  });

  it("formats prices for English locale", () => {
    const result = formatPrice(150, "en", "USD");
    expect(result).toContain("$");
  });
});
