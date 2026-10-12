"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type Props = {
  initialName: string;
  // Where to go after a successful update (none = stay on the page).
  redirectTo?: string;
};

const ProfileUpdateForm = ({ initialName, redirectTo }: Props) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    setErrorMessage("");

    if (!cleanName || cleanName.length > 100) {
      const message = "নাম লিখুন, সর্বোচ্চ ১০০ অক্ষর।";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setBusy(true);

    try {
      const result = await authClient.updateUser({
        name: cleanName,
      });

      if (result.error) {
        const message =
          result.error.message ?? "তথ্য আপডেট করা যায়নি।";

        setErrorMessage(message);
        toast.error(message);
        return;
      }

      toast.success("আপনার তথ্য আপডেট হয়েছে।");

      if (redirectTo) {
        router.replace(redirectTo);
      }

      router.refresh();
    } catch {
      const message = "সংযোগ সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4 sm:px-3">
      <label
        htmlFor="profileName"
        className="mb-1.5 block text-xs font-medium text-[#202a22]"
      >
        নাম
      </label>

      <input
        id="profileName"
        type="text"
        autoComplete="name"
        maxLength={100}
        value={name}
        onChange={(event) => setName(event.target.value)}
        disabled={busy}
        className="block h-10 w-full rounded-md border border-[#e0e8e1] bg-[#fbfdfb] px-3 text-xs text-[#202a22] outline-none focus:border-[#008d3f] focus:ring-2 focus:ring-green-100 disabled:opacity-60"
      />

      {errorMessage && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-3 flex h-10 w-full items-center justify-center rounded-md bg-[#008d3f] text-xs font-semibold text-white shadow-md transition hover:bg-[#007333] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "আপডেট হচ্ছে..." : "আপডেট"}
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
