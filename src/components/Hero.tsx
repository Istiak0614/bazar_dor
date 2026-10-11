import ReservedImage from "@/components/ReservedImage";

const Hero = () => {
  return (
    <section className="panel bz-hero">
      <div>
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[11px] text-green-700">
          প্রতিদিনের বাজার, এক নজরে
        </span>

        <h1 className="bz-hero-title">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="bz-hero-description">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
          বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
          পরিবর্তন এক জায়গায়।
        </p>

        <a href="#সব-পণ্য" className="btn btn-brand btn-sm mt-5">
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="bz-hero-image">
        <ReservedImage
          src="/image/bazar-hero.png"
          alt="বাজারের পণ্যের ব্যানার"
          width={240}
          height={180}
          fallback="🧺 আপনার ব্যানার ছবি"
          className="w-[240px] max-w-full object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;