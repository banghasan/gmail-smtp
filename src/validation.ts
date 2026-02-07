const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function normalizeEmail(input: string): string {
  let value = input.trim();
  value = value.replace(/^[\"']|[\"']$/g, "");
  value = value.replace(/\s+/g, "");
  return value;
}

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateSubject(subject: string): boolean {
  return subject.length >= 3 && subject.length <= 120;
}

export function validateText(text: string): boolean {
  return text.length >= 5 && text.length <= 2000;
}
