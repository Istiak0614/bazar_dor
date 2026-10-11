"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallback: string;
  className?: string;
};

const ReservedImage = ({
  src,
  alt,
  width,
  height,
  fallback,
  className = "",
}: Props) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-dashed border-green-300 bg-green-50 text-center text-green-700 ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}
        role="img"
        aria-label={alt}
      >
        {fallback}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setFailed(true)}
    />
  );
};

export default ReservedImage;