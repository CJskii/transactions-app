import axios from "axios";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

export const fetchTransactions = async (address: string, chainId: number) => {
  const baseUrl =
    chainId === 1
      ? `https://api.etherscan.io/api`
      : `https://api.polygonscan.com/api`;

  const apiKey = chainId === 1 ? ETHERSCAN_API_KEY : POLYGONSCAN_API_KEY;

  const response = await axios.get(baseUrl, {
    params: {
      module: "account",
      action: "txlist",
      address,
      sort: "asc",
      apikey: apiKey,
      page: 1,
      offset: 100, // fetch only the first 100 transactions
    },
  });

  if (response.data.status === "1") {
    return response.data.result;
  } else if (response.data.status === "0") {
    return [];
  } else {
    throw new Error(response.data.message || "Error fetching transactions");
  }
};
