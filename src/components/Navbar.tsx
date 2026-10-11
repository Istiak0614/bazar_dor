"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";
import { categories } from "@/lib/categories";
import { banglaDate } from "@/lib/format";
import ReservedImage from "@/components/ReservedImage";
import SignOutButton from "@/components/SignOutButton";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(banglaDate());
  }, []);

  return (
    <header className="border-b border-[#dfe8e0] bg-[#fbfdfb]">
      <div className="wrap flex min-h-20 items-center justify-between gap-3 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <ReservedImage
            src="/images/logo.png"
            alt="বাজার দর লোগো"
            width={44}
            height={44}
            fallback="🛒"
            className="h-11 w-11 object-contain"
          />

          <div>
            <p className="text-lg font-bold leading-tight">বাজার দর</p>
            <p className="mt-1 min-h-4 text-[10px] text-gray-500 sm:text-xs">
              {date || "বাংলাদেশের বাজারের দাম"}
            </p>
          </div>
        </Link>

        {isPending ? (
          <div className="skeleton h-9 w-28" />
        ) : session ? (
          <details className="dropdown dropdown-end">
            <summary className="btn btn-sm border-green-100 bg-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-brand">
                {session.user.name.charAt(0).toUpperCase()}
              </span>
              <span className="max-w-24 truncate">
                {session.user.name}
              </span>
              <span aria-hidden="true">⌄</span>
            </summary>

            <div className="dropdown-content z-30 mt-2 w-48 rounded-xl border border-green-100 bg-white p-3 shadow-lg">
              <Link
                href="/profile"
                className="mb-3 block rounded-lg p-2 text-sm hover:bg-green-50"
              >
                আমার প্রোফাইল
              </Link>

              <SignOutButton />
            </div>
          </details>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="btn btn-ghost btn-sm px-2"
            >
              সাইন ইন
            </Link>

            <Link href="/signup" className="btn btn-brand btn-sm">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <nav
        aria-label="পণ্যের বিভাগ"
        className="wrap flex items-center gap-1 overflow-x-auto pb-3"
      >
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className={`shrink-0 rounded-md px-3 py-2 text-xs sm:text-sm ${
            pathname === "/"
              ? "bg-green-100 font-semibold text-brand"
              : "text-gray-600 hover:bg-green-50"
          }`}
        >
          সব পণ্য
        </Link>

        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const active = pathname === href;

          return (
            <Link
              key={category.slug}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-md px-3 py-2 text-xs sm:text-sm ${
                active
                  ? "bg-green-100 font-semibold text-brand"
                  : "text-gray-600 hover:bg-green-50"
              }`}
            >
              {category.icon} {category.nameBn}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;