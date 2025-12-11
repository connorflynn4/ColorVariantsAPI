import { randomBytes } from 'crypto';

/**
 * Generates a secure API key
 * @param length - Length of the key in bytes (default: 32 bytes = 64 hex characters)
 * @returns A cryptographically secure random API key
 */
export function generateApiKey(length: number = 32): string {
  // Generate random bytes and convert to hex string
  const bytes = randomBytes(length);
  return bytes.toString('hex');
}

/**
 * Generates a prefixed API key (e.g., "cvk_" prefix for Color Variants Key)
 * @param prefix - Prefix for the API key (default: "cvk_")
 * @param length - Length of the random part in bytes (default: 32)
 * @returns A prefixed API key
 */
export function generatePrefixedApiKey(prefix: string = 'cvk_', length: number = 32): string {
  const randomPart = generateApiKey(length);
  return `${prefix}${randomPart}`;
}

