import { supabaseAdmin } from "@/lib/supabase/server";
import type { PaymentStatus } from "@/lib/supabase/types";
import { logout } from "./actions";

const STATUSES: PaymentStatus[] = ["pending", "verified", "failed"];

export default async function AdminPage() {
  if (!supabaseAdmin) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <p className="text-red-400">Supabase not configured.</p>
      </div>
    );
  }

  const [countsResult, revenueResult, recentResult] = await Promise.all([
    supabaseAdmin
      .from("orders")
      .select("payment_status")
      .then(({ data, error }) => {
        if (error) return { counts: null, error };
        const counts = (STATUSES as PaymentStatus[]).reduce(
          (acc, s) => ({ ...acc, [s]: (data?.filter((r) => r.payment_status === s).length ?? 0) }),
          {} as Record<PaymentStatus, number>,
        );
        return { counts, error: null };
      }),
    supabaseAdmin
      .from("orders")
      .select("total_price")
      .eq("payment_status", "verified")
      .then(({ data, error }) => {
        if (error) return { revenue: null, error };
        const revenue = data?.reduce((sum, r) => sum + Number(r.total_price), 0) ?? 0;
        return { revenue, error: null };
      }),
    supabaseAdmin
      .from("orders")
      .select("order_number, full_name, email, total_price, payment_status, created_at, phone, referral_code")
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const counts = countsResult.counts;
  const revenue = revenueResult.revenue ?? 0;
  const recentOrders = recentResult.data ?? [];
  const countError = countsResult.error ?? revenueResult.error ?? recentResult.error;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h1 className="text-2xl font-semibold">Admin dashboard</h1>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Log out
            </button>
          </form>
        </header>

        {countError && (
          <p className="text-red-400">Error loading data: {String(countError)}</p>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {counts &&
            STATUSES.map((status) => (
              <div
                key={status}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <p className="text-sm text-zinc-400 capitalize">{status}</p>
                <p className="text-2xl font-semibold">{counts[status]}</p>
              </div>
            ))}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-sm text-zinc-400">Revenue (verified)</p>
            <p className="text-2xl font-semibold">
              RM {revenue.toLocaleString("en-MY", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">Recent orders</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="text-left p-3 font-medium">Order</th>
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-right p-3 font-medium">Total</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Phone</th>
                  <th className="text-left p-3 font-medium">Referral</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-zinc-500">
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((o) => (
                    <tr
                      key={o.order_number}
                      className="border-b border-zinc-800/80 hover:bg-zinc-800/30"
                    >
                      <td className="p-3 font-mono">{o.order_number}</td>
                      <td className="p-3">{o.full_name}</td>
                      <td className="p-3 text-zinc-400">{o.email}</td>
                      <td className="p-3 text-right">
                        RM {Number(o.total_price).toFixed(2)}
                      </td>
                      <td className="p-3">
                        <span
                          className={
                            o.payment_status === "verified"
                              ? "text-emerald-400"
                              : o.payment_status === "failed"
                                ? "text-red-400"
                                : "text-amber-400"
                          }
                        >
                          {o.payment_status}
                        </span>
                      </td>
                      <td className="p-3 text-zinc-400">
                        {new Date(o.created_at).toLocaleString()}
                      </td>
                      <td className="p-3 text-zinc-400">{o.phone}</td>
                      <td className="p-3 text-zinc-400">{o.referral_code}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-zinc-500">
          Data is loaded on the server only.
        </p>
      </div>
    </div>
  );
}
