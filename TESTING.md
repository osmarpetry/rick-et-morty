# 🧪 Testing Guide - Rick and Morty Explorer

This document provides comprehensive information about the testing setup for the Rick and Morty Character Explorer application, including Storybook stories, visual regression testing, unit tests, and type safety validation.

## 📋 Table of Contents

- [Testing Overview](#testing-overview)
- [Storybook Stories](#storybook-stories)
- [Visual Regression Testing](#visual-regression-testing)
- [Unit Testing](#unit-testing)
- [Type Safety](#type-safety)
- [Running Tests](#running-tests)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)

## 🎯 Testing Overview

Our testing strategy follows the **Testing Pyramid** approach with comprehensive coverage across all levels:

```
    🔺 E2E Tests (Playwright)
   🔺🔺 Integration Tests (Storybook)
  🔺🔺🔺 Unit Tests (Vitest + RTL)
 🔺🔺🔺🔺 Type Safety (TypeScript)
```

### Testing Stack

- **🎨 Storybook**: Component documentation and visual testing
- **🧪 Vitest**: Fast unit testing framework
- **🎭 React Testing Library**: Component testing utilities
- **♿ Axe**: Accessibility testing
- **📸 Chromatic**: Visual regression testing
- **🎪 Playwright**: End-to-end testing
- **🔒 TypeScript**: Compile-time type checking

## 📚 Storybook Stories

### Atomic Design Structure

Our Storybook stories are organized following **Atomic Design** principles:

```
stories/
├── atoms/           # Basic UI elements
│   └── ThemeSwitcher.stories.tsx
├── molecules/       # Simple combinations
│   ├── SearchBar.stories.tsx
│   └── LanguageSwitcher.stories.tsx
├── organisms/       # Complex components
│   ├── CharacterTable.stories.tsx
│   ├── ErrorBoundary.stories.tsx
│   └── CharacterDrawer.stories.tsx
└── templates/       # Page layouts
    └── CharacterTableTemplate.stories.tsx
```

### Story Types

Each component includes comprehensive stories covering:

#### 🎨 **Visual States**

- Default state
- Loading states
- Error states
- Empty states
- Different data variations

#### 🎯 **Interactive Stories**

- User interactions (clicks, typing, navigation)
- Form submissions
- State changes
- Event handling

#### 📱 **Responsive Stories**

- Mobile viewport (375px)
- Tablet viewport (768px)
- Desktop viewport (1200px+)
- Wide desktop (1440px+)

#### ♿ **Accessibility Stories**

- Keyboard navigation
- Screen reader support
- ARIA labels and roles
- Focus management
- Color contrast

### Example Story Structure

```typescript
export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  parameters: {
    docs: {
      description: {
        story:
          'Interactive component with user interactions and state changes.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test user interactions
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalled();
  },
};
```

## 📸 Visual Regression Testing

### Chromatic Integration

Visual regression testing is powered by **Chromatic** with automatic screenshot comparison:

```bash
# Run visual tests
npm run chromatic

# Run visual tests in CI
npm run test:visual
```

### Screenshot Strategy

- **Desktop**: 1200x800px baseline
- **Mobile**: 375x667px for responsive components
- **Tablet**: 768x1024px for key layouts
- **Animations disabled** for consistent screenshots
- **Font loading** ensured before capture

### Visual Test Configuration

```typescript
// .storybook/test-runner.ts
async postVisit(page, context) {
  // Take screenshot for visual regression
  await page.screenshot({
    path: `screenshots/${context.id}.png`,
    fullPage: true,
    animations: 'disabled',
  });
}
```

## 🧪 Unit Testing

### Custom Hooks Testing

Comprehensive unit tests for custom hooks using **React Testing Library**:

#### `useDebouncedCallback` Tests

- ✅ Debouncing functionality
- ✅ Timer reset on subsequent calls
- ✅ Cleanup on unmount
- ✅ Multiple arguments handling
- ✅ Dependency changes
- ✅ Edge cases (zero delay, rapid calls)

#### `useTableUrlState` Tests

- ✅ URL parameter parsing
- ✅ State updates and URL synchronization
- ✅ Default value handling
- ✅ Array parameter parsing
- ✅ Page reset on filter changes
- ✅ Invalid parameter handling

### Test Structure

```typescript
describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it('should debounce callback execution', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(mockCallback, 500)
    );

    act(() => {
      result.current('test');
    });

    expect(mockCallback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockCallback).toHaveBeenCalledWith('test');
  });
});
```

### Running Unit Tests

```bash
# Run all unit tests
npm run test

# Run hook tests specifically
npm run test:hooks

# Watch mode for development
npm run test:hooks:watch

# Coverage report
npm run test:coverage
```

## 🔒 Type Safety

### Message Type Safety

All internationalization messages are type-safe using TypeScript interfaces:

```typescript
// types/messages.ts
export interface Messages {
  navigation: {
    title: string;
    home: string;
    characters: string;
    // ...
  };
  characters: {
    title: string;
    loading: string;
    // ...
  };
  // ...
}
```

### Message Validation

Automated validation ensures all language files conform to the type structure:

```bash
# Validate message files
npm run validate:messages
```

The validation script checks:

- ✅ **Structure compliance** with `Messages` interface
- ✅ **Key consistency** across all languages (en, de, fr)
- ✅ **JSON syntax** validity
- ✅ **Missing translations** detection

### Type Safety Features

- **Compile-time checking** for message keys
- **IntelliSense support** for message paths
- **Runtime validation** for message structure
- **Automatic error reporting** for inconsistencies

## 🚀 Running Tests

### Development Workflow

```bash
# Start Storybook for component development
npm run storybook

# Run unit tests in watch mode
npm run test:watch

# Run hook tests in watch mode
npm run test:hooks:watch

# Validate messages during development
npm run validate:messages
```

### Testing Commands

```bash
# All Tests
npm run test:all              # Run all tests (unit + hooks + storybook + messages)

# Unit Tests
npm run test                  # Run all unit tests
npm run test:watch           # Watch mode
npm run test:coverage        # With coverage report

# Hook Tests
npm run test:hooks           # Run hook tests
npm run test:hooks:watch     # Watch mode for hooks

# Storybook Tests
npm run test:storybook       # Run all story tests
npm run test:storybook:ci    # CI mode
npm run test:components      # Component interaction tests
npm run test:a11y           # Accessibility tests only

# Visual Tests
npm run chromatic           # Visual regression tests
npm run test:visual         # Visual tests with coverage

# Type Safety
npm run validate:messages   # Validate message files
npm run type-check          # TypeScript type checking
```

### CI/CD Commands

```bash
# Continuous Integration
npm run test:storybook:ci    # Storybook tests in CI mode
npm run test:coverage        # Unit tests with coverage
npm run validate:messages    # Message validation
npm run type-check          # Type checking
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Type checking
        run: npm run type-check

      - name: Validate messages
        run: npm run validate:messages

      - name: Unit tests
        run: npm run test:coverage

      - name: Hook tests
        run: npm run test:hooks

      - name: Build Storybook
        run: npm run build-storybook

      - name: Storybook tests
        run: npm run test:storybook:ci

      - name: Visual regression tests
        run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

### Quality Gates

- ✅ **Type checking** must pass
- ✅ **Message validation** must pass
- ✅ **Unit test coverage** > 80%
- ✅ **Hook tests** must pass
- ✅ **Accessibility tests** must pass
- ✅ **Visual regression** approval required

## 📖 Best Practices

### Story Writing

1. **Descriptive Names**: Use clear, descriptive story names
2. **Documentation**: Include story descriptions and component docs
3. **Interactive Tests**: Add play functions for user interactions
4. **Accessibility**: Test keyboard navigation and screen readers
5. **Responsive**: Test multiple viewport sizes
6. **Edge Cases**: Include error states and edge cases

### Unit Testing

1. **Arrange-Act-Assert**: Follow AAA pattern
2. **Mock External Dependencies**: Mock API calls, timers, etc.
3. **Test Behavior**: Focus on what the component does, not how
4. **Edge Cases**: Test error conditions and boundary values
5. **Cleanup**: Properly clean up timers, subscriptions, etc.

### Type Safety

1. **Strict Types**: Use strict TypeScript configuration
2. **Interface Compliance**: Ensure runtime data matches types
3. **Validation**: Add runtime validation for external data
4. **Documentation**: Document complex types and interfaces

### Visual Testing

1. **Consistent Screenshots**: Disable animations and ensure font loading
2. **Multiple Viewports**: Test responsive behavior
3. **State Coverage**: Capture all visual states
4. **Approval Process**: Review visual changes carefully

## 🎯 Coverage Goals

- **Unit Tests**: > 80% code coverage
- **Hook Tests**: 100% coverage for custom hooks
- **Story Coverage**: All components have stories
- **Accessibility**: 100% compliance with WCAG AA
- **Visual Tests**: All UI states captured
- **Type Safety**: 100% type coverage

## 🔧 Troubleshooting

### Common Issues

1. **Storybook Build Fails**

   ```bash
   # Clear cache and rebuild
   rm -rf node_modules/.cache
   npm run build-storybook
   ```

2. **Visual Tests Failing**

   ```bash
   # Update baselines if changes are intentional
   npm run chromatic -- --auto-accept-changes
   ```

3. **Hook Tests Timing Out**

   ```bash
   # Check for missing act() wrappers or timer mocks
   vi.useFakeTimers()
   ```

4. **Message Validation Errors**
   ```bash
   # Check JSON syntax and key consistency
   npm run validate:messages
   ```

### Getting Help

- 📚 **Storybook Docs**: [storybook.js.org](https://storybook.js.org)
- 🧪 **Vitest Docs**: [vitest.dev](https://vitest.dev)
- 🎭 **RTL Docs**: [testing-library.com](https://testing-library.com)
- 📸 **Chromatic Docs**: [chromatic.com](https://chromatic.com)

---

**Happy Testing! 🚀** Remember: Good tests make good code, and good code makes happy users in the multiverse! 🌌
