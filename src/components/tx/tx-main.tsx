import { useRouter } from "next/router";
import { Container } from "@/components/containter";

const TransactionDetailsComponent = () => {
  const router = useRouter();
  const { chainId, hash } = router.query;

  return (
    <Container>
      <div className="">
        <h1>Transaction Details for Hash: {hash}</h1>
        <p>
          This is the transaction details page for Chain ID: {chainId}. Data
          will be displayed here.
        </p>
      </div>
    </Container>
  );
};

export default TransactionDetailsComponent;
