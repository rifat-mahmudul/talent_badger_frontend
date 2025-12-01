"use client";
import { Mail, MapPinPlusInside, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#DDFFFF]">
      {/* Top Section */}
      <div className="container mx-auto pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-[200px] text-white px-4">
        {/* Logo & Description */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* <Image
            src="/logo.png"
            alt="logo"
            width={900}
            height={900}
            className="w-[200px] h-[100px] -ml-[50px] "
          /> */}
          <Link href="/" className="flex-shrink-0 py-2 pt-10">
            <h5
              className="
                text-3xl 
                font-extrabold 
                bg-gradient-to-r 
                from-[#0F595A] 
                to-[#0F595A] 
                text-transparent 
                bg-clip-text
                select-none
              "
            >
              Talent Badger
            </h5>
          </Link>
          <p className="text-[#434C45] -ml-[10px]  ">
            Empowering financial decisions through transparent credit scoring
            and connecting borrowers with trusted lenders.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[#434C45] font-semibold mb-6">Quick Links</p>
          <ul className="space-y-4">
            <li className="text-[#434C45] font-medium text-[16px]">Home</li>
            <li className="text-[#434C45] font-medium text-[16px]">Services</li>
            <li className="text-[#434C45] font-medium text-[16px]">
              Team Picker
            </li>
            <li className="text-[#434C45] font-medium text-[16px]">
              Industries
            </li>
            <li className="text-[#434C45] font-medium text-[16px]">Blog</li>
            <li className="text-[#434C45] font-medium text-[16px]">Contact</li>
            <li className="text-[#434C45] font-medium text-[16px]">FAQ’S</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[#434C45] font-semibold">Contact Us</p>
          <ul className="space-y-4 mt-6">
            <li className="flex justify-center lg:justify-start gap-2 text-[#434C45] font-medium text-[16px]">
              <MapPinPlusInside size={20} /> 123 Finance Street Douala, Cameroon
            </li>
            <li className="flex justify-center lg:justify-start gap-2 text-[#434C45] font-medium text-[16px]">
              <Phone size={20} /> +237 123 456 789
            </li>
            <li className="flex justify-center lg:justify-start gap-2 text-[#434C45] font-medium text-[16px]">
              <Mail size={20} /> Team Picker
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t container mx-auto border-gray-300" />

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-[#434C45] text-center md:text-left gap-4 mt-6 pb-11 px-4">
        <p>© 2025 Talent Badger. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy">
            <span>Privacy Policy</span>
          </Link>
          <Link href="/trams&condition">
            <span>Terms of Service</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
