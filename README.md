# Pastebin-Lite

A minimal, resilient Pastebin-like application built with Next.js and PostgreSQL.

## Features

- **Create Pastes**: Share arbitrary text.
- **Constraints**: Set Time-to-Live (TTL) and Maximum View Counts.
- **Persistence**: Data is stored reliably in PostgreSQL.
- **Resilience**: Handles high traffic and edge cases gracefully.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Validation**: Zod
- **Styling**: Tailwind CSS

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd pastebin-lite
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Database:**
    - Ensure you have a PostgreSQL database running.
    - Copy `.env.example` to `.env` (or create `.env`) and set the `DATABASE_URL`:
      ```env
      DATABASE_URL="postgresql://user:password@localhost:5432/pastebin_lite?schema=public"
      ```

4.  **Run Migrations:**
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

6.  **Verify:**
    - Visit `http://localhost:3000` to create a paste.
    - Check `/api/healthz` for system status.

## Testing

For automated testing with deterministic time:
- Set `TEST_MODE=1` in your environment.
- Send requests with `x-test-now-ms` header to simulate time travel.

## Persistence

This project uses **PostgreSQL** for persistence to ensure data durability and consistency across requests. Redis was considered for TTL but Postgres handles relational data and ACID compliance better for this use case, and TTL can be efficiently indexed.
# Pastebin
