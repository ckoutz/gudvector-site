import { cache } from "react";
// Owner dashboard client. The owner signs in on the customer portal login
// page; GVAS answers the session exchange with role "owner" and an owner
// session token that only /v1/owner/* accepts. Field names match the GVAS
// contract (docs/public_api.md, "Owner dashboard API") — do not rename.
//
// Mock mode (GVAS_MOCK=1) serves Bay Area Services sample data so screens can
// be developed and photographed with no backend. It is never used in
// production, where GVAS_MOCK is unset.

import { GvasError, gvasEnv } from "@/lib/gvas";

export type OwnerQuoteStatus =
  | "drafting"
  | "awaiting_customer_selection"
  | "awaiting_approval"
  | "rejected"
  | "approved"
  | "delivery_pending"
  | "delivered";

export type OwnerCustomerStatus = "sent" | "viewed" | "accepted" | "paid" | "declined";

export type OwnerQuote = {
  id: string;
  status: OwnerQuoteStatus;
  customerStatus: OwnerCustomerStatus | null;
  needsApproval: boolean;
  customer: {
    name: string | null;
    email: string | null;
    phone: string | null;
    serviceAddress: string | null;
  };
  lineItems: { description: string; quantity: number; unitPriceCents: number }[];
  totalCents: number;
  currency: string | null;
  billing: "one_time" | "recurring";
  interval: "month" | "year" | null;
  note: string | null;
  createdAt: string;
  approvedAt: string | null;
  sentAt?: string | null;
  paidOn?: string | null;
  paidBy?: OwnerQuotePaidBy | null;
  updatedAt: string;
};

export type ManualPaymentMethod = "check" | "cash" | "other";

export type OwnerQuotePaidBy = {
  source: "stripe" | "manual";
  method: "card" | ManualPaymentMethod;
  note: string | null;
};

export type ManualPayment = { paidOn: string; method: ManualPaymentMethod; note?: string };

export type OwnerCustomer = {
  email: string;
  name: string | null;
  phone: string | null;
  smsConsent: boolean | null;
  createdAt: string;
  quoteCount: number;
  paidCents: number;
  lastQuoteAt: string | null;
  quoteIds: string[];
};

export type OwnerSubscription = {
  id: string;
  quoteId: string;
  status: string;
  interval: "month" | "year";
  amountCents: number;
  currency: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  /** Recorded by the owner (check, cash), not billed by Stripe. */
  manual?: boolean;
  /** yyyy-mm-dd; manual plans only. */
  paidFrom?: string | null;
  paidThrough?: string | null;
};

export type OwnerPayment = {
  id: string;
  quoteId: string;
  kind: "one_off" | "plan";
  source: "stripe" | "manual";
  method: "card" | ManualPaymentMethod;
  amountCents: number;
  currency: string;
  paidOn: string | null;
  monthsCovered: number | null;
  recordedBy: string | null;
  recordedAt: string | null;
  note: string | null;
  voidedAt: string | null;
  voidedBy: string | null;
  duplicate: boolean;
  counts: boolean;
};

/** One check/cash payment on a manual plan. `key` makes a resubmit a no-op. */
export type PlanPayment = {
  key: string;
  paidOn: string;
  method: ManualPaymentMethod;
  months: number;
  amountCents: number;
  note?: string;
};

export type OwnerBooking = {
  reference: string;
  state: "collecting" | "proposing_slots" | "awaiting_owner" | "approved" | "declined" | "closed";
  needsDecision: boolean;
  customer: { name: string | null; email: string | null; phone: string | null; address: string | null };
  details: string | null;
  /** Gus's notes from the chat; absent on older backends. */
  notes?: string | null;
  urgency: string | null;
  requestedStart: string | null;
  requestedEnd: string | null;
  booked: boolean;
  decisionAt: string | null;
  decisionReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OwnerServiceRequest = {
  id: string;
  message: string;
  preferredDates: string | null;
  status: string;
  source: string;
  createdAt: string;
  customer: { name: string | null; email: string | null };
};

export type CalendarSource = "booking" | "request" | "calendar";

export type OwnerCalendarEvent = {
  source: CalendarSource;
  title: string;
  start: string;
  end: string | null;
  allDay: boolean;
  location: string | null;
  inviteeName: string | null;
  inviteeEmail: string | null;
  reference: string | null;
};

export type OwnerCalendar = { events: OwnerCalendarEvent[]; problems: string[] };

export type OwnerSettings = {
  displayName: string;
  siteUrl: string | null;
  calendlyUrl: string | null;
  intakeBrief: string | null;
  intakeQuestions: string | null;
  intakeOpening: string | null;
  notificationEmail: string | null;
  ownerEmail: string | null;
  /** IANA zone the business works in; null until Calendly fills it in. */
  timezone: string | null;
  calendarFeed: { connected: boolean; host: string | null };
  connections: { website: boolean };
};

export type OwnerSettingsUpdate = Partial<{
  displayName: string;
  calendlyUrl: string;
  intakeBrief: string;
  intakeQuestions: string;
  intakeOpening: string;
  notificationEmail: string;
  timezone: string;
  calendarFeedUrl: string;
}>;

export type OwnerMe = {
  role: "owner";
  owner: { email: string };
  business: {
    displayName: string;
    siteUrl: string | null;
    calendlyUrl: string | null;
    timezone: string | null;
  };
};

export type BookingDecisionResult = { applied: boolean; message: string };

// ---------------------------------------------------------------------------
// Mock data (GVAS_MOCK=1 only)
// ---------------------------------------------------------------------------

type MockOwnerState = {
  sessions: Set<string>;
  quotes: OwnerQuote[];
  bookings: OwnerBooking[];
  settings: OwnerSettings;
  /** What each mock-paid quote was before, so undo puts it back. */
  statusBeforePaid: Map<string, OwnerCustomerStatus | null>;
  plans: OwnerSubscription[];
  payments: OwnerPayment[];
};

const MOCK_ZONE = "America/Los_Angeles";

/** A wall-clock time in the sample business's (Pacific) time zone. */
function at(daysFromToday: number, hour: number, minute = 0): string {
  const now = new Date();
  const wall = (zone: string) => Date.parse(now.toLocaleString("en-US", { timeZone: zone }));
  const offsetMs = wall(MOCK_ZONE) - wall("UTC");
  const local = new Date(now.getTime() + offsetMs);
  local.setUTCDate(local.getUTCDate() + daysFromToday);
  local.setUTCHours(hour, minute, 0, 0);
  return new Date(local.getTime() - offsetMs).toISOString();
}

/** An all-day date as GVAS sends it: the sample business's local date, anchored at UTC midnight. */
function allDayAt(daysFromToday: number): string {
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: MOCK_ZONE }).format(new Date(at(daysFromToday, 12)));
  return `${date}T00:00:00.000Z`;
}

function mockOwnerState(): MockOwnerState {
  const g = globalThis as { __gvasMockOwner?: MockOwnerState };
  if (g.__gvasMockOwner) {
    // State kept across a hot reload may predate newer fields.
    g.__gvasMockOwner.statusBeforePaid ??= new Map();
    g.__gvasMockOwner.plans ??= [];
    g.__gvasMockOwner.payments ??= [];
    return g.__gvasMockOwner;
  }
  const quote = (
    id: string,
    name: string,
    email: string,
    items: [string, number][],
    status: OwnerQuoteStatus,
    customerStatus: OwnerCustomerStatus | null,
    created: string,
    extra: Partial<OwnerQuote> = {},
  ): OwnerQuote => ({
    id,
    status,
    customerStatus,
    needsApproval: status === "awaiting_approval",
    customer: { name, email, phone: null, serviceAddress: null },
    lineItems: items.map(([description, cents]) => ({
      description,
      quantity: 1,
      unitPriceCents: cents,
    })),
    totalCents: items.reduce((sum, [, cents]) => sum + cents, 0),
    currency: "USD",
    billing: "one_time",
    interval: null,
    note: null,
    createdAt: created,
    approvedAt: status === "awaiting_approval" ? null : created,
    updatedAt: created,
    ...extra,
  });
  g.__gvasMockOwner = {
    statusBeforePaid: new Map(),
    plans: [],
    payments: [],
    sessions: new Set<string>(),
    quotes: [
      quote(
        "q_4f2a9c",
        "Jordan Alvarez",
        "jordan@example.com",
        [
          ["50 gal water heater, installed", 165000],
          ["Haul-away", 15000],
        ],
        "awaiting_approval",
        null,
        at(0, 10, 12),
        { customer: { name: "Jordan Alvarez", email: "jordan@example.com", phone: "+1 925 555 0134", serviceAddress: "Walnut Creek" } },
      ),
      quote("q_81bd03", "Priya Shah", "priya@example.com", [["Kitchen faucet replacement", 42000]], "delivered", "viewed", at(-1, 15, 40)),
      quote("q_77c1e8", "Marcus Lee", "marcus@example.com", [["Sewer line camera inspection", 29500]], "delivered", "paid", at(-3, 9, 5)),
      quote("q_5e90aa", "Dana Brooks", "dana@example.com", [["Garbage disposal install", 38500]], "delivered", "accepted", at(-4, 13, 30)),
      quote(
        "q_3a1f6d",
        "Sam Ortiz",
        "sam@example.com",
        [["Quarterly drain maintenance", 9500]],
        "delivered",
        "paid",
        at(-20, 11, 0),
        { billing: "recurring", interval: "month" },
      ),
      quote(
        "q_9d0e52",
        "Ruth Park",
        "",
        [["Monthly water softener service", 6500]],
        "delivered",
        "sent",
        at(-2, 10, 0),
        {
          billing: "recurring",
          interval: "month",
          customer: { name: "Ruth Park", email: null, phone: "+1 925 555 0188", serviceAddress: "Lafayette" },
        },
      ),
      quote("q_2c4b71", "Lee Nguyen", "lee@example.com", [["Toilet rebuild", 24000]], "rejected", null, at(-6, 16, 20)),
    ],
    bookings: [
      {
        reference: "bk7q2m",
        state: "awaiting_owner",
        needsDecision: true,
        customer: { name: "Alex Kim", email: "alex@example.com", phone: "+1 510 555 0172", address: "Oakland" },
        details: "Low water pressure upstairs since last week",
        urgency: null,
        requestedStart: at(2, 13),
        requestedEnd: at(2, 14),
        booked: false,
        decisionAt: null,
        decisionReason: null,
        createdAt: at(0, 8, 47),
        updatedAt: at(0, 8, 47),
      },
      {
        reference: "bk3f9d",
        state: "approved",
        needsDecision: false,
        customer: { name: "Jordan Alvarez", email: "jordan@example.com", phone: "+1 925 555 0134", address: "Walnut Creek" },
        details: "Water heater leaking",
        urgency: "soon",
        requestedStart: at(0, 9),
        requestedEnd: at(0, 10),
        booked: true,
        decisionAt: at(-1, 18, 2),
        decisionReason: null,
        createdAt: at(-1, 17, 55),
        updatedAt: at(-1, 18, 2),
      },
    ],
    settings: {
      displayName: "Bay Area Services",
      siteUrl: "https://bayareaservices.example.com",
      calendlyUrl: "https://calendly.com/bay-area-services/estimate",
      intakeBrief: "Plumbing and water-heater repair in the East Bay. You book free estimate visits.",
      intakeQuestions: "what needs fixing, the city, and how soon they need it",
      intakeOpening: "Hi! What can we help you fix?",
      notificationEmail: "office@bayareaservices.example.com",
      ownerEmail: "owner@bayareaservices.example.com",
      timezone: MOCK_ZONE,
      calendarFeed: { connected: true, host: "calendar.google.com" },
      connections: { website: true },
    },
  };
  return g.__gvasMockOwner;
}

function mockCustomers(state: MockOwnerState): OwnerCustomer[] {
  const byEmail = new Map<string, OwnerCustomer>();
  for (const quote of state.quotes) {
    if (quote.needsApproval || quote.status === "rejected" || !quote.customer.email) continue;
    const row = byEmail.get(quote.customer.email) ?? {
      email: quote.customer.email,
      name: quote.customer.name,
      phone: quote.customer.phone,
      smsConsent: quote.customer.phone ? true : null,
      createdAt: quote.createdAt,
      quoteCount: 0,
      paidCents: 0,
      lastQuoteAt: null,
      quoteIds: [],
    };
    row.quoteCount += 1;
    row.quoteIds.push(quote.id);
    if (quote.customerStatus === "paid") row.paidCents += quote.totalCents;
    if (!row.lastQuoteAt || quote.createdAt > row.lastQuoteAt) row.lastQuoteAt = quote.createdAt;
    byEmail.set(quote.customer.email, row);
  }
  return [...byEmail.values()];
}

function mockCalendar(state: MockOwnerState, start: Date, end: Date): OwnerCalendar {
  const events: OwnerCalendarEvent[] = [
    {
      source: "booking",
      title: "Water heater estimate",
      start: at(0, 9),
      end: at(0, 10),
      allDay: false,
      location: "Walnut Creek",
      inviteeName: "Jordan Alvarez",
      inviteeEmail: "jordan@example.com",
      reference: null,
    },
    { source: "calendar", title: "Supply house pickup", start: at(0, 7, 30), end: at(0, 8), allDay: false, location: null, inviteeName: null, inviteeEmail: null, reference: null },
    { source: "calendar", title: "Kids' soccer", start: at(0, 17, 30), end: at(0, 19), allDay: false, location: null, inviteeName: null, inviteeEmail: null, reference: null },
    { source: "booking", title: "Faucet estimate", start: at(1, 11), end: at(1, 12), allDay: false, location: "Concord", inviteeName: "Priya Shah", inviteeEmail: "priya@example.com", reference: null },
    { source: "calendar", title: "Truck service", start: allDayAt(3), end: allDayAt(4), allDay: true, location: null, inviteeName: null, inviteeEmail: null, reference: null },
    { source: "calendar", title: "Family trip", start: allDayAt(5), end: allDayAt(7), allDay: true, location: null, inviteeName: null, inviteeEmail: null, reference: null },
    { source: "booking", title: "Drain maintenance", start: at(5, 14), end: at(5, 15), allDay: false, location: "Pleasant Hill", inviteeName: "Sam Ortiz", inviteeEmail: "sam@example.com", reference: null },
  ];
  for (const booking of state.bookings) {
    if (booking.needsDecision && booking.requestedStart) {
      events.push({
        source: "request",
        title: `Booking request: ${booking.customer.name ?? "customer"}`,
        start: booking.requestedStart,
        end: booking.requestedEnd,
        allDay: false,
        location: booking.customer.address,
        inviteeName: booking.customer.name,
        inviteeEmail: booking.customer.email,
        reference: booking.reference,
      });
    }
  }
  const inWindow = events.filter((event) => {
    const eventStart = new Date(event.start);
    return eventStart < end && new Date(event.end ?? event.start) > start;
  });
  inWindow.sort((a, b) => a.start.localeCompare(b.start));
  return { events: inWindow, problems: [] };
}

function assertMockOwner(sessionToken: string): MockOwnerState {
  const state = mockOwnerState();
  if (!state.sessions.has(sessionToken)) {
    throw new GvasError("unauthorized", "Session expired or invalid.", 401);
  }
  return state;
}

/** The same day `months` later, clamped to the end of a short month (GVAS's rule). */
function addMonths(day: string, months: number): string {
  const [y, m, d] = day.split("-").map(Number);
  const index = m - 1 + months;
  const year = y + Math.floor(index / 12);
  const month = (index % 12) + 1;
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${year}-${String(month).padStart(2, "0")}-${String(Math.min(d, last)).padStart(2, "0")}`;
}

function mockPlanPayments(state: MockOwnerState, quoteId: string): OwnerPayment[] {
  return state.payments.filter(
    (p) => p.quoteId === quoteId && p.kind === "plan" && p.source === "manual" && !p.voidedAt,
  );
}

function mockCover(state: MockOwnerState, plan: OwnerSubscription): void {
  const months = mockPlanPayments(state, plan.quoteId).reduce((sum, p) => sum + (p.monthsCovered ?? 0), 0);
  if (!months || !plan.paidFrom) {
    Object.assign(plan, { status: "canceled", paidThrough: null });
    return;
  }
  const end = new Date(`${addMonths(plan.paidFrom, months)}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 1);
  Object.assign(plan, { status: "active", paidThrough: end.toISOString().slice(0, 10) });
}

/** Mock only: mint an owner session for the dev sign-in link. */
export function createMockOwnerSession(): string {
  const token = `mock-owner-${Math.random().toString(36).slice(2)}`;
  mockOwnerState().sessions.add(token);
  return token;
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

type ErrorBody = { detail?: unknown };

function kindFor(status: number) {
  if (status === 401) return "unauthorized" as const;
  if (status === 404) return "not_found" as const;
  if (status === 409) return "conflict" as const;
  if (status === 429) return "rate_limited" as const;
  if (status === 503) return "unavailable" as const;
  return "unexpected" as const;
}

async function ownerRequest<T>(path: string, sessionToken: string, init?: RequestInit): Promise<T> {
  if (!gvasEnv.apiUrl) {
    throw new GvasError("not_configured", "NEXT_PUBLIC_GVAS_API_URL is not set.");
  }
  let res: Response;
  try {
    res = await fetch(`${gvasEnv.apiUrl}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${sessionToken}`,
        ...(init?.body ? { "content-type": "application/json" } : {}),
        ...(init?.headers ?? {}),
      },
    });
  } catch (err) {
    throw new GvasError("network", err instanceof Error ? err.message : "Could not reach GVAS.");
  }
  if (!res.ok) {
    let message = `Request failed (${res.status}).`;
    try {
      const body = (await res.json()) as ErrorBody;
      if (typeof body.detail === "string") message = body.detail;
    } catch {
      // keep the generic message
    }
    throw new GvasError(kindFor(res.status), message, res.status);
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : {}) as T;
}

const enc = encodeURIComponent;

export async function getOwnerMe(sessionToken: string): Promise<OwnerMe> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    return {
      role: "owner",
      owner: { email: state.settings.ownerEmail ?? "" },
      business: {
        displayName: state.settings.displayName,
        siteUrl: state.settings.siteUrl,
        calendlyUrl: state.settings.calendlyUrl,
        timezone: state.settings.timezone,
      },
    };
  }
  return ownerRequest<OwnerMe>("/v1/owner/me", sessionToken);
}

/** Used until the business has a zone of its own. */
export const DEFAULT_TIME_ZONE = "America/Los_Angeles";

/** The zone every dashboard time renders in; one /me call per request. */
export const getOwnerTimeZone = cache(async (sessionToken: string): Promise<string> => {
  try {
    return (await getOwnerMe(sessionToken)).business.timezone || DEFAULT_TIME_ZONE;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
});

export async function deleteOwnerSession(sessionToken: string): Promise<void> {
  if (gvasEnv.mock) {
    mockOwnerState().sessions.delete(sessionToken);
    return;
  }
  await ownerRequest("/v1/owner/sessions", sessionToken, { method: "DELETE" });
}

export async function getOwnerQuotes(sessionToken: string): Promise<OwnerQuote[]> {
  if (gvasEnv.mock) return assertMockOwner(sessionToken).quotes;
  return (await ownerRequest<{ quotes: OwnerQuote[] }>("/v1/owner/quotes", sessionToken)).quotes;
}

export async function decideOwnerQuote(
  sessionToken: string,
  quoteId: string,
  approve: boolean,
): Promise<OwnerQuote> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    const quote = state.quotes.find((item) => item.id === quoteId);
    if (!quote) throw new GvasError("not_found", "not found", 404);
    if (!quote.needsApproval) throw new GvasError("conflict", "quote is not awaiting approval", 409);
    Object.assign(quote, {
      status: approve ? "delivered" : "rejected",
      customerStatus: approve ? "sent" : null,
      needsApproval: false,
      approvedAt: approve ? new Date().toISOString() : null,
    });
    return quote;
  }
  const action = approve ? "approve" : "reject";
  return (
    await ownerRequest<{ quote: OwnerQuote }>(
      `/v1/owner/quotes/${enc(quoteId)}/${action}`,
      sessionToken,
      { method: "POST" },
    )
  ).quote;
}

export async function getOwnerCustomers(sessionToken: string): Promise<OwnerCustomer[]> {
  if (gvasEnv.mock) return mockCustomers(assertMockOwner(sessionToken));
  return (await ownerRequest<{ customers: OwnerCustomer[] }>("/v1/owner/customers", sessionToken))
    .customers;
}

export async function getOwnerSubscriptions(sessionToken: string): Promise<OwnerSubscription[]> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    return [
      {
        id: "sub_1",
        quoteId: "q_3a1f6d",
        status: "active",
        interval: "month",
        amountCents: 9500,
        currency: "USD",
        currentPeriodEnd: at(10, 0),
        cancelAtPeriodEnd: false,
        createdAt: at(-20, 11),
        manual: false,
        paidFrom: null,
        paidThrough: null,
      },
      ...state.plans,
    ];
  }
  return (
    await ownerRequest<{ subscriptions: OwnerSubscription[] }>(
      "/v1/owner/subscriptions",
      sessionToken,
    )
  ).subscriptions;
}

export async function getOwnerBookings(sessionToken: string): Promise<OwnerBooking[]> {
  if (gvasEnv.mock) return assertMockOwner(sessionToken).bookings;
  return (await ownerRequest<{ bookings: OwnerBooking[] }>("/v1/owner/bookings", sessionToken))
    .bookings;
}

export async function decideOwnerBooking(
  sessionToken: string,
  reference: string,
  approve: boolean,
  reason?: string,
): Promise<BookingDecisionResult> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    const booking = state.bookings.find((item) => item.reference === reference);
    if (!booking) return { applied: false, message: `I can't find booking ${reference}.` };
    if (!booking.needsDecision) {
      return { applied: false, message: `Booking ${reference} is already ${booking.state}.` };
    }
    Object.assign(booking, {
      state: approve ? "approved" : "declined",
      needsDecision: false,
      booked: approve,
      decisionAt: new Date().toISOString(),
      decisionReason: approve ? null : (reason ?? null),
    });
    return {
      applied: true,
      message: approve ? `Approved booking ${reference}.` : `Declined booking ${reference}.`,
    };
  }
  const action = approve ? "approve" : "decline";
  return ownerRequest<BookingDecisionResult>(
    `/v1/owner/bookings/${enc(reference)}/${action}`,
    sessionToken,
    { method: "POST", body: JSON.stringify(approve ? {} : { reason: reason || null }) },
  );
}

export async function getOwnerRequests(sessionToken: string): Promise<OwnerServiceRequest[]> {
  if (gvasEnv.mock) {
    assertMockOwner(sessionToken);
    return [
      {
        id: "req_1",
        message: "Can you also look at the hose bib on the side of the house?",
        preferredDates: "Any weekday morning",
        status: "open",
        source: "portal",
        createdAt: at(-1, 12, 15),
        customer: { name: "Priya Shah", email: "priya@example.com" },
      },
    ];
  }
  return (await ownerRequest<{ requests: OwnerServiceRequest[] }>("/v1/owner/requests", sessionToken))
    .requests;
}

export async function getOwnerCalendar(
  sessionToken: string,
  start: Date,
  end: Date,
): Promise<OwnerCalendar> {
  if (gvasEnv.mock) return mockCalendar(assertMockOwner(sessionToken), start, end);
  const query = `start=${enc(start.toISOString())}&end=${enc(end.toISOString())}`;
  return ownerRequest<OwnerCalendar>(`/v1/owner/calendar?${query}`, sessionToken);
}

export async function getOwnerSettings(sessionToken: string): Promise<OwnerSettings> {
  if (gvasEnv.mock) return assertMockOwner(sessionToken).settings;
  return (await ownerRequest<{ settings: OwnerSettings }>("/v1/owner/settings", sessionToken))
    .settings;
}

export async function markOwnerQuotePaid(
  sessionToken: string,
  quoteId: string,
  payment: ManualPayment,
): Promise<OwnerQuote> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    const quote = state.quotes.find((item) => item.id === quoteId);
    if (!quote) throw new GvasError("not_found", "not found", 404);
    const sent =
      quote.customerStatus === "viewed" ||
      quote.customerStatus === "accepted" ||
      quote.status === "delivery_pending" ||
      quote.status === "delivered";
    if (quote.billing !== "one_time" || !sent || quote.customerStatus === "paid" || quote.customerStatus === "declined") {
      throw new GvasError("conflict", "Only quotes sent to the customer can be marked paid.", 409);
    }
    state.statusBeforePaid.set(quote.id, quote.customerStatus);
    Object.assign(quote, {
      customerStatus: "paid",
      paidOn: new Date(`${payment.paidOn}T12:00:00Z`).toISOString(),
      paidBy: { source: "manual", method: payment.method, note: payment.note ?? null },
    });
    return quote;
  }
  return (
    await ownerRequest<{ quote: OwnerQuote }>(`/v1/owner/quotes/${enc(quoteId)}/mark-paid`, sessionToken, {
      method: "POST",
      body: JSON.stringify(payment),
    })
  ).quote;
}

export async function markOwnerQuoteUnpaid(sessionToken: string, quoteId: string): Promise<OwnerQuote> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    const quote = state.quotes.find((item) => item.id === quoteId);
    if (!quote) throw new GvasError("not_found", "not found", 404);
    if (quote.paidBy?.source !== "manual") {
      throw new GvasError("conflict", "This quote has no payment to undo.", 409);
    }
    const before = state.statusBeforePaid.get(quote.id);
    state.statusBeforePaid.delete(quote.id);
    Object.assign(quote, {
      customerStatus: before === undefined ? "accepted" : before,
      paidOn: null,
      paidBy: null,
    });
    return quote;
  }
  return (
    await ownerRequest<{ quote: OwnerQuote }>(`/v1/owner/quotes/${enc(quoteId)}/mark-unpaid`, sessionToken, {
      method: "POST",
    })
  ).quote;
}

export async function getOwnerPayments(sessionToken: string): Promise<OwnerPayment[]> {
  if (gvasEnv.mock) return assertMockOwner(sessionToken).payments;
  return (await ownerRequest<{ payments: OwnerPayment[] }>("/v1/owner/payments", sessionToken)).payments;
}

/** Money that arrived this calendar month in `zone` (GVAS's ledger total: voided and duplicate payments don't count). */
export async function getOwnerPaidThisMonth(sessionToken: string, zone: string): Promise<number> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    const month = (iso: string | null) =>
      iso ? new Intl.DateTimeFormat("en-CA", { timeZone: zone }).format(new Date(iso)).slice(0, 7) : "";
    const now = month(new Date().toISOString());
    const ledger = state.payments.filter((p) => p.counts && month(p.paidOn) === now);
    const unledgered = state.quotes.filter(
      (q) =>
        q.customerStatus === "paid" &&
        !state.payments.some((p) => p.quoteId === q.id) &&
        month(q.updatedAt) === now,
    );
    return (
      ledger.reduce((sum, p) => sum + p.amountCents, 0) +
      unledgered.reduce((sum, q) => sum + q.totalCents, 0)
    );
  }
  const body = await ownerRequest<{ paidThisMonth: Record<string, number> }>(
    "/v1/owner/payments",
    sessionToken,
  );
  return Object.values(body.paidThisMonth).reduce((sum, cents) => sum + cents, 0);
}

export async function recordOwnerPlanPayment(
  sessionToken: string,
  quoteId: string,
  payment: PlanPayment,
): Promise<OwnerSubscription> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    const quote = state.quotes.find((item) => item.id === quoteId);
    if (!quote) throw new GvasError("not_found", "not found", 404);
    if (quote.billing !== "recurring" || !quote.interval) {
      throw new GvasError("conflict", "Only recurring quotes have a plan.", 409);
    }
    let plan = state.plans.find((item) => item.quoteId === quoteId);
    const id = `pay_${payment.key}`;
    const known = state.payments.find((item) => item.id === id);
    if (known) {
      if (known.voidedAt || !plan) {
        throw new GvasError("conflict", "This payment changed; refresh and try again.", 409);
      }
      return plan;
    }
    const now = new Date().toISOString();
    if (!plan) {
      plan = {
        id: `plan_${quoteId}`,
        quoteId,
        status: "active",
        interval: quote.interval,
        amountCents: quote.totalCents,
        currency: quote.currency ?? "USD",
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
        createdAt: now,
        manual: true,
        paidFrom: null,
        paidThrough: null,
      };
      state.plans.push(plan);
    }
    if (plan.status === "canceled" || mockPlanPayments(state, quoteId).length === 0) {
      plan.paidFrom = payment.paidOn;
    }
    if (quote.customerStatus !== "paid") {
      state.statusBeforePaid.set(quote.id, quote.customerStatus);
      quote.customerStatus = "paid";
    }
    state.payments.push({
      id,
      quoteId,
      kind: "plan",
      source: "manual",
      method: payment.method,
      amountCents: payment.amountCents,
      currency: plan.currency,
      paidOn: new Date(`${payment.paidOn}T12:00:00Z`).toISOString(),
      monthsCovered: payment.months,
      recordedBy: state.settings.ownerEmail,
      recordedAt: now,
      note: payment.note ?? null,
      voidedAt: null,
      voidedBy: null,
      duplicate: false,
      counts: true,
    });
    mockCover(state, plan);
    return plan;
  }
  return (
    await ownerRequest<{ subscription: OwnerSubscription }>(
      `/v1/owner/quotes/${enc(quoteId)}/plan-payments`,
      sessionToken,
      { method: "POST", body: JSON.stringify(payment) },
    )
  ).subscription;
}

export async function undoOwnerPlanPayment(
  sessionToken: string,
  quoteId: string,
  paymentId: string,
): Promise<OwnerSubscription> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    const plan = state.plans.find((item) => item.quoteId === quoteId);
    const payment = state.payments.find(
      (item) => item.id === paymentId && item.quoteId === quoteId && item.kind === "plan",
    );
    if (!plan || !payment) throw new GvasError("not_found", "not found", 404);
    if (payment.voidedAt) {
      throw new GvasError("conflict", "This payment changed; refresh and try again.", 409);
    }
    Object.assign(payment, { voidedAt: new Date().toISOString(), voidedBy: state.settings.ownerEmail, counts: false });
    mockCover(state, plan);
    const quote = state.quotes.find((item) => item.id === quoteId);
    if (quote && plan.status === "canceled" && state.statusBeforePaid.has(quote.id)) {
      quote.customerStatus = state.statusBeforePaid.get(quote.id) ?? null;
      state.statusBeforePaid.delete(quote.id);
    }
    return plan;
  }
  return (
    await ownerRequest<{ subscription: OwnerSubscription }>(
      `/v1/owner/quotes/${enc(quoteId)}/plan-payments/${enc(paymentId)}/undo`,
      sessionToken,
      { method: "POST" },
    )
  ).subscription;
}

export async function updateOwnerSettings(
  sessionToken: string,
  update: OwnerSettingsUpdate,
): Promise<OwnerSettings> {
  if (gvasEnv.mock) {
    const state = assertMockOwner(sessionToken);
    const { calendarFeedUrl, ...rest } = update;
    const cleaned = Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [key, value === "" ? null : value]),
    );
    state.settings = { ...state.settings, ...cleaned } as OwnerSettings;
    if (calendarFeedUrl !== undefined) {
      state.settings.calendarFeed = calendarFeedUrl
        ? { connected: true, host: new URL(calendarFeedUrl.replace(/^webcal:/, "https:")).hostname }
        : { connected: false, host: null };
    }
    return state.settings;
  }
  return (
    await ownerRequest<{ settings: OwnerSettings }>("/v1/owner/settings", sessionToken, {
      method: "PATCH",
      body: JSON.stringify(update),
    })
  ).settings;
}
