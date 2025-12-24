# SaaSify Pipedrive CRM Connector

This is a [Next.js](https://nextjs.org/) project.

## Run Locally

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build and Deployment

To create a production build of the application:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This compiles the application for production usage.

After building, you can start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

### Vercel Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## CI/CD Commands

For Continuous Integration/Continuous Deployment (CI/CD) pipelines, you should run the following commands to ensure code quality and build stability:

### Install Dependencies

For CI environments, it is recommended to use `npm ci` (Clean Install) instead of `npm install`. This ensures that the exact versions of dependencies specified in `package-lock.json` are installed and provides a clean, reproducible build.

```bash
npm ci
```

### Linting

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

To check for linting errors:

```bash
npm run lint
```

To automatically format the code:

```bash
npm run format
```

### Build Verification

Ensure the project builds correctly without errors:

```bash
npm run build
```
