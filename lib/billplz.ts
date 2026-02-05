'use server'
const API_KEY = process.env.BILLPLZ_API_KEY!;
const BASE_URL = process.env.BILLPLZ_BASE_URL!;

export async function billplzFetch(
  path: string,
  options: RequestInit = {}
) {
  const auth = Buffer.from(`${API_KEY}:`).toString("base64");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Billplz API error");
  }

  return data;
}
