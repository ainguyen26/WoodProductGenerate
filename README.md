# Backend WoodProductGenerate

Backend NodeJS + TypeScript + Express cho he thong sinh ma hang go cong thuc:

`R + AA + BBB + CC + D + EEEE + FF + GG + HH`

## Chay local

1. Tao database PostgreSQL local:

- Host: `localhost`
- Port: `5432`
- Database: `wood_product_generate`
- User: `postgres`
- Password: `postgres`

2. Copy `.env.example` thanh `.env` va sua `DATABASE_URL` neu can.
3. Cai dependencies, setup database va chay dev server:

```bash
npm install
npm run db:setup
npm run dev
```

API mac dinh chay tai `http://localhost:4000`.

Migration nam tai `migrations/*.sql`; lenh `npm run db:setup` se tao bang va seed data.

Bang EEEE dang co cau truc theo file quy tac:

- `code`: Ma quy uoc EEEE
- `name`: Ma mau NCC
- `surface_material_code`: D
- Ten D duoc lay bang cach join `surface_material_code` sang bang D

Import EEEE tu CSV/TSV gom cac cot `Ma quy uoc`, `Ma mau NCC`, `D`, `TenD`:

```bash
npm run db:import-eeee -- ./data/eeee.csv
```

Project da kem san `data/EEEE.csv` va migration `002_seed_eeee.sql`, nen `npm run db:migrate` se seed EEEE tu dong.

## API

- `GET /health`
- `GET /api/options`
- `POST /api/product-codes/generate`
- `POST /api/product-codes/search`

Body mau:

```json
{
  "aa": "EV",
  "bbb": "M01",
  "cc": "E1",
  "d": "M",
  "eeee": "1",
  "ff": "DM",
  "gg": "01",
  "hh": "01"
}
```

Voi endpoint `/api/product-codes/search`, gui chuoi rong `""` cho segment nao thi segment do duoc xem la `Tat ca` va se tim tat ca gia tri dang active trong bang tuong ung.
