"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const Feedback = () => {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const url = new URL(window.location.href);
    let changed = false;

    if (url.searchParams.get("reason") === "protected") {
      toast.error("বিস্তারিত দেখতে প্রথমে সাইন ইন করুন।", {
        id: "protected-route",
      });

      url.searchParams.delete("reason");
      changed = true;
    }

    if (url.searchParams.has("error")) {
      toast.error("সোশ্যাল লগইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।", {
        id: "social-error",
      });

      url.searchParams.delete("error");
      changed = true;
    }

    if (
      url.searchParams.get("auth") === "success" &&
      !isPending
    ) {
      if (session) {
        toast.success("সফলভাবে সাইন ইন হয়েছে।", {
          id: "social-success",
        });
      }

      url.searchParams.delete("auth");
      changed = true;
    }

    if (changed) {
      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
  }, [pathname, session, isPending]);

  return null;
};

export default Feedback;