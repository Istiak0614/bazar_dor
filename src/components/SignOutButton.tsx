"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Props = {
  // "menu" = red text inside the user dropdown
  // "outline" = red outlined button on the profile page
  variant?: "menu" | "outline";
};

const SignOutButton = ({ variant = "outline" }: Props) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const handleSignOut = async () => {
    setBusy(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message ?? "সাইন আউট হয়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সংযোগ সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  };

  const className =
    variant === "menu"
      ? "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 disabled:opacity-60"
      : "inline-flex items-center gap-1.5 rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50 disabled:opacity-60";

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={busy}
      className={className}
    >
      <span aria-hidden="true">↩</span>
      {busy ? "অপেক্ষা করুন..." : "সাইন আউট"}
    </button>
  );
};

export default SignOutButton;
