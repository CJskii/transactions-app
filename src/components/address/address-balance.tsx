import { useBalance } from "@/hooks/useBalance";

export const BalanceComponent = ({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}) => {
  const { balance, loading, error } = useBalance(address, chainId);

  return (
    <div>
      <h2>Balance</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>{balance} ETH</p>
      )}
    </div>
  );
};
