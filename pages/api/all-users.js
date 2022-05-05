export default function handler(req, res) {
  const list = {
    users: [{ id: "Aisha" }, { id: "John" }],
  };
  res.status(200).json(list);
}
