"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Typography } from "./ui/typography";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SelectChainDropdown } from "./select-chain";
import { CHAINS } from "@/constants/chains";

export function SiteHeader() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedChainId, setSelectedChainId] = useState(1);

  const handleSearch = () => {
    if (searchInput.length === 42 && searchInput.startsWith("0x")) {
      router.push(`/address/${selectedChainId}/${searchInput}`);
    } else if (searchInput.length === 66 && searchInput.startsWith("0x")) {
      router.push(`/tx/${selectedChainId}/${searchInput}`);
    } else {
      router.push("/error");
    }
  };

  const handleChainChange = (newChainId: number) => {
    setSelectedChainId(newChainId);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const selectedChainName =
    CHAINS.find((chain) => chain.id === selectedChainId)?.name ||
    "Select Chain";

  return (
    <div className="fixed z-50 flex w-full justify-between items-center border-b border-neutral-400/50 bg-white/50 p-4 backdrop-blur-xl dark:bg-black/50 md:px-16 md:py-4">
      <div className="flex-1 lg:block hidden">
        <Link href={"/"}>
          <Typography variant="h2" className="text-2xl font-bold">
            Tx Checker
          </Typography>
        </Link>
      </div>

      <div className="flex-1 flex justify-center items-center gap-3 w-full md:w-auto">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter address or transaction hash"
          onKeyDown={handleKeyPress}
          className="w-full md:w-auto"
        />
        <SelectChainDropdown
          selectedChainName={selectedChainName}
          chains={CHAINS}
          onChange={handleChainChange}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}
