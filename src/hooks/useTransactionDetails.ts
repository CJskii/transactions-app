import { useState, useEffect } from "react";
import axios from "axios";
import { TransactionDetails } from "@/components/tx/tx-main";

const fetchTransactionDetails = async (
  hash: string,
  chainId: number
): Promise<TransactionDetails> => {
  const response = await fetch(`/api/tx/${hash}?chainId=${chainId}`);
  if (!response.ok) {
    throw new Error(
      `Error fetching transaction details: ${response.statusText}`
    );
  }
  return response.json();
};

export const useTransactionDetails = (
  hash: string | null,
  chainId: number | null
) => {
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hash && chainId) {
      setLoading(true);
      setError(null);

      fetchTransactionDetails(hash, chainId)
        .then((data) => {
          setTransactionDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [hash, chainId]);

  return { transactionDetails, loading, error };
};
