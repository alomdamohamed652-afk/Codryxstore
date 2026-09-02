# CODRYX Store

A Discord bot store and management platform for CODRYX.

## Current foundation

- Arabic RTL customer storefront.
- Bot categories, search, tabs for owned/offers.
- Bot detail pages.
- Admin control center.
- Bot access policy UI: everyone / authorized users / closed / maintenance.
- Purchase request UI and notification count.
- Responsive dark red/black CODRYX visual system.
- Next.js App Router foundation.

## Planned backend

1. Discord OAuth2 authentication.
2. Supabase/Postgres schema for users, bots, categories, orders, subscriptions/access grants, guilds and audit logs.
3. Discord bot integrations and server eligibility checks.
4. Website purchase requests + Discord ticket synchronization.
5. Admin approval workflow and per-user bot activation.
6. Global access policies and user exceptions.
7. Real-time admin notifications.
8. Per-bot dashboards and module permissions.

The repository started empty, so this commit establishes the frontend foundation before wiring real authentication, database and Discord APIs.
