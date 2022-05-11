export function getUserLists(ownerId) {
  return allLists;
}

export function getList(listId) {
  return listData[listId - 1];
}

let allLists = [
  { listId: 1, owner: "john.steege", listName: "Groceries" },
  { listId: 2, owner: "john.steege", listName: "Chores" },
  { listId: 3, owner: "john.steege", listName: "Birthday Party" },
];

//
let listData = [
  {
    listId: 1,
    owner: "john.steege",
    listName: "Groceries",
    items: [
      { itemId: 101, label: "Apricot", isCompleted: false },
      { itemId: 102, label: "Banana", isCompleted: false },
      { itemId: 103, label: "Carrot", isCompleted: false },
      { itemId: 104, label: "Donut", isCompleted: false },
    ],
  },
  {
    listId: 2,
    owner: "john.steege",
    listName: "Chores",
    items: [
      { itemId: 105, label: "Dust", isCompleted: false },
      { itemId: 106, label: "Sweep", isCompleted: false },
      { itemId: 107, label: "Mop", isCompleted: false },
      { itemId: 108, label: "Organize", isCompleted: false },
    ],
  },
  {
    listId: 3,
    owner: "john.steege",
    listName: "Birthday Party",
    items: [
      { itemId: 109, label: "Cake", isCompleted: false },
      { itemId: 110, label: "Decorations", isCompleted: false },
      { itemId: 111, label: "Music", isCompleted: false },
      { itemId: 112, label: "Games", isCompleted: false },
    ],
  },
];
