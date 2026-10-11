"use client";

import { Toaster } from "react-hot-toast";
import Feedback from "@/components/Feedback";

const Providers = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Feedback />
    </>
  );
};

export default Providers;