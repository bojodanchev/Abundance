// ============================================================
// Shared validation for name, email, phone
// Returns translation keys instead of hardcoded strings
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
 * Name must be at least 2 characters.
 * Returns a translation key or null.
 */
export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "validation.nameRequired";

  if (trimmed.length < 2) {
    return "validation.nameMinLength";
  }

  return null;
}

/**
 * Standard email regex check.
 * Returns a translation key or null.
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "validation.emailRequired";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return "validation.emailInvalid";
  }

  return null;
}

/**
 * Validates phone number digits for a given country code.
 * Returns a translation key or null.
 */
export function validatePhone(
  localNumber: string,
  countryCode: string
): string | null {
  // Strip non-digit characters
  const digits = localNumber.replace(/[\s\-()]/g, "").replace(/^0+/, "");

  if (!digits) return "validation.phoneRequired";

  const country = COUNTRY_CODES.find((c) => c.code === countryCode);
  if (!country) return "validation.countryCodeRequired";

  if (!/^\d+$/.test(digits)) {
    return "validation.phoneDigitsOnly";
  }

  if (digits.length < country.minDigits || digits.length > country.maxDigits) {
    if (country.minDigits === country.maxDigits) {
      return "validation.phoneExactDigits";
    }
    return "validation.phoneRangeDigits";
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
