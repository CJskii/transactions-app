import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChainId } from "@/constants/chains";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function HomePage() {
  const [defaultWallet, setDefaultWallet] = useState<string | null>(
    "0xe99B5a6403e8E0d7f75B1af421d1415A913DF588"
  );

  const [defaultTx, setDefaultTx] = useState<string | null>(
    "0x75fa7a0f6422fc205292561ff03063d758da13cbaf726a3c3e95fda810e3015f"
  );

  const [defaultChainId, setDefaultChainId] = useState<number | null>(
    ChainId.Mainnet
  );

  return (
    <Layout>
      <main
        className={cn(
          "min-h-screen bg-background font-sans antialiased mt-24 flex flex-col justify-start items-center gap-8",
          fontSans.variable
        )}
      >
        <h1>Welcome to Transactions App</h1>
        <p>This is a provisional landing page.</p>

        <div className="md:flex justify-center items-center gap-4">
          <Link href={`/address/${defaultChainId}/${defaultWallet}`}>
            <Button className="ml-2">Search Address</Button>
          </Link>

          <Link href={`/tx/${defaultChainId}/${defaultTx}`}>
            <Button className="ml-2">Search Transaction</Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
