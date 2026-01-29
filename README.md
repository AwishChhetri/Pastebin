# Pastebin-Lite

A minimal, resilient Pastebin-like application built with Next.js and PostgreSQL.

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

</div>

## Features

- **Create Pastes**: Share arbitrary text with syntax highlighting options.
- **Constraints**: Set Time-to-Live (TTL) and Maximum View Counts.
- **Persistence**: Data is stored reliably in PostgreSQL.
- **Resilience**: Handles high traffic and edge cases gracefully.
- **Responsive Design**: Modern UI that works on desktop and mobile.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Project Structure

```bash
.
├── app/                  # Next.js App Router pages and layouts
│   ├── api/              # API routes
│   ├── p/[id]/           # Paste view page
│   └── page.tsx          # Main create paste page
├── components/           # Reusable UI components
├── lib/                  # Utilities, types, and database clients
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/agnitha.git
    cd agnitha
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Database:**
    - Copy `.env.example` to `.env` (or create `.env`):
      ```bash
      cp .env.example .env
      ```
    - Set the `DATABASE_URL` in `.env`:
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

## Persistence Decisions

This project uses **PostgreSQL** for persistence to ensure data durability and consistency across requests. Redis was considered for TTL but Postgres handles relational data and ACID compliance better for this use case, and TTL can be efficiently indexed.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
