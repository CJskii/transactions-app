import { format } from "date-fns";

export const hexToDate = (hexTimestamp: string): string => {
  const timestamp = parseInt(hexTimestamp, 16);

  const date = new Date(timestamp * 1000);

  return format(date, "yyyy-MM-dd HH:mm:ss");
};
