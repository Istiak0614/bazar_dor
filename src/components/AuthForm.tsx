"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
      reportError("নাম লিখুন, সর্বোচ্চ ১০০ অক্ষর।");
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
      reportError("সোশ্যাল লগইনে সমস্যা হয়েছে।");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[416px]">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">
          {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {isSignup
            ? "বাজারের বিস্তারিত জানতে আপনার অ্যাকাউন্ট তৈরি করুন।"
            : "ইমেইল ও পাসওয়ার্ড দিয়ে আপনার অ্যাকাউন্টে প্রবেশ করুন।"}
        </p>
      </div>

      <div className="panel p-5 sm:p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {isSignup && (
            <div>
              <label htmlFor="name" className="mb-2 block text-sm">
                নাম
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="control"
                disabled={busy}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="control"
              disabled={busy}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              autoComplete={
                isSignup ? "new-password" : "current-password"
              }
              maxLength={128}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="control"
              disabled={busy}
            />
          </div>

          {isSignup && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                maxLength={128}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="আবার পাসওয়ার্ড লিখুন"
                className="control"
                disabled={busy}
              />
            </div>
          )}

          {errorMessage && (
            <p role="alert" className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn btn-brand w-full"
          >
            {busy
              ? "অপেক্ষা করুন..."
              : isSignup
                ? "অ্যাকাউন্ট তৈরি করুন"
                : "সাইন ইন"}
          </button>
        </form>

        <div className="divider my-5 text-xs text-gray-400">অথবা</div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => handleSocialLogin("google")}
            className="btn h-auto min-h-11 border-gray-200 bg-white py-2 text-xs"
          >
            <span className="font-bold text-blue-600">G</span>
            Google দিয়ে প্রবেশ
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={() => handleSocialLogin("github")}
            className="btn h-auto min-h-11 border-gray-200 bg-white py-2 text-xs"
          >
            GitHub দিয়ে প্রবেশ
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-gray-500">
          {isSignup ? "ইতোমধ্যে অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}

          <Link
            href={isSignup ? "/signin" : "/signup"}
            className="font-semibold text-brand hover:underline"
          >
            {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-gray-500 hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;