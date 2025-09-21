# 🚀 Rick and Morty Character Explorer

A responsive and polished front-end application built with Next.js, TypeScript, Tailwind CSS, Hero UI, and Apollo Client. This application fetches and displays paginated character data from the Rick and Morty GraphQL API with advanced search, filtering, and detail viewing capabilities.

![Rick and Morty Explorer](https://img.shields.io/badge/Rick%20and%20Morty-Multiverse%20Explorer-08C952?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)
![Hero UI](https://img.shields.io/badge/Hero%20UI-2.4.22-purple?style=for-the-badge)
![Apollo Client](https://img.shields.io/badge/Apollo%20Client-3.14.0-pink?style=for-the-badge&logo=apollo-graphql)

## 🎯 Features

### Core Features (Technical Test Requirements)

- ✅ **Search Interface** - Debounced search with real-time filtering
- ✅ **Paginated Table** - Responsive table with navigation controls
- ✅ **Detail Drawer** - Side drawer with comprehensive character information
- ✅ **Responsive Design** - Clean layout across mobile, tablet, and desktop

### Advanced Features (Beyond Requirements)

- 🔍 **Advanced Filtering** - Filter by status, gender, and species
- 🎨 **Rick and Morty Theming** - Custom color scheme and branding
- 🌐 **Internationalization** - Multi-language support (English, German, French)
- 🌙 **Theme Switching** - Light and dark mode support
- ♿ **Accessibility** - Full keyboard navigation and screen reader support
- 🛡️ **Error Boundaries** - Graceful error handling with themed messages
- ⚡ **Performance** - Apollo Client cache persistence and optimized queries
- 🔗 **URL State Management** - Shareable URLs with search and filter state

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.3 (App Router)
- **Language:** TypeScript 5.9.2
- **Styling:** Tailwind CSS 4.1.13 + Hero UI 2.4.22
- **GraphQL Client:** Apollo Client 3.14.0
- **API:** [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql)
- **State Management:** URL-based state with custom hooks
- **Testing:** Vitest + React Testing Library + Playwright
- **Development:** ESLint + Prettier + Storybook

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd rick-et-morty
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking

# Testing
npm run test         # Run unit tests with Vitest
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run e2e          # Run E2E tests with Playwright
npm run e2e:ui       # Run E2E tests with UI

# Storybook
npm run storybook    # Start Storybook development server
npm run build-storybook # Build Storybook for production

# GraphQL
npm run codegen      # Generate GraphQL types
npm run codegen:watch # Watch mode for GraphQL codegen
```

## 🏗️ Project Structure

```
rick-et-morty/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── not-found.tsx            # Custom 404 page
│   └── providers.tsx            # Apollo Client and theme providers
├── components/                   # React components
│   ├── CharacterTable.tsx       # Main character table component
│   ├── CharacterTableContainer.tsx # Smart container with data fetching
│   ├── CharacterDetailDrawer.tsx # Character detail drawer
│   ├── ErrorBoundary.tsx        # Error boundary components
│   ├── LoadingStates.tsx        # Loading state components
│   └── AccessibilityEnhancements.tsx # Accessibility utilities
├── hooks/                        # Custom React hooks
│   ├── useDebouncedCallback.ts  # Debounced callback hook
│   ├── useTableUrlState.ts      # URL state management hook
│   └── useKeyboardNavigation.ts # Keyboard navigation hook
├── lib/                          # Utility libraries
│   ├── apollo-client.ts         # Apollo Client configuration
│   └── graphql/                 # GraphQL queries and mutations
├── messages/                     # Internationalization files
│   ├── en.json                  # English translations
│   ├── de.json                  # German translations
│   └── fr.json                  # French translations
├── styles/                       # Global styles
├── tests/                        # Test files
│   ├── unit/                    # Unit tests
│   └── e2e/                     # E2E tests
└── stories/                      # Storybook stories
```

## 🎨 Design System

### Color Palette

The application uses a custom Rick and Morty inspired color scheme:

- **Portal Green:** `#08C952` - Primary actions and highlights
- **Rick Yellow:** `#FCE46D` - Secondary elements and accents
- **Rick Red:** `#A1140A` - Danger states and warnings
- **Space Purple:** `#160440` - Dark theme backgrounds

### Typography

- **Primary Font:** Inter (system font stack)
- **Mono Font:** JetBrains Mono for code elements

### Components

Built with Hero UI components for consistency and accessibility:

- Tables with sorting and filtering
- Drawers and modals
- Buttons and form controls
- Loading states and skeletons
- Error boundaries and alerts

## 🔧 Technical Decisions

### Architecture Choices

**1. Component Architecture**

- **Container/Presentational Pattern:** Separated data fetching (`CharacterTableContainer`) from presentation (`CharacterTable`)
- **Custom Hooks:** Extracted reusable logic into custom hooks (`useDebouncedCallback`, `useTableUrlState`)
- **Error Boundaries:** Implemented at multiple levels for graceful error handling

**2. State Management**

- **URL-Based State:** All search, filter, and pagination state is stored in URL parameters
- **Benefits:** Shareable URLs, browser back/forward support, state persistence on refresh
- **Implementation:** Custom `useTableUrlState` hook with Next.js router integration

**3. GraphQL Integration**

- **Apollo Client:** Chosen for its excellent React integration and caching capabilities
- **Cache Persistence:** Implemented localStorage persistence for offline capability
- **Optimistic Updates:** Immediate UI updates with debounced API calls

### Performance Optimizations

**1. Search Debouncing**

- **Implementation:** 500ms debounce delay to reduce API calls
- **User Experience:** Immediate UI updates with delayed API requests
- **Performance:** Reduced server load and improved responsiveness

**2. Cache Strategy**

- **Apollo Cache:** Intelligent caching with type policies
- **Pagination Merging:** Seamless pagination with cached results
- **Filter Separation:** Different cache entries for different filter combinations

**3. Code Splitting**

- **Dynamic Imports:** Lazy loading of non-critical components
- **Bundle Optimization:** Optimized package imports for Hero UI

### Accessibility Features

**1. Keyboard Navigation**

- **Shortcuts:** Ctrl+K for search, Escape to close modals, Alt+1 for main content
- **Focus Management:** Proper focus trapping in modals and drawers
- **Tab Order:** Logical tab sequence throughout the application

**2. Screen Reader Support**

- **ARIA Labels:** Comprehensive labeling for all interactive elements
- **Live Regions:** Dynamic announcements for search results and state changes
- **Semantic HTML:** Proper use of semantic elements and roles

**3. Visual Accessibility**

- **Color Contrast:** WCAG AA compliant color combinations
- **Focus Indicators:** Clear visual focus indicators
- **Responsive Design:** Accessible across all device sizes

## 🌐 Internationalization

The application supports multiple languages with next-intl:

- **English (en)** - Default language
- **German (de)** - Full translation
- **French (fr)** - Full translation

Language switching is available in the header with persistent user preference.

## 🧪 Testing Strategy

### Unit Testing

- **Framework:** Vitest with React Testing Library
- **Coverage:** Components, hooks, and utilities
- **Mocking:** MSW for GraphQL API mocking

### E2E Testing

- **Framework:** Playwright
- **Scenarios:** User workflows, search, pagination, filtering
- **Cross-browser:** Chrome, Firefox, Safari testing

### Visual Testing

- **Storybook:** Component documentation and visual testing
- **Chromatic:** Visual regression testing (optional)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

No environment variables required - the application uses the public Rick and Morty GraphQL API.

### Deployment Platforms

The application can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Railway
- Docker containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Assumptions & Decisions

### Technical Assumptions

- **API Reliability:** Assumed the Rick and Morty API is stable and available
- **Browser Support:** Modern browsers with ES2020+ support
- **Network Conditions:** Optimized for both fast and slow connections

### Design Decisions

- **Mobile-First:** Responsive design starting from mobile breakpoints
- **Progressive Enhancement:** Core functionality works without JavaScript
- **Performance Budget:** Optimized for Core Web Vitals

### User Experience Decisions

- **Immediate Feedback:** UI updates instantly, API calls are debounced
- **Error Recovery:** Graceful error handling with retry mechanisms
- **Accessibility First:** Built with accessibility in mind from the start

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Rick and Morty API](https://rickandmortyapi.com/) for providing the GraphQL endpoint
- [Hero UI](https://heroui.com/) for the beautiful component library
- [Next.js](https://nextjs.org/) for the excellent React framework
- [Apollo GraphQL](https://www.apollographql.com/) for the powerful GraphQL client

---

**Built with ❤️ and a lot of ☕ by a developer who appreciates good architecture and user experience.**
