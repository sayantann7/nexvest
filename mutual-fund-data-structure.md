# Mutual Fund JSON — Field Inventory (Executable Spec)

**Purpose:** concise, machine-friendly inventory of every field in the provided mutual-fund JSON. Use this as documentation, input for schema generation, or a developer contract.

---

## Top-level
- **Type:** `object`
- **Properties:**
  - `basic_info` — *object*
  - `nav_info` — *object*
  - `returns` — *object*
  - `expense_ratio` — *object*
  - `exit_load` — *array* of objects
  - `investment_info` — *object*
  - `fund_house` — *object*
  - `additional_info` — *object*
  - `holdings` — *array* of objects

---

## 1) `basic_info` (object)
- `fund_name`: `string`  
- `category`: `string`  
- `risk_level`: `string`  
- `plan_type`: `string`  
- `scheme_type`: `string`  
- `inception_date`: `string` (sample format: `DD-MMM-YYYY`)  
- `benchmark`: `string`  
- `benchmark_name`: `string`  
- `fund_size`: `number`  
- `fund_manager`: `string`  
- `registrar_agent`: `string`  
- `face_value`: `number | null`  
- `nfo_risk`: `string`

---

## 2) `nav_info` (object)
- `current_nav`: `number`  
- `nav_date`: `string` (sample format: `DD-MMM-YYYY`)

---

## 3) `returns` (object)
- `absolute` — object (period → `number`):
  - `1d`, `1w`, `1m`, `3m`, `6m`, `1y`, `3y`, `5y`, `10y`: `number`
- `cagr` — object:
  - `3y`, `5y`, `10y`, `since_inception`: `number`
- `category_returns` — object:
  - `3m`, `6m`, `1y`, `3y`, `5y`: `number`
- `index_returns` — object:
  - `1y`, `3y`, `5y`: `number`
- `risk_metrics` — object:
  - `alpha`: `number`
  - `beta`: `number`
  - `sharpe_ratio`: `number`
  - `sortino_ratio`: `number`
  - `standard_deviation`: `number`
  - `risk_rating`: `number` (integer in sample)

---

## 4) `expense_ratio` (object)
- `current`: `number`
- `history`: array of **expense history entry** (object)
  - `ratio`: `number`
  - `date`: `string` (ISO `YYYY-MM-DDTHH:MM:SS` in sample)
  - `turnover_ratio`: `number | null`

> Notes: `history` is a time-series. Many `turnover_ratio` values are `null`; some are integers representing percentage or days (source dependent).

---

## 5) `exit_load` (array)
- Each entry (object):
  - `description`: `string`
  - `as_on_date`: `string` (ISO datetime)

---

## 6) `investment_info` (object)
- `minimum_sip`: `number`
- `maximum_sip`: `number`
- `minimum_lumpsum`: `number`
- `maximum_lumpsum`: `number | null`
- `stamp_duty`: `string` (human-readable)
- `sip_multiplier`: `number`
- `mini_additional_investment`: `number`

---

## 7) `fund_house` (object)
- `name`: `string`
- `amc_code`: `string | null`
- `rta_name`: `string`
- `custodian`: `string`
- `address`: `string`
- `email`: `string`
- `website`: `string`

---

## 8) `additional_info` (object)
- `isin`: `string`
- `fund_type`: `string | null`
- `sid_url`: `string` (URL)
- `is_closed_ended`: `boolean`
- `closure_date`: `string | null`
- `crisil_rating`: `string | null`
- `rta_scheme_code`: `string`
- `super_category`: `string`
- `sub_category`: `string`
- `description`: `string`
- `analysis`: array of **analysis entries**:
  - `scheme_code`: `string`
  - `analysis_type`: `string`
  - `analysis_subject`: `string`
  - `analysis_desc`: `string`
  - `analysis_data`: `string`
  - `rating`: `number | null`

---

## 9) `holdings` (array of objects)
Each holding:
- `company_name`: `string`
- `nature_name`: `string` (e.g., `EQ`, `Debt`, `Others`)
- `sector_name`: `string | null`
- `instrument_name`: `string` (e.g., `Equity`, `Futures`, `Mutual Fund`, `GOI Sec`, `T-Bills`, `Pref. Shares`)
- `market_value`: `number`
- `corpus_percentage`: `number`

> Notes: holdings include equities, futures, mutual funds, government securities and T-bills. `sector_name` can be `null` (e.g., for ETFs).

---

## Nullability & date formats — quick checklist
- Nullable fields observed: `face_value`, `amc_code`, multiple `turnover_ratio` entries, `maximum_lumpsum`, `fund_type`, `closure_date`, `crisil_rating`, some `sector_name`.
- Date formats inconsistent:
  - Some top-level fields use `DD-MMM-YYYY` (e.g., `16-Sep-2025`).
  - Time-series use ISO `YYYY-MM-DDTHH:MM:SS`.
  - Recommendation: normalize to ISO `YYYY-MM-DD` or full ISO `YYYY-MM-DDTHH:MM:SSZ` before programmatic processing.
- Numeric fields: `number` (floats/doubles) for all financial quantities.

---

## Implementation hints (practical)
- Model `expense_ratio.history` entries as `{ ratio: number, date: string (ISO), turnover_ratio?: number | null }`.
- Create reusable types for `Holding`, `ExpenseHistoryEntry`, `AnalysisEntry`.
- When generating a JSON Schema or TypeScript types, validate date strings with a `format: "date-time"` or custom regex for `DD-MMM-YYYY` if preserving original format.
- If integrating into a database, store dates in `DATE`/`TIMESTAMP` and monetary values as `DECIMAL` to avoid precision loss.

---

## TL;DR (for engineers)
This document enumerates all keys, their types, and which values can be `null`. It's trimmed for machine input into schema generators and codegen tools. Normalize dates and treat all money/ratios as decimals.

