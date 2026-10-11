"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type Props = {
  initialName: string;
};

const ProfileUpdateForm = ({ initialName }: Props) => {
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
      router.replace("/profile");
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
    <form onSubmit={handleSubmit} noValidate className="panel mt-6 p-6">
      <label htmlFor="profileName" className="mb-2 block text-sm">
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
        className="control"
      />

      {errorMessage && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="btn btn-brand mt-5 w-full"
      >
        {busy ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
      </button>

      <Link
        href="/profile"
        className="mt-4 block text-center text-sm text-gray-500 hover:text-brand"
      >
        প্রোফাইলে ফিরে যান
      </Link>
    </form>
  );
};

export default ProfileUpdateForm;