# Supabase Backend Configuration

This document captures the backend setup that now exists in Supabase for the Scope ISM Dashboard. Use it as the canonical reference when connecting the frontend or when provisioning a fresh instance of the project.

## Overview

The Supabase project has been fully provisioned with tables, relationships, policies, helper views, and functions aligned with the product requirements. The Google Sheets import script in `scripts/importFromSheets.ts` writes directly into the `ventas` table described below.

## Enumerated Types

The following enums are created in the public schema:

- `estado_vendedor`: `activo`, `inactivo`
- `estado_servicio`: `activo`, `mora`, `desconectado`
- `estado_pago`: `pendiente`, `pagado`
- `tipo_paquete`: `oneplay`, `doubleplay`, `tripleplay`, `full`
- `tecnologia`: `gpon`, `hfc`, `dth`, `wttx`
- `estado_venta`: `pendiente`, `instalada`, `fallida`

## Core Tables

| Table | Purpose |
| --- | --- |
| `vendedores` | Vendors linked to Supabase Auth users. Includes salary, commission %, zone, and status. |
| `clientes` | Client registry with contact information, service state, and billing totals. |
| `aliados` | Referral partners and their payment tracking. |
| `ventas` | Sales records connected to clients, vendors, and optional allies. Supports filtering by date, zone, technology, and package. |
| `metas` | Monthly service goals per vendor with automatic progress updates. |
| `comisiones` | Monthly commission breakdown per vendor, including bonuses and totals payable. |
| `rangos_comisiones` | Commission multiplier ranges by month and package type. |

All tables use UUID primary keys, timestamps for auditing, and foreign keys with cascading updates where appropriate. Unique constraints and indexes are defined for frequently queried columns such as `ventas.mes_reporte`, `ventas.tecnologia`, `ventas.tipo_paquete`, and `metas` by `(vendedor_id, mes)`.

## Row Level Security & Roles

RLS is enabled on every table. Policies implement the following access matrix:

- **admin** – full CRUD access on all tables.
- **supervisor** – read access to operational tables and views.
- **vendedor** – scoped access to their own `ventas`, `metas`, and `comisiones`, with limited update rights (e.g., update sale status).
- **viewer** – read access only to aggregated dashboard views.

`vendedores` rows are linked to Auth users through a `user_id` column to support role-based scoping.

## Helper Views

The backend exposes a set of views that power dashboard widgets:

- `vw_kpis`
- `vw_sales_by_zone`
- `vw_sales_by_tecnologia`
- `vw_sales_by_paquete`
- `vw_vendor_rankings`
- `vw_monthly_comparison`

Each view includes filterable fields such as month ranges, zone, technology, and package type so the frontend can apply the same global filters used in the UI.

## Functions & Triggers

- `fn_calculate_commissions(mes date)` – Calculates and upserts commission records for the given month using `ventas`, `rangos_comisiones`, and bonus logic.
- `update_metas_on_venta_instalada` trigger – Adjusts `metas.servicios_logrados` when a sale transitions to `instalada`, accounting for package weighting (OnePlay = 1, DoublePlay = 2, TriplePlay/Full = 3).

## Seed Data

Sample records are loaded for `vendedores`, `clientes`, `aliados`, and `metas` to support local testing and to populate the UI immediately after connecting the frontend.

## Storage

A private storage bucket named `planillas` stores generated payroll PDFs and related attachments. Apply signed URLs or service-role access when exposing these files.

## Next Steps

1. Connect the React app to Supabase using the configured tables and views.
2. Replace mock data with real queries and mutations respecting the RLS policies.
3. Wire up the existing Google Sheets import script with Supabase service credentials so it updates the `ventas` table.
4. Extend policies as new roles or workflows are introduced.

For reproducibility, export the SQL definitions from the Supabase dashboard if you need to recreate the environment elsewhere.
