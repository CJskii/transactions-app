import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CHAINS } from "@/constants/chains";
import { SelectChainDropdown } from "@/components/select-chain";

interface SearchComponentProps {
  address: string;
  chainId: number;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  address,
  chainId,
}) => {
  const [searchAddress, setSearchAddress] = useState(address);
  const [selectedChainId, setSelectedChainId] = useState(chainId);
  const router = useRouter();

  const handleSearch = () => {
    if (searchAddress && selectedChainId) {
      router.push(`/address/${selectedChainId}/${searchAddress}`);
    }
  };

  const handleChainChange = (newChainId: number) => {
    setSelectedChainId(newChainId);
  };

  return (
    <Card className="overflow-hidden md:w-4/6 w-full h-fit bg-transparent my-8">
      <CardHeader className="flex flex-col items-start justify-center">
        <CardTitle className="group flex items-center gap-2 text-xl tracking-wider text-left">
          Search
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 text-sm bg-dashboardCard-background">
        <div className="grid gap-3">
          <div className="flex flex-col gap-3">
            <label className="text-muted-foreground">Address</label>
            <Input
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-muted-foreground">Network</label>
            <SelectChainDropdown
              selectedChainName={
                CHAINS.find((chain) => chain.id === selectedChainId)?.name ||
                "Select Chain"
              }
              chains={CHAINS}
              onChange={handleChainChange}
            />
          </div>
          <Button onClick={handleSearch} className="mt-4">
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
