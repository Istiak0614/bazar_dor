import Link from "next/link";
import { requireSession } from "@/lib/session";
import SignOutButton from "@/components/SignOutButton";

const page = async () => {
  const session = await requireSession();

  return (
    <div className="wrap py-12">
      <section className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য।
        </p>

        <div className="panel mt-6 p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-brand">
                {session.user.name.charAt(0).toUpperCase()}
              </span>

              <div className="min-w-0">
                <h2 className="font-bold">{session.user.name}</h2>
                <p className="break-all text-sm text-gray-500">
                  {session.user.email}
                </p>
              </div>
            </div>

            <SignOutButton />
          </div>

          <div className="mt-7 border-t border-green-100 pt-5">
            <p className="text-xs text-gray-500">নাম</p>
            <p className="mt-2 font-semibold">{session.user.name}</p>

            <Link
              href="/profile/update"
              className="btn btn-brand mt-5"
            >
              তথ্য আপডেট করুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;