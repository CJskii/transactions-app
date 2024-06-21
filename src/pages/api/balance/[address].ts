import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBalance } from "@/utils/fetchBalance";
import axios from "axios";

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
    const balance = await fetchBalance(address as string, chainId);
    res.status(200).json({ result: balance });
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
