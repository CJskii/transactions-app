import { Layout } from "@/components/layout";
import { Container } from "@/components/containter";
import { Typography } from "@/components/ui/typography";

const ErrorPage = () => {
  return (
    <Layout>
      <Container>
        <div className="flex flex-col justify-center items-center w-full h-full mt-14 min-h-[50vh]">
          <Typography variant="h1" className="text-4xl">
            Error
          </Typography>
          <Typography variant="small" className="text-lg">
            The input provided is not a valid address or transaction hash.
          </Typography>
        </div>
      </Container>
    </Layout>
  );
};

export default ErrorPage;
