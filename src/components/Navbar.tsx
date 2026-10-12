"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import { authClient } from "@/lib/auth-client";
import { categories } from "@/lib/categories";
import { banglaDate } from "@/lib/format";
import ReservedImage from "@/components/ReservedImage";
import SignOutButton from "@/components/SignOutButton";
import UserAvatar from "@/components/UserAvatar";

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
          <details key={pathname} className="dropdown dropdown-end">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1 hover:bg-green-50 [&::-webkit-details-marker]:hidden">
              <UserAvatar
                name={session.user.name}
                image={session.user.image}
                size={28}
              />

              <span className="max-w-24 truncate text-xs font-medium text-[#202a22]">
                {session.user.name.split(" ")[0]}
              </span>

              <span aria-hidden="true" className="text-[8px] text-[#6b756c]">
                ▾
              </span>
            </summary>

            <div className="dropdown-content z-30 mt-2 w-56 rounded-lg border border-[#e0e8e1] bg-[#fbfdfb] p-3 shadow-lg">
              <div className="border-b border-[#e0e8e1] px-2 pb-2">
                <p className="truncate text-xs font-semibold text-[#202a22]">
                  {session.user.name}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-[#6b756c]">
                  {session.user.email}
                </p>
              </div>

              <Link
                href="/profile"
                className="mt-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-[#202a22] hover:bg-green-50"
              >
                <span aria-hidden="true">👤</span>
                আমার প্রোফাইল
              </Link>

              <SignOutButton variant="menu" />
            </div>
          </details>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="px-2 py-1 text-xs font-medium text-[#202a22] hover:text-[#008d3f]"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-[#008d3f] px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#007333]"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <nav className="wrap bz-category-nav" aria-label="পণ্যের বিভাগ">
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
              <span aria-hidden="true">{category.icon}</span>{" "}
              {category.nameBn}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;