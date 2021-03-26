import { NextApiRequest, NextApiResponse } from "next";
import _startCase from "lodash/startCase";
import connectDB from "../../config/connectDB";
import { Item, List } from "../../models";
import errorHandler from "../../utils/errorHandler";
import badMethodHandler from "../../utils/badMethodHandler";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  const {
    method,
    query: { id },
  } = req;

  const customListName = _startCase(req.query.customListName as string);

  switch (method) {
    case "GET":
      try {
        const foundList = await List.findOne({ name: customListName });
        if (foundList) {
          return res.status(200).json({
            listTitle: foundList.name,
            items: foundList.items,
          });
        } else {
          const newList = await List.create({
            name: customListName,
            items: defaultItems,
          });
          return res.status(201).json({
            listTitle: newList.name,
            items: newList.items,
          });
        }
      } catch (err) {
        return errorHandler(err, res);
      }
    case "POST":
      const { text } = req.body;
      const item = new Item({
        task: text,
        completed: false,
      });
      try {
        await List.findOneAndUpdate({ name: customListName }, { $push: { items: { ...item } } });
        return res.status(201).json({
          item,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    case "PATCH":
      const { completed } = req.body;
      try {
        const newList = await List.findOneAndUpdate(
          { name: customListName, "items._id": id },
          { "items.$.completed": completed }
        );
        if (!newList) return res.status(404).json(`List ${customListName} Not found`);
        return res.status(200).json({
          items: newList.items,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    case "DELETE":
      try {
        await List.findOneAndUpdate({ name: customListName }, { $pull: { items: { _id: id } } });
        return res.status(200).json({
          success: true,
        });
      } catch (err) {
        return errorHandler(err, res);
      }
    default:
      badMethodHandler(method, res, ["GET", "POST", "PATCH", "DELETE"]);
  }
};
