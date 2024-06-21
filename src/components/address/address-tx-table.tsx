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

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const shortFunctionName = (name: string) => {
    const index = name.indexOf("(");
    return name.slice(0, index);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Txn Hash</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Block</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>[Txn Fee]</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.hash}>
            <TableCell className="font-medium">
              <a
                href={`https://etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tx.hash.slice(0, 10)}...
              </a>
            </TableCell>
            <TableCell>
              {shortFunctionName(tx.functionName) || tx.methodId}
            </TableCell>
            <TableCell>{tx.blockNumber}</TableCell>
            <TableCell>
              {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
            </TableCell>
            <TableCell>{tx.from.slice(0, 10)}...</TableCell>
            <TableCell>{tx.to.slice(0, 10)}...</TableCell>
            <TableCell>{(parseInt(tx.value) / 1e18).toFixed(4)} ETH</TableCell>
            <TableCell>
              {((parseInt(tx.gasUsed) * parseInt(tx.gasPrice)) / 1e18).toFixed(
                6
              )}{" "}
              ETH
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
