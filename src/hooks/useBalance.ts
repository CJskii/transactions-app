import { useState, useEffect } from "react";
import { ethers } from "ethers";

const fetchBalance = async (
  address: string,
  chainId: number
): Promise<string> => {
  const response = await fetch(`/api/balance/${address}?chainId=${chainId}`);
  if (!response.ok) {
    throw new Error(`Error fetching balance: ${response.statusText}`);
  }
  const data = await response.json();
  return data.result;
};

export const useBalance = (address: string, chainId: number) => {
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const convertWeiToEth = (wei: string): string => {
    return ethers.utils.formatEther(wei);
  };

  useEffect(() => {
    if (address && chainId) {
      setLoading(true);
      setError(null);

      fetchBalance(address, chainId)
        .then((result) => {
          const ethBalance = convertWeiToEth(result);
          setBalance(ethBalance);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [address, chainId]);

  return { balance, loading, error };
};
