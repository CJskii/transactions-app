import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChainId } from "@/constants/chains";
import { Search } from "lucide-react";

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
          "min-h-[80vh]  font-sans antialiased mt-24 flex flex-col justify-start items-center gap-8",
          fontSans.variable
        )}
      >
        <div className="text-center mt-16">
          <h1 className="text-5xl font-bold">Welcome to Tx Checker App</h1>
          <p className="mt-4 text-lg">
            Effortlessly search and explore transactions and addresses.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
          <Link href={`/address/${defaultChainId}/${defaultWallet}`}>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-center items-center cursor-pointer">
              <Search className="text-3xl mb-4" />
              <Button className="text-lg font-semibold">Search Address</Button>
            </div>
          </Link>

          <Link href={`/tx/${defaultChainId}/${defaultTx}`}>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-center items-center cursor-pointer">
              <Search className="text-3xl mb-4" />
              <Button className="text-lg font-semibold">
                Search Transaction
              </Button>
            </div>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
