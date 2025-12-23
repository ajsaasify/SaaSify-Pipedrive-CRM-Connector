# React Template Project

A modern, scalable React application built with Next.js, featuring a well-structured component architecture and enterprise-ready tooling.

## Architecture Principles

This project follows several key architectural principles to ensure maintainability, scalability, and developer experience:

### 1. Feature-Based Organization

Components are organized by feature rather than file type, keeping related functionality together.

**References:**
- [Feature-Driven Development](https://en.wikipedia.org/wiki/Feature-driven_development)
- [React Folder Structure Best Practices](https://www.robinwieruch.de/react-folder-structure/)

### 2. Co-location Principle

Related files (components, styles, hooks, utilities) are placed in the same directory for better maintainability.

**References:**
- [Colocation by Kent C. Dodds](https://kentcdodds.com/blog/colocation)
- [React File Structure](https://reactjs.org/docs/faq-structure.html)

### 3. Single Responsibility

Each component and module has a clear, focused purpose with minimal dependencies.

### 4. Atomic Design Influence

Components are structured from atomic elements (icons) to complex organisms (layouts).

**References:**
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/table-of-contents/)
- [Atomic Design in React](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97)

### 5. Index File Pattern

Clean imports using `index.tsx` files as entry points for each component directory.

### 6. SOLID Principles

The codebase adheres to [SOLID design principles](https://en.wikipedia.org/wiki/SOLID) for maintainable and extensible code:

- **[Single Responsibility Principle (SRP)](https://en.wikipedia.org/wiki/Single-responsibility_principle)** - Each component, hook, and service has one clear purpose
- **[Open/Closed Principle (OCP)](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)** - Components are open for extension through composition, closed for modification
- **[Liskov Substitution Principle (LSP)](https://en.wikipedia.org/wiki/Liskov_substitution_principle)** - Service implementations can be substituted without breaking functionality
- **[Interface Segregation Principle (ISP)](https://en.wikipedia.org/wiki/Interface_segregation_principle)** - Specific, focused interfaces rather than large, monolithic ones
- **[Dependency Inversion Principle (DIP)](https://en.wikipedia.org/wiki/Dependency_inversion_principle)** - Components depend on abstractions (hooks, stores) not concrete implementations

**References:**
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles in React](https://konstantinlebedev.com/solid-in-react/)
- [React Design Patterns](https://reactpatterns.com/)

### 7. File Naming Consistency

Strict naming conventions ensure predictability and maintainability:

#### **Component Files**
- **Folders** - PascalCase (`Auth/`, `Header/`, `Sidebar/`)
- **Main Component** - Always `index.tsx` as entry point
- **Styles** - Match folder case + `.module.scss` (`Auth.module.scss`)
- **Hooks** - `use` + ComponentName + `.ts` (`useAuth.ts`, `useHeader.ts`)
- **Sub-components** - PascalCase (`LanguageSwitcher.tsx`)

#### **Feature Files**
- **Interfaces** - camelCase + `.interface.ts` (`header.interface.ts`)
- **Enums** - camelCase + `.enum.ts` (`sideNav.enum.ts`)
- **Services** - camelCase + `.service.ts` (`template.service.ts`)
- **Stores** - `use` + FeatureName + `Store.ts` (`useUserStore.ts`)

#### **Utility Files**
- **Hooks** - `use` + FeatureName + `.ts` (`useNavigation.ts`)
- **Utils** - camelCase descriptive (`generateToast.ts`, `url.builder.ts`)
- **Constants** - camelCase descriptive (`appTitle.ts`, `language.ts`)
- **Lib Configs** - camelCase descriptive (`i18n.ts` - third-party setups)

#### **Consistency Rules**
1. **Case Matching** - CSS modules always match their component folder case
2. **Descriptive Names** - File names clearly indicate their purpose
3. **Suffix Conventions** - Use consistent suffixes for file types
4. **No Abbreviations** - Use full, clear names over shortened versions

## Project Structure

### Directory Purpose Guide
- **`component/`** - Reusable UI components with co-located styles and hooks
- **`pages/`** - Next.js routing pages and API endpoints
- **`hooks/`** - Custom React hooks for shared logic
- **`utils/`** - Pure utility functions and helper classes
- **`lib/`** - Third-party library configurations and setups
- **`services/`** - API service classes and HTTP client logic
- **`store/`** - Zustand state management stores
- **`interface/`** - TypeScript type definitions and interfaces
- **`enum/`** - TypeScript enums for constants
- **`context/`** - React context providers
- **`common/`** - Shared constants and configuration objects
- **`styles/`** - Global styles and theme definitions

```
src/
├── component/                    # Reusable UI components
│   ├── Auth/                    # Authentication components
│   │   ├── index.tsx
│   │   ├── Auth.module.scss
│   │   └── useAuth.ts
│   ├── Header/                  # Header with user controls
│   │   ├── index.tsx
│   │   ├── Header.module.scss
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   └── useHeader.ts
│   ├── SideBar/                 # Navigation sidebar
│   │   ├── index.tsx
│   │   └── SideBar.module.scss
│   │   └── useSideBar.ts
│   └── icons/                   # SVG icon components
│       ├── index.ts
│       └── SignoutIcon.tsx
├── common/                      # Shared constants and configurations
│   ├── appTitle.ts                 # Application titles
│   ├── language.ts                 # Language configurations
│   ├── preFetch.ts                 # Route prefetch paths
│   ├── sideMenu.ts                 # Navigation menu structure
│   └── themeSwitcher.ts            # Available theme configurations
├── context/                     # React context providers
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
├── enum/                        # TypeScript enums
│   ├── request.enum.ts
│   ├── service.enum.ts
│   └── sideBar.enum.ts
├── hooks/                       # Custom React hooks
│   ├── useNavigation.ts            # Router navigation with prefetch
│   ├── useStoredTheme.ts           # Theme persistence (SSR-safe)
│   ├── useStoredLanguage.ts        # Language persistence (SSR-safe)
│   ├── useThemeState.ts            # Theme state management
│   └── useLanguageState.ts         # Language state management
├── interface/                   # TypeScript interfaces
│   ├── authOption.interface.ts
│   ├── header.interface.ts
│   ├── sideBar.interface.ts
│   ├── store.interface.ts
│   ├── url.builder.interface.ts
│   ├── userData.interface.ts
│   └── userIcon.interface.ts
├── Layout/                      # Layout components
│   ├── index.tsx
│   └── Layout.module.scss
├── lib/                         # Third-party library configurations
│   └── i18n.ts
├── pages/                       # Next.js pages (routing)
│   ├── dashboard/
│   ├── login/
│   └── _app.tsx
├── services/                    # API service functions
│   ├── httpClient.service.ts       # HTTP client with interceptors
│   └── template.service.ts         # Template-specific API calls
├── store/                       # Zustand state management
│   └── useUserStore.ts
├── styles/                      # Global styles and themes
│   └── globals.scss
└── utils/                       # Helper functions and utilities
    ├── pattern/
    │   └── email.regex.ts          # Email validation patterns
    ├── generateToast.ts            # Toast notification helper
    ├── parseArray.ts               # Array parsing utilities
    ├── storage.ts                  # LocalStorage wrapper (SSR-safe)
    ├── themeLoader.ts              # Dynamic theme loading
    ├── isBrowser.ts                # Browser environment detection
    └── url.builder.ts              # URL construction helper
```

## Technology Stack & Rationale

### Core Framework

- **[Next.js 15](https://nextjs.org/)** - Full-stack React framework with SSR, routing, and optimization
  - [Documentation](https://nextjs.org/docs) | [Learn Next.js](https://nextjs.org/learn)
- **[React 19](https://react.dev/)** - Latest React with concurrent features and improved performance
  - [React Docs](https://react.dev/learn) | [React 19 Features](https://react.dev/blog/2024/04/25/react-19)
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better developer experience
  - [TypeScript Handbook](https://www.typescriptlang.org/docs/) | [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### State Management

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight, simple state management
  - [Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) | [GitHub](https://github.com/pmndrs/zustand)
  - Minimal boilerplate compared to Redux
  - Excellent TypeScript support
  - No providers needed, direct store access
  - Perfect for small to medium applications

### UI & Styling

- **[PrimeReact](https://primereact.org/)** - Enterprise-grade component library
  - [Documentation](https://primereact.org/installation/) | [Showcase](https://primereact.org/showcase/)
  - Comprehensive component set
  - Built-in accessibility features
  - Theming system with CSS variables
  - Professional design out of the box

- **[SCSS](https://sass-lang.com/)** - Enhanced CSS with variables, nesting, and mixins
  - [Documentation](https://sass-lang.com/documentation/) | [CSS Modules Guide](https://github.com/css-modules/css-modules)
  - CSS Modules for component-scoped styles
  - Better organization than plain CSS
  - Powerful preprocessing features

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid development
  - [Documentation](https://tailwindcss.com/docs) | [Playground](https://play.tailwindcss.com/)

### Data Fetching

- **[SWR](https://swr.vercel.app/)** - Data fetching with caching, revalidation, and error handling
  - [Documentation](https://swr.vercel.app/docs/getting-started) | [Examples](https://swr.vercel.app/examples/basic)
  - Automatic caching and background updates
  - Built-in error and loading states
  - Optimistic updates and mutations
  - Better UX with stale-while-revalidate strategy

### Internationalization

- **[react-i18next](https://react.i18next.com/)** - Internationalization framework
  - [Documentation](https://react.i18next.com/getting-started) | [i18next Docs](https://www.i18next.com/)
  - Dynamic language switching
  - Namespace organization
  - Lazy loading of translations
  - Pluralization and interpolation support

### HTTP Client

- **[Axios](https://axios-http.com/)** - Promise-based HTTP client with custom service layer
  - [Documentation](https://axios-http.com/docs/intro) | [GitHub](https://github.com/axios/axios)
  - Request/response interceptors for authentication and error handling
  - Automatic JSON parsing and offline detection
  - Centralized API service architecture
  - Type-safe request/response handling

### Development Tools

- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
  - [Documentation](https://biomejs.dev/guides/getting-started/) | [Configuration](https://biomejs.dev/reference/configuration/)
  - Faster than ESLint + Prettier combination
  - Single tool for linting and formatting
  - Better performance and consistency

## Recent Improvements & Optimizations

### SSR & Hydration Fixes
- **Fixed hydration mismatches** - Eliminated server/client rendering inconsistencies
- **Browser-safe hooks** - All localStorage/browser APIs properly guarded with `isBrowser()` checks
- **Client-side state tracking** - Components render consistently across SSR and client hydration
- **Performance optimization** - Reduced initial page load flashes and console errors

### Theme System Enhancements
- **Centralized theme configuration** - Single source of truth in `themeSwitcher.ts`
- **Dynamic theme loading** - Improved performance with default theme preloading
- **Fallback handling** - Graceful degradation when themes fail to load
- **Type-safe theme switching** - Full TypeScript support for theme operations

### Code Quality Improvements
- **Service layer refactoring** - Renamed `api.service.ts` to `httpClient.service.ts` for clarity
- **Consistent naming conventions** - Aligned all file names with project standards
- **Removed unused code** - Cleaned up middleware and simplified component logic
- **Enhanced error handling** - Better error boundaries and user feedback

### Architecture Optimizations
- **Prefetch integration** - Automatic route prefetching for better navigation performance
- **Context provider optimization** - Reduced re-renders with proper memoization
- **Hook composition** - Better separation of concerns in custom hooks
- **Import organization** - Cleaner import statements and dependency management

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Key Features

- **Responsive Design** - Mobile-first approach with PrimeReact components
- **Theme Support** - Dynamic theme switching with centralized configuration
- **Internationalization** - Multi-language support with SSR-safe implementation
- **Type Safety** - Full TypeScript coverage with strict configuration
- **Performance** - Optimized with Next.js SSR and hydration-safe components
- **Accessibility** - WCAG compliant components and proper ARIA labels
- **Developer Experience** - Hot reload, fast linting, and consistent formatting
- **SSR Compatibility** - Hydration-safe components with proper browser detection

## Code Quality Standards

### SOLID Principles Implementation

- **Components** - Extract business logic into custom hooks (SRP)
- **Interfaces** - Create specific, focused interfaces (ISP)
- **Services** - Separate concerns (Auth vs User services)
- **Hooks** - Single responsibility for state and side effects
- **Composition** - Prefer composition over inheritance

### Example Structure

```typescript
// ✅ Good - Single responsibility
const useHeader = () => {
  // Only header-related logic
};

// ✅ Good - Focused interface
interface UserButtonProps {
  className: string;
  onClick: (event: React.MouseEvent) => void;
  children: React.ReactNode;
}

// ✅ Good - Specific service
interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
}
```

## File Naming Standards

### Naming Convention Examples

#### ✅ **Correct Patterns**
```
Auth/
├── index.tsx                    # Main component export
├── Auth.module.scss            # Matches folder case
├── useAuth.ts                  # Component-specific hook
└── AuthForm.tsx               # Sub-component (if needed)

interface/
├── auth.interface.ts           # Feature interfaces
├── user.interface.ts           # Clear, descriptive names
└── api.interface.ts           # Grouped by domain

store/
├── useUserStore.ts            # Feature-specific store
├── useAuthStore.ts            # Clear responsibility
└── useThemeStore.ts           # Single concern
```

#### ❌ **Incorrect Patterns**
```
auth/                          # Should be PascalCase
├── index.tsx
├── auth.scss                  # Missing .module, wrong case
└── hooks.ts                   # Too generic

interface/
├── user.ts                    # Missing .interface suffix
└── types.ts                   # Too generic

store/
├── counter.ts                 # Doesn't match actual usage
└── globalStore.ts             # Too broad, violates SRP
```

### Folder Organization Rules
- **Feature-based grouping** - Related files stay together
- **Index files** - Always use `index.tsx` for main component exports
- **Co-location** - Styles, hooks, and components in same directory
- **Consistent depth** - Avoid deeply nested folder structures
- **Case consistency** - File names match their folder case
- **Predictable patterns** - Developers can find files without searching

### Benefits of This Structure
- **Developer Velocity** - No time wasted searching for files
- **Onboarding Speed** - New developers understand patterns immediately
- **Refactoring Safety** - Consistent imports reduce breaking changes
- **Scalability** - Pattern works for projects of any size
- **Tool Integration** - IDEs and build tools work better with consistent naming
- **Code Reviews** - Easier to spot inconsistencies and violations

## Contributing

1. **Follow naming conventions** - Use the exact patterns above
2. **Maintain folder structure** - Keep related files together
3. **Use TypeScript** - All new files must be TypeScript
4. **Apply SOLID principles** - Single responsibility, focused interfaces
5. **Extract business logic** - Use custom hooks for component logic
6. **Create specific interfaces** - Avoid large, monolithic interfaces
7. **Add accessibility** - Include proper ARIA labels and attributes
8. **Use CSS modules** - Component-scoped styling only
9. **Test SSR compatibility** - Ensure components work with server-side rendering
10. **Run quality checks** - `npm run lint` and `npm run format` before commits

## Deployment

Deploy easily on [Vercel](https://vercel.com/new) or any platform supporting Next.js applications.

- [Vercel Deployment Guide](https://nextjs.org/docs/deployment)
- [Next.js Deployment Options](https://nextjs.org/docs/pages/building-your-application/deploying)

## References & Further Reading

### Architecture & Design Patterns
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Design Patterns](https://reactpatterns.com/)
- [Component Driven Development](https://www.componentdriven.org/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)

### React Best Practices
- [React Official Documentation](https://react.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Kent C. Dodds Blog](https://kentcdodds.com/blog) - React patterns and best practices
- [React Folder Structure](https://www.robinwieruch.de/react-folder-structure/)

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)

### Code Quality & Standards
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code Principles](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29)
- [JavaScript Style Guide by Airbnb](https://github.com/airbnb/javascript)
- [TypeScript Style Guide](https://ts.dev/style/)

### Tools & Libraries
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [PrimeReact Components](https://primereact.org/showcase/)
- [SWR Data Fetching](https://swr.vercel.app/)
- [react-i18next Guide](https://react.i18next.com/getting-started)
- [Biome Toolchain](https://biomejs.dev/)
