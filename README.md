# Freenary

A financial assets manager, which saves your data to a SQLite file (the file is automatically created if it doesn't exist).

## Getting Started

Optional: copy `.env.example` to `.env` and fill it with the environment variables

Install the dependancies:

```bash
pnpm i
```

Run the migrations:

```bash
pnpm migration:run
```

Run the development server:

```bash
pnpm dev
```

## Environment variables
- DB_PATH: string, optional, the path to your .sqlite file.
