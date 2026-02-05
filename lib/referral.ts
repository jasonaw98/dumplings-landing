
const STORAGE_KEY = "dumpling_referral_code";
const COOKIE_NAME = "dumpling_ref";
const COOKIE_DAYS = 30;

export function getReferralParam(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("ref") ?? params.get("referral");
}

export function getStoredReferralCode(): string | null {
  if (typeof window === "undefined") return null;
  const fromStorage = sessionStorage.getItem(STORAGE_KEY);
  if (fromStorage?.trim()) return fromStorage.trim();
  const fromCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  const value = fromCookie?.split("=")[1];
  return value ? decodeURIComponent(value) : null;
}

export function setStoredReferralCode(code: string): void {
  if (typeof window === "undefined" || !code?.trim()) return;
  const trimmed = code.trim();
  sessionStorage.setItem(STORAGE_KEY, trimmed);
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(trimmed)}; path=/; max-age=${COOKIE_DAYS * 86400}; samesite=lax`;
}

export function clearStoredReferralCode(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}

export function getReferralCode(): string | null {
  return getReferralParam() ?? getStoredReferralCode();
}
