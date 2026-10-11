"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
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

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={busy}
      className="btn btn-sm border-red-200 bg-white text-red-600"
    >
      {busy ? "অপেক্ষা করুন..." : "সাইন আউট"}
    </button>
  );
};

export default SignOutButton;