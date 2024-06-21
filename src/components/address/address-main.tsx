import { Container } from "@/components/containter";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { ChainId } from "@/pages";
import { Typography } from "../ui/typography";
import { SelectChainDropdown } from "@/components/select-chain";
import { CHAINS } from "@/constants/chains";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionTable } from "./address-tx-table";
import { BalanceComponent } from "./address-balance";

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

        <BalanceComponent address={selectedAddress} chainId={selectedChainId} />

        {loading && <p>Loading transactions...</p>}
        {error && <p>Error fetching transactions: {error}</p>}

        {!loading && !error && (
          <div className="w-full">
            <TransactionTable transactions={transactions} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AddressDetailsComponent;
