//
import { getSession as getAuthSession } from "next-auth/react";

//
export async function getUserId(req) {
  const authSession = await getAuthSession({ req });

  return authSession?.user?.username;
}

export function sendAuthError(res) {
  res.status(401).send({
    error: "You must be authenticated.",
  });
}
