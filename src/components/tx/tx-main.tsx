import { useRouter } from "next/router";
import { Container } from "@/components/containter";
import { useTransactionDetails } from "@/hooks/useTransactionDetails";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { ethers } from "ethers";
import { Badge } from "@/components/ui/badge";

export interface TransactionDetails {
  blockNumber: string;
  timestamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  confirmations: string;
  status: string;
  input: string;
  contractAddress: string;
}

const TransactionDetailsComponent = () => {
  const router = useRouter();
  const { chainId, hash } = router.query;

  const { transactionDetails, loading, error } = useTransactionDetails(
    hash as string,
    parseInt(chainId as string)
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!transactionDetails) {
    return <p>No transaction details found.</p>;
  }

  const {
    blockNumber,
    hash: transactionHash,
    from,
    to,
    value,
    gasPrice,
    gasUsed,
    blockHash,
  } = transactionDetails;

  const nativeCurrency = chainId === "1" ? "ETH" : "MATIC";
  const explorerUrl =
    chainId === "1"
      ? `https://etherscan.io/tx/${transactionHash}`
      : `https://polygonscan.com/tx/${transactionHash}`;

  const transactionValue = ethers.utils.formatEther(value);
  const transactionFee = ethers.utils.formatEther(
    (BigInt(gasUsed) * BigInt(gasPrice)).toString()
  );

  return (
    <Container>
      <div className="w-full flex flex-col items-center justify-center py-16 md:py-8">
        <Card className="w-full md:max-w-4xl bg-transparent">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-start items-center gap-2">
              <CardTitle className="text-2xl">Transaction Details</CardTitle>
              <Badge
                className={
                  transactionDetails.status === "Success"
                    ? "bg-green-700"
                    : "bg-red-700"
                }
              >
                {" "}
                {transactionDetails.status}
              </Badge>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2">
              <Typography
                variant="smallTitle"
                className="text-muted-foreground"
              >
                Timestamp:{" "}
              </Typography>
              <Typography variant="small">
                {transactionDetails.timestamp}
              </Typography>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3">
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between break-all">
                <span className="text-muted-foreground">Transaction Hash</span>
                <Link
                  href={explorerUrl}
                  target="_blank"
                  className="hover:underline"
                >
                  {transactionDetails.hash}
                </Link>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between break-all">
                <span className="text-muted-foreground">Block Hash</span>
                <span>{blockHash}</span>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <span className="text-muted-foreground">Block Number</span>
                <span>{parseInt(blockNumber, 16)}</span>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between break-all">
                <span className="text-muted-foreground">From</span>
                <Link
                  href={`/address/${chainId}/${from}`}
                  className="hover:underline"
                >
                  <span>{from}</span>
                </Link>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between break-all">
                <span className="text-muted-foreground">To</span>
                <Link
                  href={`/address/${chainId}/${to}`}
                  className="hover:underline"
                >
                  <span>{to}</span>
                </Link>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <span className="text-muted-foreground">Value</span>
                <span>
                  {transactionValue} {nativeCurrency}
                </span>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <span className="text-muted-foreground">Gas Used</span>
                <span>{parseInt(gasUsed, 16)}</span>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <span className="text-muted-foreground">Gas Price</span>
                <span>{ethers.utils.formatUnits(gasPrice, "gwei")} Gwei</span>
              </li>
              <li className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <span className="text-muted-foreground">Transaction Fee</span>
                <span>
                  {transactionFee} {nativeCurrency}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default TransactionDetailsComponent;
