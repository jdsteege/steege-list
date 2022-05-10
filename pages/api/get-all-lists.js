// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession as getAuthSession } from "next-auth/react";

const handler = async (req, res) => {
  const authSession = await getAuthSession({ req });

  if (authSession) {
    const result = {
      lists: [
        { listName: "Shopping" },
        { listName: "Chores" },
        { listName: "Birthday Party" },
      ],
    };
    res.status(200).json(result);
  } else {
    res.status(401).send({
      error: "You must be authenticated.",
    });
  }
};

export default handler;
