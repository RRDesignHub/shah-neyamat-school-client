import React from "react";
import { Link } from "react-router-dom";
import logo from './../../assets/logo.png'
export const Footer = () => {
  return (
    <footer className="bg-green-800 text-green-50 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-evenly items-center">
          {/* School Logo and Name */}
          <div className="text-center flex flex-col md:flex-row items-center gap-3 md:text-left mb-4 md:mb-0">
            <img className="w-20 drop-shadow-[0_5px_15px_#02160b]" src={logo} alt="" />
            <div >
              <h2 className="text-lg md:text-xl font-bold">
              শাহ্ নেয়ামত (রহঃ) কেজি এন্ড হাই স্কুল
              </h2>
              <p className="text-sm">Inspiring Excellence, Building Futures</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex max-sm:flex-wrap max-sm:space-x-4 space-x-6 text-sm">
            <Link to="/" className="link link-hover">
              হোম
            </Link>
            <Link to="/teachers" className="link link-hover">
              শিক্ষক/শিক্ষিকা
            </Link>
            <Link to="/all-notice" className="link link-hover">
              নোটিশ
            </Link>
            <Link to="/client-result" className="link link-hover">
              ফলাফল অনুসন্ধান 
            </Link>
          </div>
        </div>

      <div className="divider bg-[rgba(5,46,22,0.48)] h-[1px]"></div>
        {/* Bottom Section */}
        <div className="text-center flex flex-col md:flex-row justify-center items-center">
          
          {/* Copyright */}
          <div className="text-center text-sm md:mb-0">
            <p>
              © 2024 Shah Neyamat (RH:) KG & High School. All rights reserved.
            </p>
            <small>
              Designed & developed by{" "}
              <Link
                className="font-semibold text-white underline"
                to="https://ripanulalam.netlify.app"
              >
                Ripanul Alam
              </Link>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};
