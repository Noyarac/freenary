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
bun migration:run
```

Run the development server:

```bash
bun dev
```

## Environment variables
- DB_PATH: string, optional, the path to your .sqlite file.


## API endpoints
### GET /api/investment
    - Parameters
        - id: optionnal, one or more ids (comma separated). If none are provided, returns all.
        - mode: optionnal, either `"basic"` or `"details"`. Default: `"basic"`
    - Returns a list of investmentDTO
