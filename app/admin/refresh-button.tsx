"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { refreshData } from "./actions";

export function RefreshButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await refreshData();
          toast.success("Data refreshed");
        });
      }}
      disabled={isPending}
      className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
    >
      {isPending ? "Refreshing..." : "Refresh"}
    </button>
  );
}
