import { Document, Schema, model, models, Model } from "mongoose";

// Item interface
export interface ItemDoc extends Document {
  task: string;
  completed: boolean;
}
// List interface
export interface ListDoc extends Document {
  name: string;
  items: ItemDoc[];
}
// Item schema
const itemSchema = new Schema({
  task: String,
  completed: Boolean,
});
// List schema
const listSchema = new Schema({
  name: String,
  items: [itemSchema],
});

export const Item: Model<ItemDoc, {}> = models.Item || model("Item", itemSchema);
export const List: Model<ListDoc, {}> = models.List || model("List", listSchema);
