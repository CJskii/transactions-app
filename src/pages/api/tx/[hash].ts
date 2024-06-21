import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTransactionDetails } from "@/utils/fetchTransactionDetails";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { hash } = req.query;
  const chainId = parseInt(req.query.chainId as string, 10);

  if (!hash || !chainId) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  try {
    const transactionDetails = await fetchTransactionDetails(
      hash as string,
      chainId
    );
    res.status(200).json(transactionDetails);
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
