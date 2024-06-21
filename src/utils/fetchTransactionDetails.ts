import axios from "axios";
import { hexToDate } from "./date";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

const getBaseUrl = (chainId: number) => {
  return chainId === 1
    ? `https://api.etherscan.io/api`
    : `https://api.polygonscan.com/api`;
};

const getApiKey = (chainId: number) => {
  return chainId === 1 ? ETHERSCAN_API_KEY : POLYGONSCAN_API_KEY;
};

export const fetchTransactionDetails = async (
  hash: string,
  chainId: number
) => {
  const baseUrl = getBaseUrl(chainId);
  const apiKey = getApiKey(chainId);

  try {
    const txResponse = await axios.get(baseUrl, {
      params: {
        module: "proxy",
        action: "eth_getTransactionByHash",
        txhash: hash,
        apikey: apiKey,
      },
    });

    if (!txResponse.data.result) {
      throw new Error(
        txResponse.data.message || "Error fetching transaction details"
      );
    }

    const transaction = txResponse.data.result;

    const receiptResponse = await axios.get(baseUrl, {
      params: {
        module: "proxy",
        action: "eth_getTransactionReceipt",
        txhash: hash,
        apikey: apiKey,
      },
    });

    if (!receiptResponse.data.result) {
      throw new Error(
        receiptResponse.data.message || "Error fetching transaction receipt"
      );
    }

    const receipt = receiptResponse.data.result;

    const blockResponse = await axios.get(baseUrl, {
      params: {
        module: "proxy",
        action: "eth_getBlockByNumber",
        tag: transaction.blockNumber,
        boolean: true,
        apikey: apiKey,
      },
    });

    if (!blockResponse.data.result) {
      throw new Error(
        blockResponse.data.message || "Error fetching block details"
      );
    }

    const block = blockResponse.data.result;
    const timestamp = hexToDate(block.timestamp);

    return {
      blockHash: transaction.blockHash,
      blockNumber: parseInt(transaction.blockNumber, 16).toString(),
      from: transaction.from,
      to: transaction.to,
      value: parseInt(transaction.value, 16).toString(),
      gasUsed: parseInt(receipt.gasUsed, 16).toString(),
      gasPrice: parseInt(transaction.gasPrice, 16).toString(),
      cumulativeGasUsed: parseInt(receipt.cumulativeGasUsed, 16).toString(),
      hash: transaction.hash,
      status: receipt.status === "0x1" ? "Success" : "Failed",
      timestamp: timestamp,
    };
  } catch (error) {
    if (error instanceof Error)
      throw new Error(error.message || "Error fetching transaction details");
  }
};
