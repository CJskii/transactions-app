import { useRouter } from "next/router";
import { Container } from "@/components/containter";

const AddressDetailsComponent = () => {
  const router = useRouter();
  const { chainId, address } = router.query;

  return (
    <Container>
      <div className="">
        <h1>Transactions for Address: {address}</h1>
        <p>
          This is the transactions page for Chain ID: {chainId}. Data will be
          displayed here.
        </p>
      </div>
    </Container>
  );
};

export default AddressDetailsComponent;
