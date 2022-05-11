// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//
import { getUserId, sendAuthError } from "../../backend/apiHelper";
import { getList } from "../../backend/db";
import { logThing } from "../../util";

//
export default async function handler(req, res) {
  const userId = await getUserId(req);

  if (!userId) {
    sendAuthError(res);
    return;
  }

  res.status(200).json(getList(req.query.listId));
}
