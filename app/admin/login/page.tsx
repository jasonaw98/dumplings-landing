import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const params = await searchParams;
  async function handleSubmit(formData: FormData) {
    "use server";
    await login(formData);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Admin login</h1>
        <form action={handleSubmit} className="space-y-4">
          {params.from ? (
            <input type="hidden" name="from" value={params.from} />
          ) : null}
          <label className="block">
            <span className="text-sm text-zinc-400">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Admin secret"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
