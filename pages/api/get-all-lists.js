// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUserId, sendAuthError } from "./apiHelper";

export default async function handler(req, res) {
  const userId = await getUserId(req);

  if (!userId) {
    sendAuthError(res);
    return;
  }

  const result = {
    lists: [
      { listName: "Shopping" },
      { listName: "Chores" },
      { listName: "Birthday Party" },
    ],
  };

  res.status(200).json(result);
}
