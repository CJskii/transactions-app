import { useRouter } from "next/router";

const TransactionsPage = () => {
  const router = useRouter();
  const { chainId, address } = router.query;

  return (
    <div>
      <h1>Transactions for Address: {address}</h1>
      <p>
        This is the transactions page for Chain ID: {chainId}. Data will be
        displayed here.
      </p>
    </div>
  );
};

export default TransactionsPage;
