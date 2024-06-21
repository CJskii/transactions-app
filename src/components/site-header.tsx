"use client";
import Link from "next/link";
import React from "react";
import { Typography } from "./ui/typography";

export function SiteHeader() {
  return (
    <div className="fixed z-50 flex w-full justify-between items-center border-b border-neutral-400/50 bg-white/50 p-4 backdrop-blur-xl dark:bg-black/50 md:px-16 md:py-4">
      <div className="flex-1 md:block">
        <Link href={"/"}>
          <Typography variant="h2" className="text-2xl font-bold">
            Tx Checker
          </Typography>
        </Link>
      </div>
      <Link href={"/"} className="md:hidden"></Link>

      <div className="flex-1 justify-center hidden items-center gap-3 lg:flex">
        {/* Navi Links  */}
      </div>

      <div className="flex-1  justify-end items-center gap-3 hidden  lg:flex"></div>
    </div>
  );
}
