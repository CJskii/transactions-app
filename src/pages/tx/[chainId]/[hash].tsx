import { useRouter } from "next/router";

const TransactionDetailsPage = () => {
  const router = useRouter();
  const { chainId, hash } = router.query;

  return (
    <div>
      <h1>Transaction Details for Hash: {hash}</h1>
      <p>
        This is the transaction details page for Chain ID: {chainId}. Data will
        be displayed here.
      </p>
    </div>
  );
};

export default TransactionDetailsPage;
