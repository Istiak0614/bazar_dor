import Link from "next/link";

const notFound = () => {
  return (
    <div className="container-shell not-found-page">
      <div className="panel not-found-card">
        <span className="not-found-icon" aria-hidden="true">
          🛒
        </span>

        <p className="not-found-code">৪০৪</p>

        <h1>পেজ বা পণ্য পাওয়া যায়নি</h1>

        <p>
          এই ঠিকানাটি সঠিক নয়, অথবা এই বিভাগে বর্তমানে
          কোনো পণ্য নেই।
        </p>

        <Link href="/" className="btn btn-primary">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default notFound;