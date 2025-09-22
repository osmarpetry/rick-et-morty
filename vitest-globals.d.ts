/// <reference types="vitest/globals" />

import type {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
} from 'vitest';

declare global {
  const beforeAll: typeof beforeAll;
  const afterAll: typeof afterAll;
  const beforeEach: typeof beforeEach;
  const afterEach: typeof afterEach;
  const describe: typeof describe;
  const it: typeof it;
  const expect: typeof expect;
}

export {};
