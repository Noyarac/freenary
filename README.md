# Freenary

A financial assets manager, which saves your data to a SQLite file (the file is automatically created if it doesn't exist).

## Getting Started

Optional: copy `.env.example` to `.env` and fill it with the environment variables

Install the dependancies:

```bash
bun i
```

Run the migrations:

```bash
bun run migration:run
```

Run the development server ...

```bash
bun run dev
```

... or build the project and start it:
```bash
bun run build
bun run start
```

## Environment variables
- DB_PATH: string, optional, the path to your .sqlite file.

## Migration generation
```bash
bun run migration:generate
```
