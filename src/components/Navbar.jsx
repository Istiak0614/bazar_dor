
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronDown,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const categories = [
  { name: "চাল", icon: "🍚", href: "/category/rice" },
  { name: "ডাল", icon: "🫘", href: "/category/lentils" },
  { name: "তেল", icon: "🛢️", href: "/category/oil" },
  { name: "সবজি", icon: "🥬", href: "/category/vegetables" },
  { name: "মাছ", icon: "🐟", href: "/category/fish" },
  { name: "মাংস", icon: "🍗", href: "/category/meat" },
  { name: "ডিম-দুধ", icon: "🥛", href: "/category/eggs-milk" },
  { name: "মসলা", icon: "🌶️", href: "/category/spices" },
];

const marketPrices = [
  { name: "স্বর্ণালি চাল", price: 48, unit: "কেজি", change: 2.5 },
  { name: "মিনিকেট চাল", price: 90, unit: "কেজি", change: -2.0 },
  { name: "বাটার মসুর", price: 118, unit: "কেজি", change: 1.2 },
  { name: "ফার্ম ডিম", price: 48, unit: "হালি", change: 2.5 },
  { name: "ভোলা", price: 120, unit: "কেজি", change: -1.4 },
  { name: "আলুর ডাল", price: 80, unit: "কেজি", change: 0 },
];

const Navbar = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="w-full bg-[#f8faf9] border-b border-gray-200">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          <Link href="/" className="flex items-center gap-3">
    
            <div className="relative w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="বাজার দর Logo"
                fill
                sizes="40px"
                className="object-contain"
              />
      
              <span className="text-white text-xs">লোগো</span>
            </div>

            <div className="flex flex-col">
              <h1 className="text-[19px] font-bold text-gray-900 leading-tight">
                বাজার দর
              </h1>
              <p className="text-[11px] text-gray-500 mt-1">
                {today}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              
              <span className="text-sm">👤</span>
            </div>

            <span className="text-sm font-medium text-gray-800">
              Rezwan
            </span>

            <FaChevronDown className="text-[9px] text-gray-600" />
          </div>
        </div>
      </div>

      <nav className="border-t border-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 md:gap-8 h-[44px] overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                <span className="text-[13px]">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="w-full bg-white border-b border-gray-200 overflow-hidden">
        <div className="flex items-center w-max min-w-full h-[35px] animate-market-scroll hover:[animation-play-state:paused]">
          {[...marketPrices, ...marketPrices].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 border-r border-gray-200 whitespace-nowrap"
            >
              <span className="text-xs">🪙</span>

              <span className="text-[12px] text-gray-700 font-medium">
                {item.name} :
                {" "}
                {item.price} টাকা/{item.unit}
              </span>

              {item.change > 0 ? (
                <span className="flex items-center gap-1 text-red-500 text-[11px] font-semibold">
                  <FaArrowUp className="text-[9px]" />
                  {item.change}%
                </span>
              ) : item.change < 0 ? (
                <span className="flex items-center gap-1 text-green-600 text-[11px] font-semibold">
                  <FaArrowDown className="text-[9px]" />
                  {Math.abs(item.change)}%
                </span>
              ) : (
                <span className="text-gray-500 text-[11px]">
                  0%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
