import Dexie from "dexie";

export const db = new Dexie("steege-list");

db.version(1).stores({
  lists: "&listId, sortPos",
  items: "&itemId, itemListId, sortPos",
});

var ListDef = db.lists.defineClass({
  listId: String,
  listName: String,
  sortPos: Number,
  tags: [String],
});

var ItemDef = db.items.defineClass({
  itemId: String,
  itemListId: String,
  label: String,
  isComplete: Boolean,
  sortPos: Number,
});
