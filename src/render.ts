export function renderResult(
  title: string,
  subtitle: string,
  items: string[],
  variant: "success" | "error",
) {
  const color = variant === "success" ? "#22c55e" : "#f97316";
  const bg =
    variant === "success" ? "rgba(34,197,94,0.12)" : "rgba(249,115,22,0.12)";
  const itemHtml = items.map((item) => `<li>${item}</li>`).join("");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UI 4 Email</title>
    <meta http-equiv="refresh" content="6; url=/" />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap");
      :root {
        --bg: #0f172a;
        --panel: #0b1220;
        --card: #0f1a2b;
        --text: #e5e7eb;
        --muted: #94a3b8;
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
      .card {
        width: 100%;
        max-width: 680px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        background: ${bg};
        color: ${color};
        font-weight: 600;
        font-size: 0.85rem;
      }
      h1 { margin: 12px 0 6px; font-size: 1.5rem; }
      p { margin: 0 0 12px; color: var(--muted); }
      ul { margin: 0 0 18px; padding-left: 18px; color: var(--text); }
      li { margin: 6px 0; }
      .actions { display: flex; gap: 12px; flex-wrap: wrap; }
      a, button {
        appearance: none;
        border: 1px solid #22304f;
        background: #0b1220;
        color: var(--text);
        padding: 10px 14px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
      }
      .primary {
        border: none;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: #0b1220;
      }
      .hint { font-size: 0.85rem; color: var(--muted); margin-top: 10px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="badge">${variant === "success" ? "SUCCESS" : "ERROR"}</div>
      <h1>${title}</h1>
      <p>${subtitle}</p>
      <ul>${itemHtml}</ul>
      <div class="actions">
        <a class="primary" href="/">Kirim Lagi</a>
        <a href="/">Kembali ke Form</a>
      </div>
      <div class="hint">Halaman ini akan otomatis kembali ke form dalam 6 detik.</div>
    </div>
  </body>
</html>`;
}
