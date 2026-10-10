"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UpdateProfileForm = ({ initialName }) => {
  const router = useRouter();

  const [name, setName] = useState(initialName || "");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      toast.error("নাম ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে।");
      return;
    }

    setBusy(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success("আপনার তথ্য আপডেট হয়েছে।");
      router.replace("/profile");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      className="form-stack"
      onSubmit={handleSubmit}
    >
      <label className="field-label">
        নাম

        <input
          className="input input-bordered"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          autoComplete="name"
          maxLength={100}
          required
        />
      </label>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={busy}
      >
        {busy && (
          <span className="loading loading-spinner loading-xs" />
        )}

        তথ্য আপডেট করুন
      </button>
    </form>
  );
};

export default UpdateProfileForm;