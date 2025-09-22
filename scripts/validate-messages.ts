/**
 * Message Validation Script
 * Validates all message files against the Messages type interface
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { validateMessages, type Messages } from '../types/messages';

const MESSAGES_DIR = join(process.cwd(), 'messages');
const MESSAGE_FILES = ['en.json', 'de.json', 'fr.json'];

interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
}

function validateMessageFile(filename: string): ValidationResult {
  const result: ValidationResult = {
    file: filename,
    valid: false,
    errors: [],
  };

  try {
    const filePath = join(MESSAGES_DIR, filename);
    const content = readFileSync(filePath, 'utf-8');
    const messages = JSON.parse(content);

    if (validateMessages(messages)) {
      result.valid = true;
      console.log(`✅ ${filename}: Valid`);
    } else {
      result.errors.push('Message structure does not match Messages interface');
      console.log(`❌ ${filename}: Invalid structure`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    result.errors.push(`Failed to parse JSON: ${errorMessage}`);
    console.log(`❌ ${filename}: ${errorMessage}`);
  }

  return result;
}

function validateAllMessages(): boolean {
  console.log('🔍 Validating message files...\n');

  const results = MESSAGE_FILES.map(validateMessageFile);
  const allValid = results.every(result => result.valid);

  console.log('\n📊 Validation Summary:');
  console.log('─'.repeat(50));

  results.forEach(result => {
    console.log(`${result.file}: ${result.valid ? '✅ Valid' : '❌ Invalid'}`);
    if (result.errors.length > 0) {
      result.errors.forEach(error => {
        console.log(`  - ${error}`);
      });
    }
  });

  console.log('─'.repeat(50));
  console.log(
    `Overall: ${allValid ? '✅ All files valid' : '❌ Some files invalid'}`
  );

  return allValid;
}

// Additional validation: Check for missing keys across languages
function validateConsistency(): boolean {
  console.log('\n🔄 Checking consistency across languages...\n');

  const messageContents: Record<string, Messages> = {};

  // Load all message files
  for (const filename of MESSAGE_FILES) {
    try {
      const filePath = join(MESSAGES_DIR, filename);
      const content = readFileSync(filePath, 'utf-8');
      const messages = JSON.parse(content);

      if (validateMessages(messages)) {
        messageContents[filename] = messages;
      }
    } catch (error) {
      console.log(`❌ Failed to load ${filename}`);
      return false;
    }
  }

  // Check for consistency
  const baseFile = 'en.json';
  const baseMessages = messageContents[baseFile];

  if (!baseMessages) {
    console.log('❌ Base file (en.json) not found or invalid');
    return false;
  }

  let allConsistent = true;

  // Check each section
  const sections = ['navigation', 'characters', 'common', 'theme'] as const;

  for (const section of sections) {
    console.log(`Checking ${section} section...`);
    const baseKeys = Object.keys(baseMessages[section]);

    for (const [filename, messages] of Object.entries(messageContents)) {
      if (filename === baseFile) continue;

      const currentKeys = Object.keys(messages[section]);
      const missingKeys = baseKeys.filter(key => !currentKeys.includes(key));
      const extraKeys = currentKeys.filter(key => !baseKeys.includes(key));

      if (missingKeys.length > 0) {
        console.log(
          `  ❌ ${filename} missing keys in ${section}: ${missingKeys.join(', ')}`
        );
        allConsistent = false;
      }

      if (extraKeys.length > 0) {
        console.log(
          `  ⚠️  ${filename} extra keys in ${section}: ${extraKeys.join(', ')}`
        );
      }

      if (missingKeys.length === 0 && extraKeys.length === 0) {
        console.log(`  ✅ ${filename} ${section} section consistent`);
      }
    }
  }

  console.log(
    `\n${allConsistent ? '✅ All files consistent' : '❌ Inconsistencies found'}`
  );
  return allConsistent;
}

// Main execution
function main() {
  console.log('🌍 Rick and Morty Message Validation');
  console.log('═'.repeat(50));

  const structureValid = validateAllMessages();
  const consistencyValid = validateConsistency();

  const overallValid = structureValid && consistencyValid;

  console.log('\n🎯 Final Result:');
  console.log('═'.repeat(50));
  console.log(
    `${overallValid ? '✅ All validations passed!' : '❌ Validation failed!'}`
  );

  if (!overallValid) {
    console.log('\n💡 Tips:');
    console.log('- Ensure all message files follow the Messages interface');
    console.log('- Check that all languages have the same keys');
    console.log('- Verify JSON syntax is correct');
    process.exit(1);
  }

  process.exit(0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateMessageFile, validateAllMessages, validateConsistency };
