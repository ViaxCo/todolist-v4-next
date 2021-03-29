import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../config/connectDB";
import { User } from "../../models";
import errorHandler from "../../utils/errorHandler";
import badMethodHandler from "../../utils/badMethodHandler";
import withSession from "../../utils/session";
import { Session } from "next-iron-session";
import getUser from "../../utils/getUser";

export interface ExtendedRequest extends NextApiRequest {
  session: Session;
}

export default withSession(async (req: ExtendedRequest, res: NextApiResponse) => {
  await connectDB();

  const { method } = req;

  switch (method) {
    // GET /api
    case "GET":
      try {
        let userExists = req.session.get("user");
        if (!userExists) {
          const newUser = await User.create({
            lists: [],
            views: 1,
          });
          userExists = req.session.set("user", { id: newUser.id, views: newUser.views });
          await req.session.save();

          const lists = newUser.lists;
          return res.status(200).json({
            lists,
          });
        }

        userExists = req.session.set("user", {
          id: userExists.id,
          views: userExists.views + 1,
        });
        await req.session.save();
        const user = await User.findOneAndUpdate(
          { _id: userExists.id },
          { views: userExists.views }
        );
        if (!user) return res.status(404).json("No user found");
        const lists = user.lists;
        return res.status(200).json({
          lists,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    // DELETE /api?id=:id
    case "DELETE":
      const { id } = req.query;
      try {
        const userExists = getUser(req.session);
        if (!userExists) return res.status(404).json("No user found");
        await User.findOneAndUpdate(
          { _id: userExists.id },
          { $pull: { lists: { _id: id } } }
        );
        return res.status(200).json({
          success: true,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    default:
      badMethodHandler(method, res, ["GET", "DELETE"]);
  }
});
