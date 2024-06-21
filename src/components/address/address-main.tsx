import { useRouter } from "next/router";
import { Container } from "@/components/containter";
import { useState, useEffect } from "react";

import { ChainId } from "@/pages";
import { Typography } from "../ui/typography";
import { SelectChainDropdown } from "@/components/select-chain";
import { CHAINS } from "@/constants/chains";

const AddressDetailsComponent = () => {
  const router = useRouter();
  const { chainId, address } = router.query;

  const [selectedChainId, setSelectedChainId] = useState<ChainId | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  useEffect(() => {
    if (chainId) {
      setSelectedChainId(parseInt(chainId as string));
    }
    if (address) {
      setSelectedAddress(address as string);
    }
  }, [chainId, address]);

  const handleChainChange = (newChainId: number) => {
    setSelectedChainId(newChainId);
    if (selectedAddress) {
      router.push(`/address/${newChainId}/${selectedAddress}`);
    }
  };

  const selectedChainName =
    CHAINS.find((chain) => chain.id === selectedChainId)?.name ||
    "Select Chain";

  return (
    <Container>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center p-4 gap-4">
          <Typography variant={"h3"}>Address: {address}</Typography>
          <SelectChainDropdown
            selectedChainName={selectedChainName}
            chains={CHAINS}
            onChange={handleChainChange}
          />
        </div>

        <div>Details table goes here</div>
      </div>
    </Container>
  );
};

export default AddressDetailsComponent;
