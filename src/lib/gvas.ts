// Typed client for the GVAS public quote API (gud-vector-agent-suite).
// Server-side only: call from server components and server actions.

export type QuoteStatus = "sent" | "viewed" | "accepted" | "paid" | "declined";

export type QuoteItem = {
  description: string;
  quantity: number;
  amountCents: number;
};

export type Quote = {
  id: string;
  status: QuoteStatus;
  customerName: string;
  serviceAddress: string | null;
  items: QuoteItem[];
  subtotalCents: number;
  totalCents: number;
  currency: "USD";
  note: string | null;
  createdAt: string;
  approvedAt: string;
};

export type QuoteBusiness = {
  displayName: string;
  siteUrl: string;
};

export type QuoteResponse = {
  business: QuoteBusiness;
  quote: Quote;
};

export type AcceptResponse = { checkoutUrl: string };
export type DeclineResponse = { status: "declined" };
export type BookingLinkResponse = { calendlyUrl: string; displayName: string };

export type GvasErrorKind =
  | "not_found"
  | "conflict"
  | "unavailable"
  | "not_configured"
  | "network"
  | "unexpected";

export class GvasError extends Error {
  readonly kind: GvasErrorKind;
  readonly status: number | null;

  constructor(kind: GvasErrorKind, message: string, status: number | null = null) {
    super(message);
    this.name = "GvasError";
    this.kind = kind;
    this.status = status;
  }
}

export function isGvasError(err: unknown): err is GvasError {
  return err instanceof GvasError;
}

export const gvasEnv = {
  apiUrl: process.env.NEXT_PUBLIC_GVAS_API_URL?.replace(/\/+$/, "") ?? "",
  businessKey: process.env.NEXT_PUBLIC_GVAS_BUSINESS_KEY ?? "",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  mock: process.env.GVAS_MOCK === "1",
};

// ---------------------------------------------------------------------------
// Mock mode (GVAS_MOCK=1): realistic in-memory data so pages render with no
// backend. Status transitions persist for the life of the dev server process.
// ---------------------------------------------------------------------------

const MOCK_BUSINESS: QuoteBusiness = {
  displayName: "Diablo Valley Mold Inspection",
  siteUrl: "https://example.com",
};

function mockQuote(id: string, status: QuoteStatus): Quote {
  return {
    id,
    status,
    customerName: "Jordan Alvarez",
    serviceAddress: "1420 Oak Grove Rd, Walnut Creek, CA 94598",
    items: [
      { description: "Whole-home mold inspection", quantity: 1, amountCents: 25000 },
      { description: "Air sampling (per sample)", quantity: 2, amountCents: 12500 },
    ],
    subtotalCents: 50000,
    totalCents: 50000,
    currency: "USD",
    note: "Includes a written report within 48 hours of the visit. Lab fees for the two air samples are included.",
    createdAt: "2026-09-01T17:12:00Z",
    approvedAt: "2026-09-02T09:30:00Z",
  };
}

const mockStore = new Map<string, Quote>([
  ["sample", mockQuote("q_sample", "sent")],
  ["sample-paid", mockQuote("q_sample_paid", "paid")],
  ["sample-declined", mockQuote("q_sample_declined", "declined")],
]);

const MOCK_CALENDLY_URL = "https://calendly.com/gudvector/inspection";

// ---------------------------------------------------------------------------

type ErrorBody = { error?: string };

async function readError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as ErrorBody;
    if (body && typeof body.error === "string") return body.error;
  } catch {
    // fall through
  }
  return `Request failed (${res.status}).`;
}

function kindFor(status: number): GvasErrorKind {
  if (status === 404) return "not_found";
  if (status === 409) return "conflict";
  if (status === 503) return "unavailable";
  return "unexpected";
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!gvasEnv.apiUrl) {
    throw new GvasError("not_configured", "NEXT_PUBLIC_GVAS_API_URL is not set.");
  }

  let res: Response;
  try {
    res = await fetch(`${gvasEnv.apiUrl}${path}`, {
      ...init,
      cache: "no-store",
      headers: { accept: "application/json", ...(init?.headers ?? {}) },
    });
  } catch (err) {
    throw new GvasError(
      "network",
      err instanceof Error ? err.message : "Could not reach the quote service.",
    );
  }

  if (!res.ok) {
    throw new GvasError(kindFor(res.status), await readError(res), res.status);
  }

  return (await res.json()) as T;
}

function encode(segment: string): string {
  return encodeURIComponent(segment);
}

export async function getQuote(claimToken: string): Promise<QuoteResponse> {
  if (gvasEnv.mock) {
    const quote = mockStore.get(claimToken);
    if (!quote) throw new GvasError("not_found", "Quote not found.", 404);
    return { business: MOCK_BUSINESS, quote };
  }
  return request<QuoteResponse>(`/v1/quotes/${encode(claimToken)}`);
}

export async function acceptQuote(claimToken: string): Promise<AcceptResponse> {
  if (gvasEnv.mock) {
    const quote = mockStore.get(claimToken);
    if (!quote) throw new GvasError("not_found", "Quote not found.", 404);
    if (quote.status === "paid" || quote.status === "declined") {
      throw new GvasError("conflict", `This quote has already been ${quote.status}.`, 409);
    }
    mockStore.set(claimToken, { ...quote, status: "accepted" });
    return { checkoutUrl: `/q/${encode(claimToken)}?paid=1` };
  }
  return request<AcceptResponse>(`/v1/quotes/${encode(claimToken)}/accept`, {
    method: "POST",
  });
}

export async function declineQuote(claimToken: string): Promise<DeclineResponse> {
  if (gvasEnv.mock) {
    const quote = mockStore.get(claimToken);
    if (!quote) throw new GvasError("not_found", "Quote not found.", 404);
    if (quote.status === "paid") {
      throw new GvasError("conflict", "This quote has already been paid.", 409);
    }
    mockStore.set(claimToken, { ...quote, status: "declined" });
    return { status: "declined" };
  }
  return request<DeclineResponse>(`/v1/quotes/${encode(claimToken)}/decline`, {
    method: "POST",
  });
}

export async function getBookingLink(publicKey: string): Promise<BookingLinkResponse> {
  if (gvasEnv.mock) {
    return { calendlyUrl: MOCK_CALENDLY_URL, displayName: MOCK_BUSINESS.displayName };
  }
  return request<BookingLinkResponse>(`/v1/businesses/${encode(publicKey)}/booking-link`);
}

/**
 * Booking URL for the contact-form success state: GVAS booking link when a
 * business key is configured, otherwise NEXT_PUBLIC_CALENDLY_URL. Returns null
 * when neither is available. Never throws.
 */
export async function resolveBookingUrl(): Promise<string | null> {
  if (gvasEnv.businessKey || gvasEnv.mock) {
    try {
      const { calendlyUrl } = await getBookingLink(gvasEnv.businessKey || "mock");
      if (calendlyUrl) return calendlyUrl;
    } catch (err) {
      console.error("resolveBookingUrl: booking-link lookup failed", err);
    }
  }
  return gvasEnv.calendlyUrl || null;
}

export function withCalendlyPrefill(
  url: string,
  prefill: { name?: string; email?: string },
): string {
  const parsed = new URL(url);
  if (prefill.name) parsed.searchParams.set("name", prefill.name);
  if (prefill.email) parsed.searchParams.set("email", prefill.email);
  return parsed.toString();
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
}
