import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { fetchTransactions } from "@/utils/fetchTransactions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;
  const chainId = parseInt(req.query.chainId as string, 10);

  if (!address || !chainId) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  try {
    const transactions = await fetchTransactions(address as string, chainId);
    res.status(200).json(transactions);
  } catch (error) {
    let errorMessage = "An unexpected error occurred";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
}
