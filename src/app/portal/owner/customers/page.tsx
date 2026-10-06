import {
  getOwnerCustomers,
  getOwnerRequests,
  getOwnerTimeZone,
  type OwnerCustomer,
  type OwnerServiceRequest,
} from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { Card, Empty, LoadError, Pill, formatDate, formatMoney } from "../ui";

export const dynamic = "force-dynamic";

export default async function OwnerCustomersPage() {
  const token = await requireOwnerSessionToken();
  const zone = await getOwnerTimeZone(token);
  const [customersResult, requestsResult] = await Promise.allSettled([
    getOwnerCustomers(token),
    getOwnerRequests(token),
  ]);
  let customers: OwnerCustomer[] | null = null;
  let requests: OwnerServiceRequest[] | null = null;
  if (customersResult.status === "fulfilled") customers = customersResult.value;
  else {
    redirectOwnerOnUnauthorized(customersResult.reason);
    console.error("OwnerCustomers: customers failed", customersResult.reason);
  }
  if (requestsResult.status === "fulfilled") requests = requestsResult.value;
  else {
    redirectOwnerOnUnauthorized(requestsResult.reason);
    console.error("OwnerCustomers: requests failed", requestsResult.reason);
  }

  return (
    <div className="space-y-6">
      <Card title="Customers">
        {customers === null ? (
          <LoadError label="customers" />
        ) : customers.length === 0 ? (
          <Empty>Customers show up here once you approve their first quote.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead className="text-[12px] text-muted">
                <tr className="border-b border-line">
                  <th className="px-5 py-2.5 font-medium">Customer</th>
                  <th className="px-5 py-2.5 font-medium">Phone</th>
                  <th className="px-5 py-2.5 font-medium">Texts</th>
                  <th className="px-5 py-2.5 font-medium">Quotes</th>
                  <th className="px-5 py-2.5 font-medium">Last quote</th>
                  <th className="px-5 py-2.5 text-right font-medium">Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {customers.map((customer) => (
                  <tr key={customer.email}>
                    <td className="px-5 py-3">
                      <p className="font-medium text-ink">{customer.name ?? customer.email}</p>
                      {customer.name && <p className="text-[12px] text-muted">{customer.email}</p>}
                    </td>
                    <td className="px-5 py-3 text-muted">{customer.phone ?? "—"}</td>
                    <td className="px-5 py-3">
                      {customer.smsConsent ? (
                        <Pill tone="green">OK to text</Pill>
                      ) : (
                        <Pill tone="muted">Email only</Pill>
                      )}
                    </td>
                    <td className="px-5 py-3 tabular-nums text-ink">{customer.quoteCount}</td>
                    <td className="px-5 py-3 text-muted">{formatDate(customer.lastQuoteAt, zone)}</td>
                    <td className="px-5 py-3 text-right font-semibold tabular-nums text-ink">
                      {formatMoney(customer.paidCents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Requests from the customer portal">
        {requests === null ? (
          <LoadError label="requests" />
        ) : requests.length === 0 ? (
          <Empty>No requests yet.</Empty>
        ) : (
          <ul className="divide-y divide-line">
            {requests.map((request) => (
              <li key={request.id} className="px-5 py-3.5">
                <p className="text-[14px] text-ink">{request.message}</p>
                <p className="mt-1 text-[12px] text-muted">
                  {[
                    request.customer.name ?? request.customer.email,
                    formatDate(request.createdAt, zone),
                    request.preferredDates ? `Prefers: ${request.preferredDates}` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
