// ============================================================
// Shared validation for name, email, phone
// ============================================================

export const COUNTRY_CODES = [
  { code: "+359", country: "BG", label: "🇧🇬 +359", minDigits: 9, maxDigits: 9 },
  { code: "+44", country: "GB", label: "🇬🇧 +44", minDigits: 10, maxDigits: 10 },
  { code: "+49", country: "DE", label: "🇩🇪 +49", minDigits: 10, maxDigits: 11 },
  { code: "+33", country: "FR", label: "🇫🇷 +33", minDigits: 9, maxDigits: 9 },
  { code: "+39", country: "IT", label: "🇮🇹 +39", minDigits: 9, maxDigits: 10 },
  { code: "+34", country: "ES", label: "🇪🇸 +34", minDigits: 9, maxDigits: 9 },
  { code: "+30", country: "GR", label: "🇬🇷 +30", minDigits: 10, maxDigits: 10 },
  { code: "+40", country: "RO", label: "🇷🇴 +40", minDigits: 9, maxDigits: 9 },
  { code: "+381", country: "RS", label: "🇷🇸 +381", minDigits: 8, maxDigits: 9 },
  { code: "+385", country: "HR", label: "🇭🇷 +385", minDigits: 8, maxDigits: 9 },
  { code: "+90", country: "TR", label: "🇹🇷 +90", minDigits: 10, maxDigits: 10 },
  { code: "+1", country: "US", label: "🇺🇸 +1", minDigits: 10, maxDigits: 10 },
  { code: "+971", country: "AE", label: "🇦🇪 +971", minDigits: 8, maxDigits: 9 },
] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

/**
 * Name must be at least two words, each at least 2 characters.
 * e.g. "Alex Ivanov" ✓, "a" ✗, "A" ✗
 */
export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Моля, въведи име и фамилия";

  const parts = trimmed.split(/\s+/).filter((p) => p.length >= 2);
  if (parts.length < 2) {
    return "Моля, въведи пълно име и фамилия (напр. Алекс Иванов)";
  }

  return null;
}

/**
 * Standard email regex check.
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Моля, въведи имейл адрес";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return "Моля, въведи валиден имейл адрес";
  }

  return null;
}

/**
 * Validates phone number digits for a given country code.
 * Strips spaces, dashes, and leading zero from the local part.
 */
export function validatePhone(
  localNumber: string,
  countryCode: string
): string | null {
  // Strip non-digit characters
  const digits = localNumber.replace(/[\s\-()]/g, "").replace(/^0+/, "");

  if (!digits) return "Моля, въведи телефонен номер";

  const country = COUNTRY_CODES.find((c) => c.code === countryCode);
  if (!country) return "Моля, избери код на държава";

  if (!/^\d+$/.test(digits)) {
    return "Телефонният номер трябва да съдържа само цифри";
  }

  if (digits.length < country.minDigits || digits.length > country.maxDigits) {
    if (country.minDigits === country.maxDigits) {
      return `Номерът трябва да е ${country.minDigits} цифри за ${country.label}`;
    }
    return `Номерът трябва да е ${country.minDigits}-${country.maxDigits} цифри за ${country.label}`;
  }

  return null;
}

/**
 * Formats the full international phone number.
 */
export function formatPhone(localNumber: string, countryCode: string): string {
  const digits = localNumber.replace(/[\s\-()]/g, "").replace(/^0+/, "");
  return `${countryCode}${digits}`;
}
