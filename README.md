# Güd Vector public website (rebuild)

Marketing frontend for [gudvector.com](https://gudvector.com).

- **Do not** point production DNS/Vercel at this repo until Cameron signs off on cutover.
- Live production still deploys from Cursor Origin `cameron-koutz/tmp-e9b7b4e7dd738742`.
- Do **not** overwrite `ckoutz/gud-vector-agent-suite` (Python/GVAS backend).
- `/portal` is a noindex route that must hit the existing backend. Do not reimplement GVAS.

Research and brand assets for the rebuild are in `docs/` and `public/brand/`.
