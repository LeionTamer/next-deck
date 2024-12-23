## Run locally

First time with the app, you will need to run node installation

```bash
npm install
```

To run locally, you would need to run the dev script

```bash
npm run dev
```

## Getting Started

Install the nextjs app with preferred settings

```bash
npx create-next-app@latest
```

Tanstack query would be the way we call the server components

```bash
npm install @tanstack/react-query
```

We need to wrap our application with a queryClient provider to allow the use of the tanstack queries

<details>
<summary>create a new file `app/components/providers.tsx`</summary>

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type IProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: IProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
```

</details>

<br />

In the app layout, wrap the body of the application

<details>
<summary>
Changes in the `app/layout.tsx`
</summary>

```typescript
<html lang="en">
  <Providers>
    <body>{children}</body>
  </Providers>
</html>
```

</details>

<br />

Install the deck-gl and react-map-gl and maplibre to use DeckGL for NextJS

```bash
npm install deck.gl --save
npm install react-map-gl maplibre-gl
```

Install node-postgres to use postgres

```bash
npm install pg
npm i --save-dev @types/pg
```

Create a database connection string and use it in the `DATABASE_URL` environment

```
DATABASE_URL=postgres://{user}:{password}@{hostname}:{port}/{database-name}
```

Setup a Postgres pool connection

<details>
<summary>
Create a `lib/postgres.ts` file
</summary>

```typescript
import { Pool } from 'pg'

let pgPool

if (!pgPool) {
  pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
}

export default pgPool as Pool
```

</details>

### Shadcn UI library

Install the initalisation package

```bash
npx shadcn@latest init -d
```

Install the components

```bash
npx shadcn@latest add button command select

```

## Optional DX libraries

### prettier-eslint package and configuration

Install the prettier-eslint package and add the configuration file to format the codes

```bash
npm install --save-dev prettier-eslint
```

Add the configuration file for prettier

<details>
<summary>
Create a `.prettierrc` file</summary>

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

</details>

<br/>

### Tailwindcss extension for prettier

Install the tailwind-prettier extension to sort your tailwind classes

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Update the `.prettierrc` file with the addition of

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
