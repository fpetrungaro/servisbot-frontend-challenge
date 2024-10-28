/*
TODO: This Handler could be re-worked to access the database instead of the local file-system
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'data', 'bots.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const bots = JSON.parse(fileContents);

  res.status(200).json(bots);
}
