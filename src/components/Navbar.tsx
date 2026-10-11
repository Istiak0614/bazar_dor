"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import { authClient } from "@/lib/auth-client";
import { categories } from "@/lib/categories";
import { banglaDate } from "@/lib/format";
import ReservedImage from "@/components/ReservedImage";
import SignOutButton from "@/components/SignOutButton";

const subscribeDate = () => {
  return () => {};
};

const getServerDate = () => "";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const date = useSyncExternalStore(
    subscribeDate,
    banglaDate,
    getServerDate,
  );

  return (
    <header className="bz-navbar">
      <div className="wrap bz-navbar-top">
        <Link href="/" className="flex shrink-0 items-center gap-2">
  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#008d3f]">
    <ReservedImage
      src="/image/logo-icon.png"
      alt="বাজার দর লোগো"
      width={24}
      height={24}
      fallback="🛒"
      className="h-6 w-6 object-contain brightness-0 invert"
    />
  </div>

  <div>
    <p className="text-sm font-bold leading-tight text-[#202a22]">
      বাজার দর
    </p>

    <p className="mt-1 min-h-3 text-[10px] leading-tight text-[#6b756c]">
      {date}
    </p>
  </div>
</Link>

        {isPending ? (
          <div className="skeleton h-8 w-24" />
        ) : session ? (
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost btn-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-brand">
                {session.user.name.charAt(0).toUpperCase()}
              </span>

              <span className="max-w-24 truncate text-[#202a22]">
                {session.user.name}
              </span>

              <span aria-hidden="true">⌄</span>
            </summary>

            <div className="dropdown-content z-30 mt-2 w-48 rounded-lg border border-green-100 bg-white p-3 shadow-lg">
              <Link
                href="/profile"
                className="mb-3 block rounded-md p-2 text-sm text-gray-700 hover:bg-green-50"
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
              className="btn btn-ghost btn-sm text-gray-700"
            >
              সাইন ইন
            </Link>

            <Link href="/signup" className="btn btn-brand btn-sm">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <nav className="wrap bz-category-nav" aria-label="পণ্যের বিভাগ">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className={`bz-category-link ${
            pathname === "/" ? "active" : ""
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
              className={`bz-category-link ${active ? "active" : ""}`}
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