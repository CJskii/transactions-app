import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "./address-main";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Typography } from "../ui/typography";

interface TransactionTableProps {
  transactions: Transaction[];
  chainId: number;
}

type SortableKeys = "timeStamp" | "value";

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  chainId,
}) => {
  const [sortedTransactions, setSortedTransactions] = useState(transactions);
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: string;
  } | null>(null);

  const shortFunctionName = (name: string) => {
    const index = name.indexOf("(");
    return name.slice(0, index);
  };

  const handleSort = (key: SortableKeys) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setSortedTransactions(
      [...transactions].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      })
    );
  };

  return (
    <>
      <Typography variant="muted" className="mb-4">
        {transactions.length} transactions found
      </Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Txn Hash</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Block</TableHead>
            <TableHead
              onClick={() => handleSort("timeStamp")}
              className="cursor-pointer"
            >
              Age
            </TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead
              onClick={() => handleSort("value")}
              className="cursor-pointer"
            >
              Value
            </TableHead>
            <TableHead>[Txn Fee]</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No transactions found
              </TableCell>
            </TableRow>
          )}
          {sortedTransactions.map((tx) => (
            <TableRow key={tx.hash}>
              <Link
                href={`/tx/${chainId}/${tx.hash}`}
                className="hover:underline"
              >
                <TableCell className="font-medium ">
                  {tx.hash.slice(0, 10)}...
                </TableCell>
              </Link>
              <TableCell>
                <Badge>
                  {shortFunctionName(tx.functionName) || tx.methodId}
                </Badge>
              </TableCell>
              <TableCell>{tx.blockNumber}</TableCell>
              <TableCell>
                {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
              </TableCell>
              <TableCell className="cursor-pointer ">
                <Link
                  href={`/address/${chainId}/${tx.from}`}
                  className="hover:underline"
                >
                  {tx.from.slice(0, 10)}...
                </Link>
              </TableCell>
              <TableCell className="cursor-pointer">
                <Link
                  href={`/address/${chainId}/${tx.to}`}
                  className="hover:underline"
                >
                  {tx.to.slice(0, 10)}...
                </Link>
              </TableCell>
              <TableCell>
                {(parseInt(tx.value) / 1e18).toFixed(4)} ETH
              </TableCell>
              <TableCell>
                {(
                  (parseInt(tx.gasUsed) * parseInt(tx.gasPrice)) /
                  1e18
                ).toFixed(6)}{" "}
                ETH
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
