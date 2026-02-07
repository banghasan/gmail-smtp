# Bun Gmail SMTP test

Simple app to send a test email via Gmail SMTP using Bun. Includes a tiny HTTP UI on port 5173.

## Setup

1) Install dependencies

```bash
bun install
```

2) Create `.env` from example and fill values

```bash
cp .env.example .env
```

`GMAIL_APP_PASSWORD` should be a Google **App Password** (recommended). A normal account password typically won't work.

`FROM_EMAIL` is optional. If not set, it defaults to `GMAIL_USER`.
If you use a different `FROM_EMAIL`, set `ALLOW_ALIAS=true` **after** verifying the alias in Gmail (Send mail as).

## Run

```bash
bun run start
```

Open http://localhost:5173 and click **Send**.

## SMTP options

You can switch between SSL (implicit TLS) and STARTTLS using env vars for defaults:

- SSL: `SMTP_PORT=465` and `SMTP_SECURE=true`
- STARTTLS: `SMTP_PORT=587` and `SMTP_SECURE=false`

The UI also has a dropdown to pick the mode per request.

## Server host/port

- `HOST` (default `localhost`)
- `PORT` (default `5173`)

## Notes
- Gmail SMTP SSL (implicit TLS): `smtp.gmail.com` port `465`
- Gmail SMTP STARTTLS: `smtp.gmail.com` port `587`
