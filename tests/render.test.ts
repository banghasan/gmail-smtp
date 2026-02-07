import { describe, expect, test } from "bun:test";
import { renderResult } from "../src/render";

describe("renderResult", () => {
  test("renders success variant with items and title", () => {
    const html = renderResult(
      "Email berhasil dikirim",
      "Detail pengiriman:",
      ["Message ID: abc", "Mode: SSL"],
      "success",
    );

    expect(html).toContain("Email berhasil dikirim");
    expect(html).toContain("Detail pengiriman:");
    expect(html).toContain("Message ID: abc");
    expect(html).toContain("Mode: SSL");
    expect(html).toContain("SUCCESS");
  });

  test("renders error variant with items and auto refresh", () => {
    const html = renderResult(
      "Validasi gagal",
      "Periksa kembali input kamu.",
      ["Subject harus 3–120 karakter."],
      "error",
    );

    expect(html).toContain("Validasi gagal");
    expect(html).toContain("ERROR");
    expect(html).toContain("Subject harus 3–120 karakter.");
    expect(html).toContain('http-equiv="refresh"');
    expect(html).toContain('content="6; url=/"');
  });

  test("matches snapshot (success)", () => {
    const html = renderResult(
      "Email berhasil dikirim",
      "Detail pengiriman:",
      ["Message ID: abc", "Mode: SSL"],
      "success",
    );
    expect(html).toMatchSnapshot();
  });

  test("matches snapshot (error)", () => {
    const html = renderResult(
      "Validasi gagal",
      "Periksa kembali input kamu.",
      ["Subject harus 3–120 karakter."],
      "error",
    );
    expect(html).toMatchSnapshot();
  });
});
