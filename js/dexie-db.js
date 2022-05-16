import Dexie from "dexie";

export const db = new Dexie("steege-list");
db.version(1).stores({
  lists: "&listId, sortPos",
  items: "&itemId, itemListId, sortPos",
});
