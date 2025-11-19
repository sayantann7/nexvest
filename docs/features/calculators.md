# Calculators Feature

The calculators feature provides a set of financial calculators (SIP, EMI, PPF, NPS, etc.).

## Structure

- `components/calculators/*` – UI components for each calculator.
- `features/calculators/logic/*` – Pure TypeScript functions implementing calculator formulas.

## Guidelines

- All new calculator math should live in `features/calculators/logic/*`.
- UI components should only handle inputs, validation, and rendering.
- Add unit tests for new logic functions under `features/calculators/logic/__tests__`.
