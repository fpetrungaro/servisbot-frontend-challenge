import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { botName } = req.query;
  const filePath = path.join(process.cwd(), 'data', 'workers.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const workers = JSON.parse(fileContents);

  // Filter workers associated with the given bot name
  const filteredWorkers = workers.filter((worker: { bot: string }) => worker.bot === botName);

  res.status(200).json(filteredWorkers);
}
