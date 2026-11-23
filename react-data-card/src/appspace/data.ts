// Outbound data for Appspace cards.
//
// "proxy"  : Appspace http-proxy cloud service. The card gets a CACS token from Appspace
//            (constellation tokens -> /api/v3/authorization/cloud/token -> ACS) and POSTs
//            {url, authorization} to <serviceUrls["http-proxy"]>contents, the same request
//            shape the stock WebView card uses. Needs manifest CloudScopes {"default":"http-proxy"}
//            and EnablePostMessageTokenTransfer. Works only where Appspace supplies tokens
//            (device / editing / preview); verify JSON pass-through on your tenant.
// "direct" : $cardApi.api.httpRequest. On devices whose host supports api.xhr the app makes
//            the request (no browser CORS); otherwise a browser XHR (CORS applies).
// Relative URLs (e.g. mock-data.json) always load directly from the card package.
import type { HttpResponse } from "./cardApi";

export type FetchMode = "proxy" | "direct";

export class DataError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
  }
}

const isAbsolute = (u: string) => /^https?:\/\//i.test(u);

function parse(data: unknown): unknown {
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data);
  } catch {
    throw new DataError("Response is not JSON");
  }
}

async function direct(url: string, timeoutMs: number): Promise<unknown> {
  try {
    const r: HttpResponse = await $cardApi.api.httpRequest(url, {
      method: "GET",
      dataType: "text",
      timeout: timeoutMs,
    });
    return parse(r.data);
  } catch (e) {
    const r = e as Partial<HttpResponse>;
    throw new DataError(`Request failed (${r?.status ?? "network"}) for ${url}`, r?.status);
  }
}

async function viaProxy(url: string, timeoutMs: number): Promise<unknown> {
  const context = $cardApi.getPlaybackContext();
  let token;
  try {
    token = await $cardApi.api.getCacsToken(context);
  } catch (e) {
    throw new DataError(`Appspace proxy unavailable in context "${context}": ${String((e as Error)?.message ?? e)}`);
  }
  const base = token.serviceUrls?.["http-proxy"];
  if (!base) throw new DataError('No "http-proxy" service URL; check manifest CloudScopes');
  try {
    const r: HttpResponse = await $cardApi.api.httpRequest(base + "contents", {
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      dataType: "text",
      timeout: timeoutMs,
      headers: { "x-appspace-cacs-token": token.token },
      data: jQuery.param({ url, authorization: "Bearer " + token.token }),
    });
    return parse(r.data);
  } catch (e) {
    if (e instanceof DataError) throw e;
    const r = e as Partial<HttpResponse>;
    throw new DataError(`Proxy request failed (${r?.status ?? "network"}) for ${url}`, r?.status);
  }
}

// Fetch JSON. Proxy mode falls back to direct only outside Appspace (no tokens), so
// local dev and headless preview work without an Appspace host.
export async function fetchJson(url: string, mode: FetchMode, timeoutMs = 15000): Promise<unknown> {
  if (!isAbsolute(url)) return direct(url, timeoutMs);
  if (mode === "proxy") {
    if (!$cardApi.api.hasConstellationTokens() && $cardApi.getPlaybackContext() === "none") {
      return direct(url, timeoutMs);
    }
    return viaProxy(url, timeoutMs);
  }
  return direct(url, timeoutMs);
}

// "data.items" -> obj.data.items ; "" -> obj
export function pick(obj: unknown, path: string): unknown {
  return path.split(".").filter(Boolean).reduce<unknown>(
    (o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined),
    obj,
  );
}
