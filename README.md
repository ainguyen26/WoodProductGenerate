# Backend WoodProductGenerate

Backend NodeJS + TypeScript + Express cho he thong sinh ma hang go cong thuc:

`R + AA + BBB + CC + D + EEEE + FF + GG + HH`

## Chay local

1. Tao database PostgreSQL, vi du bang Docker:

```bash
docker compose up -d
```

2. Copy `.env.example` thanh `.env` va sua `DATABASE_URL` neu can.
3. Cai dependencies va chay dev server:

```bash
npm install
npm run dev
```

API mac dinh chay tai `http://localhost:4000`.

Migration nam tai `migrations/001_init.sql`; Docker se tu chay file nay khi volume database duoc tao lan dau.

## API

- `GET /health`
- `GET /api/options`
- `POST /api/product-codes/generate`

Body mau:

```json
{
  "aa": "1",
  "bbb": "A01",
  "cc": "E1",
  "d": "M",
  "eeee": "1",
  "ff": "DM",
  "gg": "01",
  "hh": "01"
}
```
