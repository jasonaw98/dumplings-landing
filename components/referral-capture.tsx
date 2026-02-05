"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setStoredReferralCode } from "@/lib/referral";

export function ReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref") ?? searchParams.get("referral");
    if (ref?.trim()) {
      setStoredReferralCode(ref.trim());
    }
  }, [searchParams]);

  return null;
}
