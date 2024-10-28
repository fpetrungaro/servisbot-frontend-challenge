// Common API endpoint for logs
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { botId, workerId } = req.query;

  const filePath = path.join(process.cwd(), 'data', 'logs.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const logs = JSON.parse(fileContents);

  // Filter logs by botId and workerId, if provided
  const filteredLogs = logs.filter((log: { bot: string; worker: string }) => {
    const matchesBot = botId ? log.bot === botId : true;
    const matchesWorker = workerId ? log.worker === workerId : true;
    return matchesBot && matchesWorker;
  });

  res.status(200).json(filteredLogs);
}

