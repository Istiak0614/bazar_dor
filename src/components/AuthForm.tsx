"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

type Props = {
  mode: "signin" | "signup";
};

const AuthForm = ({ mode }: Props) => {
  const router = useRouter();
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const reportError = (message: string) => {
    setErrorMessage(message);
    toast.error(message);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (busy) {
      return;
    }

    setErrorMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      reportError("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      reportError("পাসওয়ার্ড ৮ থেকে ১২৮ অক্ষরের হতে হবে।");
      return;
    }

    if (isSignup && (!cleanName || cleanName.length > 100)) {
      reportError("আপনার নাম লিখুন, সর্বোচ্চ ১০০ অক্ষর।");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      reportError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setBusy(true);

    try {
      if (isSignup) {
        const result = await authClient.signUp.email({
          name: cleanName,
          email: cleanEmail,
          password,
        });

        if (result.error) {
          reportError(
            result.error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি।",
          );
          return;
        }

        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
        router.replace("/signin");
        router.refresh();
        return;
      }

      const result = await authClient.signIn.email({
        email: cleanEmail,
        password,
      });

      if (result.error) {
        reportError(
          result.error.message ?? "ইমেইল অথবা পাসওয়ার্ড ভুল।",
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch {
      reportError("সংযোগ সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github",
  ) => {
    if (busy) {
      return;
    }

    setBusy(true);
    setErrorMessage("");

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/?auth=success",
        errorCallbackURL: "/signin?error=social",
      });

      if (result.error) {
        reportError(
          result.error.message ?? "সোশ্যাল লগইন শুরু করা যায়নি।",
        );
      }
    } catch {
      reportError("সোশ্যাল লগইনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[416px]">
      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold text-[#202a22]">
          {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
        </h1>

        <p className="mt-2 text-xs leading-6 text-[#6b756c]">
          {isSignup
            ? "বাজারের বিস্তারিত জানতে আপনার অ্যাকাউন্ট তৈরি করুন।"
            : "ইমেইল ও পাসওয়ার্ড দিয়ে আপনার অ্যাকাউন্টে প্রবেশ করুন।"}
        </p>
      </div>

      <div className="rounded-lg border border-[#e0e8e1] bg-[#fbfdfb] p-4 sm:p-5">
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-busy={busy}
          className="space-y-4"
        >
          {isSignup && (
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-medium text-[#202a22]"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="যেমন: রহিম উদ্দিন"
                disabled={busy}
                className="block h-10 w-full rounded-md border border-[#e0e8e1] bg-[#fbfdfb] px-3 text-xs text-[#202a22] outline-none placeholder:text-[#899189] focus:border-[#008d3f] focus:ring-2 focus:ring-green-100 disabled:opacity-60"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium text-[#202a22]"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={busy}
              className="block h-10 w-full rounded-md border border-[#e0e8e1] bg-[#fbfdfb] px-3 text-xs text-[#202a22] outline-none placeholder:text-[#899189] focus:border-[#008d3f] focus:ring-2 focus:ring-green-100 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium text-[#202a22]"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                isSignup ? "new-password" : "current-password"
              }
              maxLength={128}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              disabled={busy}
              className="block h-10 w-full rounded-md border border-[#e0e8e1] bg-[#fbfdfb] px-3 text-xs text-[#202a22] outline-none placeholder:text-[#899189] focus:border-[#008d3f] focus:ring-2 focus:ring-green-100 disabled:opacity-60"
            />
          </div>

          {isSignup && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-medium text-[#202a22]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                maxLength={128}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="আবার লিখুন"
                disabled={busy}
                className="block h-10 w-full rounded-md border border-[#e0e8e1] bg-[#fbfdfb] px-3 text-xs text-[#202a22] outline-none placeholder:text-[#899189] focus:border-[#008d3f] focus:ring-2 focus:ring-green-100 disabled:opacity-60"
              />
            </div>
          )}

          {errorMessage && (
            <p
              role="alert"
              className="rounded-md bg-red-50 px-3 py-2 text-xs leading-5 text-red-600"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#008d3f] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#007333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008d3f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy && (
              <span
                className="loading loading-spinner loading-xs"
                aria-hidden="true"
              />
            )}

            {busy
              ? "অপেক্ষা করুন..."
              : isSignup
                ? "অ্যাকাউন্ট তৈরি করুন"
                : "সাইন ইন"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#e0e8e1]" />
          <span className="text-[10px] text-[#899189]">অথবা</span>
          <span className="h-px flex-1 bg-[#e0e8e1]" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => handleSocialLogin("google")}
            className="flex min-h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-[#e0e8e1] bg-[#fbfdfb] px-2 py-2 text-[10px] font-medium text-[#202a22] transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-[#008d3f] disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
          >
            <FcGoogle
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />

            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={() => handleSocialLogin("github")}
            className="flex min-h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-[#e0e8e1] bg-[#fbfdfb] px-2 py-2 text-[10px] font-medium text-[#202a22] transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-[#008d3f] disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
          >
            <FaGithub
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />

            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] leading-5 text-[#6b756c]">
          {isSignup ? "ইতোমধ্যে অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}

          <Link
            href={isSignup ? "/signin" : "/signup"}
            className="font-medium text-[#008d3f] hover:underline"
          >
            {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>

      <div className="mt-5 text-center">
        <Link
          href="/"
          className="text-[11px] text-[#6b756c] hover:text-[#008d3f]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;