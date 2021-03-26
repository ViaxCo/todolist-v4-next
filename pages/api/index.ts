import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../config/connectDB";
import { List } from "../../models";
import errorHandler from "../../utils/errorHandler";
import badMethodHandler from "../../utils/badMethodHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const lists = await List.find({}, { __v: 0, items: 0 });
        return res.status(200).json({
          lists,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    case "DELETE":
      const { id } = req.query;
      try {
        await List.findByIdAndDelete(id);
        return res.status(200).json({
          success: true,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    default:
      badMethodHandler(method, res, ["GET", "DELETE"]);
  }
};
