import nodemailer from "nodemailer";
import {
  normalizeEmail,
  validateEmail,
  validateSubject,
  validateText,
} from "./validation";
import { renderResult } from "./render";

const {
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  TO_EMAIL,
  FROM_NAME,
  FROM_EMAIL,
  SUBJECT,
  TEXT,
  PORT,
  HOST,
  SMTP_PORT,
  SMTP_SECURE,
  ALLOW_ALIAS,
} = Bun.env;

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error("Missing required env vars: GMAIL_USER, GMAIL_APP_PASSWORD");
  process.exit(1);
}

const defaultSmtpPort = Number(SMTP_PORT || 465);
const defaultSmtpSecure = SMTP_SECURE
  ? SMTP_SECURE.toLowerCase() === "true"
  : defaultSmtpPort === 465;

const fromName = FROM_NAME || "Bun SMTP Test";
const fromEmail = FROM_EMAIL || GMAIL_USER;
const defaultSubject = SUBJECT || "Bun SMTP Gmail test";
const defaultText =
  TEXT || "Hello! This is a test email sent via Gmail SMTP using Bun.";

function createTransporter(port: number, secure: boolean) {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port,
    secure, // true for SSL (implicit TLS), false for STARTTLS
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
}

async function sendEmail(
  toEmail: string,
  subject: string,
  text: string,
  port: number,
  secure: boolean,
) {
  const message = {
    from: `"${fromName}" <${fromEmail}>`,
    to: toEmail,
    subject,
    text,
  };

  const transporter = createTransporter(port, secure);
  const info = await transporter.sendMail(message);
  return info.messageId;
}

const port = Number(PORT || 5173);
const host = HOST || "localhost";

const defaultToEmail = TO_EMAIL || "";
const fromDisplay = `${fromName} <${fromEmail}>`;
const fromIsAlias = fromEmail.toLowerCase() !== GMAIL_USER.toLowerCase();
const fromAliasError = fromIsAlias
  ? "FROM_EMAIL berbeda dari GMAIL_USER. Verifikasi dulu di Gmail (Send mail as)."
  : "";
const allowAlias =
  typeof ALLOW_ALIAS === "string" && ALLOW_ALIAS.toLowerCase() === "true";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UI 4 Email</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap");

      :root {
        --bg: #0f172a;
        --panel: #0b1220;
        --card: #0f1a2b;
        --text: #e5e7eb;
        --muted: #94a3b8;
        --accent: #22c55e;
        --border: #1f2a44;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Space Grotesk", system-ui, sans-serif;
        color: var(--text);
        background:
          radial-gradient(800px 400px at 10% 0%, rgba(34,197,94,0.12), transparent 60%),
          radial-gradient(700px 400px at 90% 0%, rgba(59,130,246,0.12), transparent 55%),
          var(--bg);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px 16px;
      }

      .shell {
        width: 100%;
        max-width: 860px;
        background: linear-gradient(180deg, rgba(31,41,55,0.7), rgba(15,23,42,0.9));
        border: 1px solid var(--border);
        border-radius: 18px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        overflow: hidden;
      }

      .header {
        padding: 28px 28px 16px;
        border-bottom: 1px solid var(--border);
        background: linear-gradient(120deg, rgba(34,197,94,0.08), transparent 55%);
      }

      .title {
        margin: 0 0 6px;
        font-size: 1.6rem;
        font-weight: 600;
        letter-spacing: 0.3px;
      }

      .subtitle {
        margin: 0;
        color: var(--muted);
        font-size: 0.98rem;
      }

      .content {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 20px;
        padding: 24px 28px 28px;
      }

      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 20px;
      }

      label {
        display: block;
        font-size: 0.9rem;
        color: var(--muted);
        margin: 14px 0 6px;
      }

      input, textarea, select, button {
        width: 100%;
        padding: 12px 14px;
        border-radius: 10px;
        border: 1px solid #22304f;
        background: #0b1220;
        color: var(--text);
        font-family: inherit;
        font-size: 0.98rem;
      }

      input:disabled {
        color: #94a3b8;
        background: #0a1220;
      }

      textarea { resize: vertical; }

      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .button {
        margin-top: 18px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: #0b1220;
        border: none;
        font-weight: 600;
        cursor: pointer;
        transition: transform 120ms ease, box-shadow 120ms ease;
      }

      .button:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 18px rgba(34,197,94,0.25);
      }

      .note {
        font-size: 0.88rem;
        color: var(--muted);
        line-height: 1.4;
      }

      .stat {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 12px 14px;
        border-radius: 10px;
        border: 1px dashed #22304f;
        background: rgba(15,23,42,0.6);
      }

      .stat span { color: var(--muted); font-size: 0.85rem; }
      .stat strong { font-size: 0.98rem; font-weight: 500; }

      @media (max-width: 780px) {
        .content { grid-template-columns: 1fr; }
        .row { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <div class="header">
        <h1 class="title">UI 4 Email</h1>
        <p class="subtitle">Kirim email test melalui Gmail SMTP dari browser lokal.</p>
      </div>
      <div class="content">
        <form class="card" method="POST" action="/send">
          <label>From</label>
          <input name="from" value="${fromDisplay}" disabled />
          ${
            fromIsAlias
              ? `<p class="note">FROM_EMAIL berbeda dari GMAIL_USER. Pastikan alamat ini sudah diverifikasi di Gmail (Send mail as).</p>`
              : `<p class="note">From mengikuti GMAIL_USER. Jika ingin alias, set FROM_EMAIL dan verifikasi di Gmail (Send mail as).</p>`
          }

          <label>To</label>
          <input
            name="toEmail"
            type="email"
            required
            pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
            value="${defaultToEmail}"
            placeholder="recipient@example.com"
          />

          <div class="row">
            <div>
              <label>SMTP Mode</label>
              <select name="smtpMode">
                <option value="ssl" ${defaultSmtpSecure ? "selected" : ""}>SSL (port 465)</option>
                <option value="starttls" ${!defaultSmtpSecure ? "selected" : ""}>STARTTLS (port 587)</option>
              </select>
            </div>
            <div>
              <label>Subject</label>
              <input
                name="subject"
                required
                minlength="3"
                maxlength="120"
                value="${defaultSubject}"
              />
            </div>
          </div>

          <label>Text</label>
          <textarea name="text" rows="7" required minlength="5" maxlength="2000">${defaultText}</textarea>

          <button class="button" type="submit">Send Email</button>
        </form>

        <div class="card">
          <div class="stat">
            <span>Default SMTP</span>
            <strong>${defaultSmtpSecure ? "SSL" : "STARTTLS"} · Port ${defaultSmtpPort}</strong>
          </div>
          <div class="stat">
            <span>Server</span>
            <strong>${host}:${port}</strong>
          </div>
          <div class="stat">
            <span>Recipient (env)</span>
            <strong>${defaultToEmail || "(not set)"}</strong>
          </div>
          <p class="note">
            ${fromAliasError || "Gunakan App Password Gmail dan pilih mode SMTP sesuai kebutuhan."}
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;

Bun.serve({
  hostname: host,
  port,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "GET" && url.pathname === "/") {
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    if (req.method === "POST" && url.pathname === "/send") {
      const formData = await req.formData();
      const subject = String(formData.get("subject") || defaultSubject).trim();
      const text = String(formData.get("text") || defaultText).trim();
      const smtpMode = String(formData.get("smtpMode") || "ssl").toLowerCase();
      const rawToEmail = String(formData.get("toEmail") || defaultToEmail);
      const toEmail = normalizeEmail(rawToEmail);

      if (!toEmail) {
        return new Response(
          renderResult(
            "Validasi gagal",
            "Periksa kembali input kamu.",
            ["Kolom Tujuan (To) wajib diisi."],
            "error",
          ),
          {
            status: 400,
            headers: { "content-type": "text/html; charset=utf-8" },
          },
        );
      }
      if (!validateEmail(toEmail)) {
        const items = [
          `Format email tujuan tidak valid: "${toEmail}".`,
          "Contoh format yang benar: user@example.com",
        ];
        if (rawToEmail !== toEmail) {
          items.splice(
            1,
            0,
            `Input asli: "${rawToEmail}" (sudah dibersihkan).`,
          );
        }
        return new Response(
          renderResult(
            "Validasi gagal",
            "Periksa format email tujuan.",
            items,
            "error",
          ),
          {
            status: 400,
            headers: { "content-type": "text/html; charset=utf-8" },
          },
        );
      }
      if (!validateSubject(subject)) {
        return new Response(
          renderResult(
            "Validasi gagal",
            "Subject tidak sesuai aturan.",
            ["Subject harus 3–120 karakter."],
            "error",
          ),
          {
            status: 400,
            headers: { "content-type": "text/html; charset=utf-8" },
          },
        );
      }
      if (!validateText(text)) {
        return new Response(
          renderResult(
            "Validasi gagal",
            "Isi email tidak sesuai aturan.",
            ["Isi email harus 5–2000 karakter."],
            "error",
          ),
          {
            status: 400,
            headers: { "content-type": "text/html; charset=utf-8" },
          },
        );
      }

      const selectedSecure = smtpMode !== "starttls";
      const selectedPort = selectedSecure ? 465 : 587;

      try {
        if (fromIsAlias && !allowAlias) {
          return new Response(
            renderResult(
              "Pengiriman dibatalkan",
              "FROM_EMAIL berbeda dari GMAIL_USER.",
              [
                "Gmail biasanya menolak From yang belum diverifikasi.",
                "Verifikasi dulu di Gmail (Send mail as), lalu coba lagi.",
                "Atau set ALLOW_ALIAS=true jika sudah diverifikasi.",
              ],
              "error",
            ),
            {
              status: 400,
              headers: { "content-type": "text/html; charset=utf-8" },
            },
          );
        }
        const messageId = await sendEmail(
          toEmail,
          subject,
          text,
          selectedPort,
          selectedSecure,
        );
        return new Response(
          renderResult(
            "Email berhasil dikirim",
            "Detail pengiriman:",
            [
              `Message ID: ${messageId}`,
              `Mode: ${selectedSecure ? "SSL" : "STARTTLS"}`,
              `To: ${toEmail}`,
              `Subject: ${subject}`,
            ],
            "success",
          ),
          { headers: { "content-type": "text/html; charset=utf-8" } },
        );
      } catch (err) {
        return new Response(
          renderResult(
            "Pengiriman gagal",
            "Ada masalah saat mengirim email.",
            [
              "Pastikan App Password benar.",
              "Cek koneksi internet.",
              "Pastikan akun Gmail mengizinkan SMTP.",
              `Detail error: ${String(err)}`,
            ],
            "error",
          ),
          {
            status: 500,
            headers: { "content-type": "text/html; charset=utf-8" },
          },
        );
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running on http://${host}:${port}`);
console.log(
  `Default SMTP ${defaultSmtpSecure ? "SSL" : "STARTTLS"} on port ${defaultSmtpPort}`,
);
