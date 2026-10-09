"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AuthForm = ({ mode = "signin" }) => {
  const router = useRouter();

  const isSignup = mode === "signup";

  const [busy, setBusy] = useState(false);
  const [socialBusy, setSocialBusy] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(
      form.get("confirmPassword") || ""
    );

    if (isSignup && name.length < 2) {
      const message = "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
      setFormError(message);
      toast.error(message);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const message = "সঠিক ইমেইল ঠিকানা লিখুন।";
      setFormError(message);
      toast.error(message);
      return;
    }

    if (password.length < 8) {
      const message = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setFormError(message);
      toast.error(message);
      return;
    }

    if (isSignup && password !== confirmPassword) {
      const message = "দুইটি পাসওয়ার্ড মিলছে না।";
      setFormError(message);
      toast.error(message);
      return;
    }

    setBusy(true);

    try {
      let result;

      if (isSignup) {
        result = await authClient.signUp.email({
          name,
          email,
          password,
        });
      } else {
        result = await authClient.signIn.email({
          email,
          password,
        });
      }

      if (result.error) {
        throw new Error(
          result.error.message || "অনুরোধ সম্পন্ন হয়নি।"
        );
      }

      if (isSignup) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
        router.replace("/signin");
      } else {
        toast.success("সফলভাবে সাইন ইন করেছেন।");
        router.replace("/");
      }

      router.refresh();
    } catch (error) {
      const message = error.message || "আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialBusy(provider);
    setFormError("");

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/?auth=success",
        errorCallbackURL: "/signin?error=social",
      });

      if (result.error) {
        throw new Error(
          result.error.message || "সোশ্যাল লগইন শুরু হয়নি।"
        );
      }
    } catch (error) {
      const message =
        error.message || "সোশ্যাল লগইন শুরু করা যায়নি।";

      setFormError(message);
      toast.error(message);
    } finally {
      setSocialBusy("");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-heading">
        <h1>
          {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
        </h1>

        <p>
          {isSignup
            ? "বাজার দর জানতে আপনার নতুন অ্যাকাউন্ট তৈরি করুন।"
            : "আপনার অ্যাকাউন্টে প্রবেশ করে বিস্তারিত বাজারদর দেখুন।"}
        </p>
      </div>

      <div className="auth-card">
        <form
          onSubmit={handleSubmit}
          className="form-stack"
          noValidate
        >
          {isSignup && (
            <label className="field-label">
              নাম

              <input
                className="input input-bordered"
                name="name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                maxLength={100}
                required
              />
            </label>
          )}

          <label className="field-label">
            ইমেইল

            <input
              className="input input-bordered"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="field-label">
            পাসওয়ার্ড

            <input
              className="input input-bordered"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete={
                isSignup ? "new-password" : "current-password"
              }
              minLength={8}
              maxLength={128}
              required
            />
          </label>

          {isSignup && (
            <label className="field-label">
              পাসওয়ার্ড নিশ্চিত করুন

              <input
                className="input input-bordered"
                name="confirmPassword"
                type="password"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                autoComplete="new-password"
                required
              />
            </label>
          )}

          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={busy || Boolean(socialBusy)}
          >
            {busy && (
              <span className="loading loading-spinner loading-xs" />
            )}

            {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
          </button>
        </form>

        <div className="divider text-xs">অথবা</div>

        <div className="social-buttons">
          <button
            type="button"
            className="btn btn-outline"
            disabled={busy || Boolean(socialBusy)}
            onClick={() => {
              handleSocialLogin("google");
            }}
          >
            <span aria-hidden="true">G</span>
            {socialBusy === "google" ? "অপেক্ষা করুন…" : "Google"}
          </button>

          <button
            type="button"
            className="btn btn-outline"
            disabled={busy || Boolean(socialBusy)}
            onClick={() => {
              handleSocialLogin("github");
            }}
          >
            <span aria-hidden="true">◉</span>
            {socialBusy === "github" ? "অপেক্ষা করুন…" : "GitHub"}
          </button>
        </div>

        <p className="auth-switch">
          {isSignup
            ? "ইতোমধ্যে অ্যাকাউন্ট আছে? "
            : "অ্যাকাউন্ট নেই? "}

          <Link href={isSignup ? "/signin" : "/signup"}>
            {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;