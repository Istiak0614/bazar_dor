"use client";

import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ reset }: Props) => {
  return (
    <div className="wrap py-16 text-center">
      <p className="text-5xl">🧺</p>

      <h1 className="mt-5 text-2xl font-bold">
        তথ্য লোড করা যায়নি
      </h1>

      <p className="mt-3 text-sm text-gray-500">
        সংযোগ অথবা সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="btn btn-brand"
        >
          আবার চেষ্টা করুন
        </button>

        <Link href="/" className="btn bg-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;