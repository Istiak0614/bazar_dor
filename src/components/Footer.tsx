const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#dfe8e0] bg-white py-6">
      <div className="wrap flex flex-col gap-3 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-bold text-gray-800">বাজার দর</span>
          {" — "}
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;