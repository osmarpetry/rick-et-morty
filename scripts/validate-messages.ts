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
    } else {
      result.errors.push('Message structure does not match Messages interface');
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    result.errors.push(`Failed to parse JSON: ${errorMessage}`);
  }

  return result;
}

function validateAllMessages(): boolean {
  const results = MESSAGE_FILES.map(validateMessageFile);
  const allValid = results.every(result => result.valid);

  return allValid;
}

// Additional validation: Check for missing keys across languages
function validateConsistency(): boolean {
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
      return false;
    }
  }

  // Check for consistency
  const baseFile = 'en.json';
  const baseMessages = messageContents[baseFile];

  if (!baseMessages) {
    return false;
  }

  let allConsistent = true;

  // Check each section
  const sections = ['navigation', 'characters', 'common', 'theme'] as const;

  for (const section of sections) {
    const baseKeys = Object.keys(baseMessages[section]);

    for (const [filename, messages] of Object.entries(messageContents)) {
      if (filename === baseFile) continue;

      const currentKeys = Object.keys(messages[section]);
      const missingKeys = baseKeys.filter(key => !currentKeys.includes(key));
      const extraKeys = currentKeys.filter(key => !baseKeys.includes(key));

      if (missingKeys.length > 0) {
        allConsistent = false;
      }
    }
  }

  return allConsistent;
}

// Main execution
function main() {
  const structureValid = validateAllMessages();
  const consistencyValid = validateConsistency();

  const overallValid = structureValid && consistencyValid;

  if (!overallValid) {
    process.exit(1);
  }

  process.exit(0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateMessageFile, validateAllMessages, validateConsistency };
