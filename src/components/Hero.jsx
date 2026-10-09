const BANNER_SRC = "/images/banner.jpg";

const Hero = () => {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">
          প্রতিদিনের বাজার • আপডেটেড দাম
        </p>

        <h1>আজকের বাজারের দাম এক নজরে</h1>

        <p className="hero-description">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয়
          পণ্যের দাম জানুন। বাজারে যাওয়ার আগে আজকের দাম
          তুলনা করুন।
        </p>

        <a
          href="#সব-পণ্য"
          className="btn btn-primary"
        >
          সব পণ্য দেখুন →
        </a>
      </div>

      <div className="banner-slot">
        {BANNER_SRC ? (
          <img
            src={BANNER_SRC}
            alt="তাজা বাজারের পণ্যের ঝুড়ি"
            width="320"
            height="260"
            className="banner-image"
          />
        ) : (
          <div className="banner-placeholder">
            <span aria-hidden="true">🧺</span>
            <p>আপনার ব্যানার ছবির জায়গা</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;