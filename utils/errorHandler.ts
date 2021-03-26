import { NextApiResponse } from "next";

export default (err: any, res: NextApiResponse) => {
  console.log(err.message);
  return res.status(500).json({
    success: false,
    error: "Server Error",
  });
};
