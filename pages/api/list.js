// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const list = {
    listName: "Shopping",
    items: [{ label: "Apple" }, { label: "Banana" }, { label: "Carrot" }],
  };
  res.status(200).json(list);
}
