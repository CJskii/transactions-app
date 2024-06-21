import { Container } from "@/components/containter";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { ChainId } from "@/pages";
import { Typography } from "../ui/typography";
import { CHAINS } from "@/constants/chains";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionTable } from "./address-tx-table";
import { BalanceComponent } from "./address-balance";
import { Separator } from "@/components/ui/separator";
import { SearchComponent } from "./address-search";

export interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}

const AddressDetailsComponent = () => {
  const router = useRouter();
  const { chainId, address } = router.query;

  const [selectedChainId, setSelectedChainId] = useState<ChainId>(1);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const { transactions, loading, error } = useTransactions(
    selectedAddress,
    selectedChainId
  );

  useEffect(() => {
    if (chainId) {
      setSelectedChainId(parseInt(chainId as string));
    }
    if (address) {
      setSelectedAddress(address as string);
    }
  }, [chainId, address]);

  return (
    <Container>
      <div className="flex flex-col justify-center items-center w-full md:mt-0 mt-12">
        <div className="flex flex-col md:flex-row justify-start items-center p-4 gap-4 w-full">
          <Typography variant={"h4"}>Address: </Typography>
          <Typography
            variant={"small"}
            className="md:text-lg text-sm font-normal"
          >
            {selectedAddress}
          </Typography>
        </div>

        <Separator className="w-full" />

        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:gap-4 w-full">
          <BalanceComponent
            address={selectedAddress}
            chainId={selectedChainId}
          />
          <SearchComponent
            address={selectedAddress}
            chainId={selectedChainId}
          />
        </div>

        {loading && <p>Loading transactions...</p>}
        {error && <p>Error fetching transactions: {error}</p>}

        {!loading && !error && (
          <div className="w-full">
            <TransactionTable
              transactions={transactions}
              chainId={selectedChainId}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AddressDetailsComponent;
