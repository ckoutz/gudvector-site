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
  | "unauthorized"
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

// Dev servers run route handlers, server actions, and page renders in separate
// module graphs, so module-level mock state is stashed on globalThis to keep it
// consistent across all of them.
const mockStore: Map<string, Quote> = (() => {
  const g = globalThis as { __gvasMockStore?: Map<string, Quote> };
  if (!g.__gvasMockStore) {
    g.__gvasMockStore = new Map<string, Quote>([
      ["sample", mockQuote("q_sample", "sent")],
      ["sample-paid", mockQuote("q_sample_paid", "paid")],
      ["sample-declined", mockQuote("q_sample_declined", "declined")],
    ]);
  }
  return g.__gvasMockStore;
})();

const MOCK_CALENDLY_URL = "https://calendly.com/gudvector/inspection";

// ---------------------------------------------------------------------------
// Customer portal mock state (GVAS_MOCK=1)
// ---------------------------------------------------------------------------

const MOCK_CUSTOMER: PortalCustomer = {
  displayName: "Jordan Alvarez",
  email: "jordan@example.com",
  phone: "+1 925 555 0134",
};

const MOCK_PORTAL_BUSINESS: PortalBusiness = {
  ...MOCK_BUSINESS,
  calendlyUrl: MOCK_CALENDLY_URL,
};

const mockPortalSessions: Set<string> = (() => {
  const g = globalThis as { __gvasMockPortalSessions?: Set<string> };
  if (!g.__gvasMockPortalSessions) g.__gvasMockPortalSessions = new Set<string>();
  return g.__gvasMockPortalSessions;
})();

const MOCK_PORTAL_QUOTES: PortalQuote[] = [
  {
    id: "q_portal_2",
    status: "sent",
    totalCents: 32500,
    currency: "USD",
    createdAt: "2026-09-05T18:05:00Z",
    approvedAt: null,
    claimToken: "sample",
    billing: "one_time",
    interval: null,
  },
  {
    id: "q_portal_1",
    status: "paid",
    totalCents: 50000,
    currency: "USD",
    createdAt: "2026-08-15T16:40:00Z",
    approvedAt: "2026-08-16T09:00:00Z",
    claimToken: "sample-paid",
    billing: "recurring",
    interval: "month",
  },
];

const MOCK_PORTAL_SUBSCRIPTIONS: PortalSubscription[] = [
  {
    id: "sub_portal_1",
    quoteId: "q_portal_1",
    status: "active",
    interval: "month",
    amountCents: 50000,
    currency: "USD",
    currentPeriodEnd: "2026-10-15T00:00:00Z",
    cancelAtPeriodEnd: false,
  },
];

function assertMockSession(sessionToken: string): void {
  if (!mockPortalSessions.has(sessionToken)) {
    throw new GvasError("unauthorized", "Session expired or invalid.", 401);
  }
}

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
  if (status === 401) return "unauthorized";
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

  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new GvasError("unexpected", "The quote service returned invalid data.", res.status);
  }
}

async function authedRequest<T>(
  path: string,
  sessionToken: string,
  init?: RequestInit,
): Promise<T> {
  return request<T>(path, {
    ...init,
    headers: { authorization: `Bearer ${sessionToken}`, ...(init?.headers ?? {}) },
  });
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

export function formatCents(cents: number, currency: string = "USD"): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
      cents / 100,
    );
  } catch {
    return formatUsd(cents);
  }
}

// ---------------------------------------------------------------------------
// Customer portal API. All session routes take a Bearer sessionToken issued by
// createPortalSession; the site stores it in an httpOnly cookie (see
// src/lib/portal-session.ts). Field names match the GVAS contract — do not rename.
// ---------------------------------------------------------------------------

export type PortalCustomer = {
  displayName: string;
  email: string;
  phone: string | null;
};

export type PortalBusiness = {
  displayName: string;
  siteUrl: string;
  calendlyUrl?: string | null;
};

export type PortalSession = {
  sessionToken: string;
  customer: { displayName: string; email: string };
  business: { displayName: string; siteUrl: string };
};

export type PortalMe = {
  customer: PortalCustomer;
  business: PortalBusiness;
};

export type PortalQuote = {
  id: string;
  status: QuoteStatus;
  totalCents: number;
  currency: string;
  createdAt: string;
  approvedAt: string | null;
  claimToken: string;
  billing: "one_time" | "recurring";
  interval: "month" | "year" | null;
};

export type PortalSubscription = {
  id: string;
  quoteId: string;
  status: string;
  interval: "month" | "year" | null;
  amountCents: number;
  currency: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
};

export type BillingPortalResponse = { url: string };

const jsonHeaders = { "content-type": "application/json" };

/** Ask GVAS to email a magic sign-in link. The endpoint always returns 202. */
export async function requestPortalLogin(email: string): Promise<void> {
  if (gvasEnv.mock) return;
  if (!gvasEnv.businessKey) {
    throw new GvasError("not_configured", "NEXT_PUBLIC_GVAS_BUSINESS_KEY is not set.");
  }
  await request(`/v1/businesses/${encode(gvasEnv.businessKey)}/portal/login`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ email }),
  });
}

/** Exchange a magic-link token for a portal sessionToken. Throws 401 on bad/expired tokens. */
export async function createPortalSession(token: string): Promise<PortalSession> {
  if (gvasEnv.mock) {
    if (!token.trim()) {
      throw new GvasError("unauthorized", "Invalid or expired sign-in link.", 401);
    }
    const sessionToken = `mock-session-${Math.random().toString(36).slice(2)}`;
    mockPortalSessions.add(sessionToken);
    return {
      sessionToken,
      customer: { displayName: MOCK_CUSTOMER.displayName, email: MOCK_CUSTOMER.email },
      business: {
        displayName: MOCK_BUSINESS.displayName,
        siteUrl: MOCK_BUSINESS.siteUrl,
      },
    };
  }
  return request<PortalSession>("/v1/portal/sessions", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ token }),
  });
}

export async function deletePortalSession(sessionToken: string): Promise<void> {
  if (gvasEnv.mock) {
    mockPortalSessions.delete(sessionToken);
    return;
  }
  await authedRequest("/v1/portal/sessions", sessionToken, { method: "DELETE" });
}

export async function getPortalMe(sessionToken: string): Promise<PortalMe> {
  if (gvasEnv.mock) {
    assertMockSession(sessionToken);
    return { customer: MOCK_CUSTOMER, business: MOCK_PORTAL_BUSINESS };
  }
  return authedRequest<PortalMe>("/v1/portal/me", sessionToken);
}

export async function getPortalQuotes(
  sessionToken: string,
): Promise<{ quotes: PortalQuote[] }> {
  if (gvasEnv.mock) {
    assertMockSession(sessionToken);
    return { quotes: MOCK_PORTAL_QUOTES };
  }
  return authedRequest<{ quotes: PortalQuote[] }>("/v1/portal/quotes", sessionToken);
}

export async function getPortalSubscriptions(
  sessionToken: string,
): Promise<{ subscriptions: PortalSubscription[] }> {
  if (gvasEnv.mock) {
    assertMockSession(sessionToken);
    return { subscriptions: MOCK_PORTAL_SUBSCRIPTIONS };
  }
  return authedRequest<{ subscriptions: PortalSubscription[] }>(
    "/v1/portal/subscriptions",
    sessionToken,
  );
}

/**
 * Creates a hosted billing-portal session and returns its URL. Throws
 * GvasError(kind "not_found") when the customer has no billing yet.
 */
export async function createBillingPortalUrl(
  sessionToken: string,
): Promise<BillingPortalResponse> {
  if (gvasEnv.mock) {
    assertMockSession(sessionToken);
    return { url: "https://billing.stripe.com/p/session/mock" };
  }
  return authedRequest<BillingPortalResponse>("/v1/portal/billing-portal", sessionToken, {
    method: "POST",
  });
}

export async function submitPortalRequest(
  sessionToken: string,
  body: { message: string; preferredDates?: string[] },
): Promise<void> {
  if (gvasEnv.mock) {
    assertMockSession(sessionToken);
    console.info("submitPortalRequest (mock):", body);
    return;
  }
  await authedRequest("/v1/portal/requests", sessionToken, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body),
  });
}
