import { randomBytes } from "crypto";

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH = 8;

/**
 * Generate an 8-character alphanumeric short code.
 * Uses crypto.randomBytes for cryptographic randomness.
 * 62^8 ≈ 218 trillion possible codes.
 */
export function generateShortCode(): string {
  const bytes = randomBytes(CODE_LENGTH);
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return code;
}

/**
 * Check if a string looks like a UUID (36 chars with dashes).
 * Used for backward compatibility — old URLs used UUIDs.
 */
export function isUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
