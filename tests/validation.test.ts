import { describe, expect, test } from "bun:test";
import {
  normalizeEmail,
  validateEmail,
  validateSubject,
  validateText,
} from "../src/validation";

describe("normalizeEmail", () => {
  test("trims and strips quotes and spaces", () => {
    expect(normalizeEmail("  \"user.name+tag@gmail.com\"  ")).toBe(
      "user.name+tag@gmail.com",
    );
  });
});

describe("validateEmail", () => {
  test("accepts valid emails", () => {
    expect(validateEmail("ksatria.covata@gmail.com")).toBe(true);
    expect(validateEmail("user.name+tag-1@sub.example.co.id")).toBe(true);
  });

  test("rejects invalid emails", () => {
    expect(validateEmail("not-an-email")).toBe(false);
    expect(validateEmail("a@b")).toBe(false);
    expect(validateEmail("a@b.")).toBe(false);
  });
});

describe("validateSubject", () => {
  test("checks length", () => {
    expect(validateSubject("Hi")).toBe(false);
    expect(validateSubject("Hey")).toBe(true);
    expect(validateSubject("x".repeat(121))).toBe(false);
  });
});

describe("validateText", () => {
  test("checks length", () => {
    expect(validateText("Hey")).toBe(false);
    expect(validateText("Hello")).toBe(true);
    expect(validateText("x".repeat(2001))).toBe(false);
  });
});
