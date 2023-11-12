import type { NextApiRequest, NextApiResponse } from "next";

export default async function exit(_: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.redirect("/");
  res.end();
}
