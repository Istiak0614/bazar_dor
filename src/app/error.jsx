"use client";

import Link from "next/link";

const error = ({ reset }) => {
  return (
    <div className="container-shell not-found-page">
      <div className="panel not-found-card">
        <h1>তথ্য লোড করা যায়নি</h1>

        <p>
          সংযোগে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              reset();
            }}
          >
            আবার চেষ্টা করুন
          </button>

          <Link href="/" className="btn btn-outline">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default error;