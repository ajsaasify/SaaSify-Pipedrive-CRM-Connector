# SaaSify Pipedrive CRM Connector

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

## CI/CD & Deployment

### Build Pipeline

For any CI/CD provider (GitHub Actions, GitLab CI, Jenkins, etc.), the standard pipeline steps are:

1.  **Install Dependencies**
    ```bash
    npm ci
    ```
2.  **Linting & Formatting Checks**
    ```bash
    npm run lint
    # Check formatting without writing
    npx biome check src
    ```
3.  **Build Application**
    ```bash
    npm run build
    ```

### Environment Variables

Ensure dependencies are installed and environment variables are properly configured in your CI/CD settings.

### Deployment Options

#### Vercel (Recommended)

This project is optimized for Vercel. Connect your repository to Vercel and it will automatically detect the Next.js settings.

#### Custom Server

To deploy as a Node.js server:

1.  Build the project: `npm run build`
2.  Start the server: `npm start`

#### Static Export

If static export is needed, update `next.config.ts` to include `output: 'export'` and run `npm run build`.
