import axios from "axios";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

export const fetchTransactionDetails = async (
  hash: string,
  chainId: number
) => {
  const baseUrl =
    chainId === 1
      ? `https://api.etherscan.io/api`
      : `https://api.polygonscan.com/api`;

  const apiKey = chainId === 1 ? ETHERSCAN_API_KEY : POLYGONSCAN_API_KEY;

  const response = await axios.get(baseUrl, {
    params: {
      module: "proxy",
      action: "eth_getTransactionByHash",
      txhash: hash,
      apikey: apiKey,
    },
  });

  if (response.data.result) {
    return response.data.result;
  } else {
    throw new Error(
      response.data.message || "Error fetching transaction details"
    );
  }
};
