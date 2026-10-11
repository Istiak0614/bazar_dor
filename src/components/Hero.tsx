import ReservedImage from "@/components/ReservedImage";

const Hero = () => {
  return (
    <section className="panel mb-8 flex flex-col items-center justify-between gap-8 px-6 py-8 sm:px-8 md:flex-row md:py-10">
      <div className="max-w-xl">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
          প্রতিদিনের বাজার, এক নজরে
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-500">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
          বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
          পরিবর্তন এক জায়গায়।
        </p>

        <a href="#সব-পণ্য" className="btn btn-brand btn-sm mt-5 sm:btn-md">
          সব পণ্য দেখুন
        </a>
      </div>

      {/* Put your own banner at public/images/banner.png */}
      <ReservedImage
        src="/images/banner.png"
        alt="বাজারের পণ্যের ব্যানার"
        width={320}
        height={240}
        fallback="🧺 এখানে আপনার ব্যানার ছবি"
        className="w-56 shrink-0 object-contain sm:w-64"
      />
    </section>
  );
};

export default Hero;