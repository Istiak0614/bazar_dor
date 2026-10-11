import Link from "next/link";

const NotFound = () => {
  return (
    <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-7xl font-bold text-brand">৪০৪</p>

      <h1 className="mt-5 text-2xl font-bold">
        পেজ বা পণ্য পাওয়া যায়নি
      </h1>

      <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
        এই ঠিকানাটি সঠিক নয়, অথবা পণ্যটি বর্তমানে পাওয়া যাচ্ছে না।
      </p>

      <Link href="/" className="btn btn-brand mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;