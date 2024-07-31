import React from "react";
import BreakLine from "./BreakLine";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <BreakLine />
      <div className="grid grid-rows-1 sm:grid-cols-3 grid-cols-2 items-center justify-start lg:px-28 px-7 md:px-12 py-9">
        <div className="flex flex-col h-full justify-start gap-2">
          <div>Location</div>
          <div>Toronto, Canada</div>
        </div>
        <div className="flex flex-col h-full justify-start gap-2">
          <div>Links</div>
          <div>
            <Link href={"/about"}>About</Link>
          </div>
          <div>
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
