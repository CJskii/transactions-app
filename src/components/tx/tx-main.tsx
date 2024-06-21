import { useRouter } from "next/router";
import { Container } from "@/components/containter";
import { useTransactionDetails } from "@/hooks/useTransactionDetails";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { ethers } from "ethers";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "../ui/loading-spinner";

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

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!transactionDetails) {
    return (
      <Container>
        <div className="flex flex-col justify-center items-center mt-8 min-h-[50vh]">
          <LoadingSpinner size={100} />
          <Typography variant="small" className="text-muted-foreground">
            Loading Transaction Details
          </Typography>
        </div>
      </Container>
    );
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
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between break-all">
                <span className="text-muted-foreground">Transaction Hash</span>
                {loading ? (
                  <Skeleton className="w-[200px] h-[20px] rounded-full" />
                ) : (
                  <Link
                    href={explorerUrl}
                    target="_blank"
                    className="hover:underline"
                  >
                    {transactionDetails.hash}
                  </Link>
                )}
              </li>
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between break-all">
                <span className="text-muted-foreground">Block Hash</span>
                {loading ? (
                  <Skeleton className="w-[200px] h-[20px] rounded-full" />
                ) : (
                  <span>{blockHash}</span>
                )}
              </li>
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <span className="text-muted-foreground">Block Number</span>
                {loading ? (
                  <Skeleton className="w-[70px] h-[20px] rounded-full" />
                ) : (
                  <span>{parseInt(blockNumber, 16)}</span>
                )}
              </li>
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between break-all">
                <span className="text-muted-foreground">From</span>
                {loading ? (
                  <Skeleton className="w-[150px] h-[20px] rounded-full" />
                ) : (
                  <Link
                    href={`/address/${chainId}/${from}`}
                    className="hover:underline"
                  >
                    <span>{from}</span>
                  </Link>
                )}
              </li>
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between break-all">
                <span className="text-muted-foreground">To</span>
                {loading ? (
                  <Skeleton className="w-[150px] h-[20px] rounded-full" />
                ) : (
                  <Link
                    href={`/address/${chainId}/${to}`}
                    className="hover:underline"
                  >
                    <span>{to}</span>
                  </Link>
                )}
              </li>
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <span className="text-muted-foreground">Value</span>
                {loading ? (
                  <Skeleton className="w-[70px] h-[20px] rounded-full" />
                ) : (
                  <span>
                    {transactionValue} {nativeCurrency}
                  </span>
                )}
              </li>
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <span className="text-muted-foreground">Gas Used</span>
                {loading ? (
                  <Skeleton className="w-[70px] h-[20px] rounded-full" />
                ) : (
                  <span>{parseInt(gasUsed, 16)}</span>
                )}
              </li>
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <span className="text-muted-foreground">Gas Price</span>
                {loading ? (
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                ) : (
                  <span>{ethers.utils.formatUnits(gasPrice, "gwei")} Gwei</span>
                )}
              </li>
              <li className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <span className="text-muted-foreground">Transaction Fee</span>
                {loading ? (
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                ) : (
                  <span>
                    {transactionFee} {nativeCurrency}
                  </span>
                )}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default TransactionDetailsComponent;
