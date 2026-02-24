# Environment

## Prerequisites
- Node.js 22+ (managed via nvm)
- npm (package manager)
- Supabase CLI (`supabase` — v2.65+)
- Vercel CLI (`vercel` — v50+)

## Setup
```bash
npm install
cp .env.example .env.local  # fill in values
npm run dev
```

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Environment Variables

### Supabase
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (client-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key (server-only) |
| `DATABASE_URL` | Direct Postgres connection string |

### OpenAI
| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | API key for analysis generation |

### SendGrid
| Variable | Description |
|----------|-------------|
| `SENDGRID_API_KEY` | SendGrid API key |
| `SENDGRID_FROM_EMAIL` | Sender email address |

### Stripe
| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public Stripe key |

### App
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | App base URL |
| `NEXT_PUBLIC_SITE_URL` | Site URL (used in API routes for callbacks) |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Default locale (bg) |
| `NEXT_PUBLIC_PRELAUNCH_MODE` | "true" to show spot-reserved page |

### Admin CRM
| Variable | Description |
|----------|-------------|
| `ADMIN_PASSWORD` | Admin login password |
| `JWT_SECRET` | JWT signing secret (min 32 chars) |

## External Services
- **Supabase** (dyyoknmfcbulvliqsjls): Database, auth — Central EU (Frankfurt)
- **Vercel**: Hosting + Cron (nurture emails)
- **Stripe**: Payments — checkout sessions, webhooks
- **SendGrid**: Transactional + nurture emails
- **OpenAI**: AI analysis generation (gpt-5-mini)

## Vercel Env Vars (Current)
All set across production/preview/development:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` (production only)
- `ADMIN_PASSWORD`, `JWT_SECRET`
- `NEXT_PUBLIC_PRELAUNCH_MODE`

**Missing from Vercel** (need to add for full deployment):
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`
