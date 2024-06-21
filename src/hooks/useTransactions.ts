import { useState, useEffect } from "react";
import { Transaction } from "@/components/address/address-main";

const fetchTransactions = async (
  address: string,
  chainId: number
): Promise<Transaction[]> => {
  const response = await fetch(`/api/address/${address}?chainId=${chainId}`);
  if (!response.ok) {
    throw new Error(`Error fetching transactions: ${response.statusText}`);
  }
  return response.json();
};

export const useTransactions = (address: string, chainId: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address && chainId) {
      setLoading(true);
      setError(null);

      fetchTransactions(address, chainId)
        .then((data) => {
          setTransactions(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [address, chainId]);

  return { transactions, loading, error };
};
