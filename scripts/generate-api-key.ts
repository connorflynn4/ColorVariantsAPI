#!/usr/bin/env ts-node
import { generatePrefixedApiKey } from '../src/common/utils/api-key-generator';

/**
 * Script to generate a new API key
 * Usage: npm run generate:api-key
 * or: ts-node scripts/generate-api-key.ts
 */

function main() {
  const apiKey = generatePrefixedApiKey('cvk_', 32);
  
  console.log('\n🔑 Generated API Key:');
  console.log('━'.repeat(60));
  console.log(apiKey);
  console.log('━'.repeat(60));
  console.log('\n📝 Add this to your .env file:');
  console.log(`API_KEYS=${apiKey}`);
  console.log('\n💡 For multiple keys, separate them with commas:');
  console.log(`API_KEYS=${apiKey},cvk_anotherkeyhere`);
  console.log('\n⚠️  Keep this key secure and never commit it to version control!\n');
}

main();

