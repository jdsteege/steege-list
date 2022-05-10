// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession as getAuthSession } from "next-auth/react";

const handler = async (req, res) => {
  const authSession = await getAuthSession({ req });

  if (authSession) {
    const result = {
      listName: "Shopping",
      items: [{ label: "Apple" }, { label: "Banana" }, { label: "Carrot" }],
    };
    res.status(200).json(result);
  } else {
    res.send({
      error:
        "You must be authenticated to view the protected content on this page.",
    });
  }
};

export default handler;
