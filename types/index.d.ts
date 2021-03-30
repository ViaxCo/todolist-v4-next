// List type
export type ListType = {
  _id?: string;
  name: string;
};
// List data
export type ListData = {
  lists: ListType[];
};

// Item type
export type ItemType = {
  _id?: string;
  task: string;
  completed: boolean;
};
// Item data
export type ItemData = {
  items?: ItemType[];
  listTitle?: string;
};
