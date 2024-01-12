import { FHC_COOKIE_KEY } from "./constants";

export async function sha256(stringValue: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(stringValue),
  );
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

export async function getCookieKeyValue(password?: string): Promise<string> {
  const hash = await sha256(password ?? "");
  return `${FHC_COOKIE_KEY}=${hash}`;
}
