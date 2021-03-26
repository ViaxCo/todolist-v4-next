import { NextApiResponse } from "next";

export default (method: string | undefined, res: NextApiResponse, allowedMethods: string[]) => {
  res.setHeader("Allow", allowedMethods);
  return res.status(405).end(`Method ${method} Not Allowed`);
};
