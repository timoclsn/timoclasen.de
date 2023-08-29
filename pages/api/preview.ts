import type { NextApiRequest, NextApiResponse } from 'next';

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { secret } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({});
  res.redirect('/');
  res.end();
}
