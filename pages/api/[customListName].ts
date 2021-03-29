import { NextApiResponse } from "next";
import _startCase from "lodash/startCase";
import connectDB from "../../config/connectDB";
import { Item, List, User } from "../../models";
import errorHandler from "../../utils/errorHandler";
import badMethodHandler from "../../utils/badMethodHandler";
import withSession from "../../utils/session";
import { ExtendedRequest } from ".";
import getUser from "../../utils/getUser";

// Original task items
const item1 = new Item({
  task: "Welcome to your todo list",
  completed: false,
});
const item2 = new Item({
  task: "Hit the + button to add a new item",
  completed: false,
});
const item3 = new Item({
  task: "Hit the delete button to delete an item",
  completed: false,
});
const item4 = new Item({
  task: "Tap the task name to go back to all your tasks",
  completed: false,
});
const item5 = new Item({
  task: "Tap the moon icon to switch between dark and light modes",
  completed: false,
});

const defaultItems = [item1, item2, item3, item4, item5];

export default withSession(async (req: ExtendedRequest, res: NextApiResponse) => {
  await connectDB();

  const {
    method,
    query: { id },
  } = req;

  const customListName = _startCase(req.query.customListName as string);

  switch (method) {
    // GET /api/:customListName
    case "GET":
      const newList = new List({
        name: customListName,
        items: defaultItems,
      });
      try {
        let userExists = req.session.get("user");
        if (!userExists) {
          const newUser = await User.create({
            lists: [{ ...newList }],
          });
          userExists = req.session.set("user", { id: newUser.id });
          await req.session.save();

          return res.status(201).json({
            listTitle: newList.name,
            items: newList.items,
          });
        }
        // Find a user that has a list with the customListName
        const user = await User.findOne(
          { _id: userExists.id, "lists.name": customListName },
          // Return the user but only return it with one list (the list with customListName)
          { "lists.$": 1 }
        );
        if (user) {
          // If user with the customListName exists
          const foundList = user.lists[0];
          return res.status(200).json({
            listTitle: foundList.name,
            items: foundList.items,
          });
        } else {
          // If user with customListName doesn't exist
          await User.findOneAndUpdate(
            { _id: userExists.id },
            { $push: { lists: { ...newList } } }
          );
          return res.status(201).json({
            listTitle: newList.name,
            items: newList.items,
          });
        }
      } catch (err) {
        return errorHandler(err, res);
      }
    // POST /api/:customListName
    case "POST":
      const { text } = req.body;
      const item = new Item({
        task: text,
        completed: false,
      });
      try {
        const userExists = getUser(req.session);
        if (!userExists) return res.status(404).json("No user found");
        // Find the current user, the current list, and push the new item into its items array
        await User.findOneAndUpdate(
          { _id: userExists.id, "lists.name": customListName },
          { $push: { "lists.$.items": item } }
        );
        return res.status(201).json({
          item,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    // PATCH /api/:customListName?id=:id
    case "PATCH":
      const { completed } = req.body;
      try {
        const userExists = getUser(req.session);
        if (!userExists) return res.status(404).json("No user found");
        await User.findOneAndUpdate(
          { _id: userExists.id },
          { $set: { "lists.$[currentList].items.$[currentItem].completed": completed } },
          {
            arrayFilters: [
              { "currentList.name": customListName },
              { "currentItem._id": id },
            ],
          }
        );
        const user = await User.findOne(
          { _id: userExists.id, "lists.name": customListName },
          { "lists.$": 1 }
        );
        if (!user) return res.status(404).json("No user found");
        const newList = user.lists[0];
        return res.status(200).json({
          items: newList.items,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    // DELETE /api/:customListName?id=:id
    case "DELETE":
      try {
        const userExists = getUser(req.session);
        if (!userExists) return res.status(404).json("No user found");
        await User.findOneAndUpdate(
          { _id: userExists.id, "lists.name": customListName },
          // @ts-ignore
          { $pull: { "lists.$.items": { _id: id } } }
        );
        return res.status(200).json({
          success: true,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    default:
      badMethodHandler(method, res, ["GET", "POST", "PATCH", "DELETE"]);
  }
});
