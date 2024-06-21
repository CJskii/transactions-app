import { useBalance } from "@/hooks/useBalance";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";

interface BalanceComponentProps {
  address: string;
  chainId: number;
}

export const BalanceComponent: React.FC<BalanceComponentProps> = ({
  address,
  chainId,
}) => {
  const { balance, loading, error } = useBalance(address, chainId);

  const networkName = chainId === 1 ? "Ethereum" : "Polygon";
  const nativeCurrency = chainId === 1 ? "ETH" : "MATIC";
  const explorerName = chainId === 1 ? "Etherscan" : "Polygonscan";
  const explorerUrl =
    chainId === 1
      ? `https://etherscan.io/address/${address}`
      : `https://polygonscan.com/address/${address}`;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <BalanceCard
      balance={balance}
      networkName={networkName}
      nativeCurrency={nativeCurrency}
      explorerName={explorerName}
      explorerUrl={explorerUrl}
    />
  );
};

interface BalanceCardProps {
  balance: string;
  networkName: string;
  nativeCurrency: string;
  explorerName: string;
  explorerUrl: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  networkName,
  nativeCurrency,
  explorerName,
  explorerUrl,
}) => {
  return (
    <Card className="overflow-hidden lg:w-2/6 md:w-3/6 w-full h-fit bg-transparent my-8">
      <CardHeader className="flex flex-col items-start justify-center gap-2">
        <CardTitle className="group flex items-center gap-2 text-xl tracking-wider text-left">
          Overview
        </CardTitle>
        <Separator className="w-full border-[1px]" />
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <li className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <span className="text-muted-foreground">Current network</span>
              <span className="">{networkName}</span>
            </li>
            <li className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <span className="text-muted-foreground">Balance</span>
              <span className="break-all">
                {balance} {nativeCurrency}{" "}
              </span>
            </li>
            <li className="flex flex-col md:flex-row items-start md:items-center  justify-between">
              <span className="text-muted-foreground">{explorerName} link</span>
              <Link
                href={explorerUrl}
                target="_blank"
                className="hover:underline tranctuate "
              >
                View
              </Link>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
