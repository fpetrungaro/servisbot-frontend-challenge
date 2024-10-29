import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

/**
 * @swagger
 * /api/log/{logId}:
 *   get:
 *     summary: Retrieve a log by ID
 *     description: Fetches detailed information of a log entry by its unique ID.
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the log
 *     responses:
 *       200:
 *         description: Detailed information of the requested log entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the log
 *                 created:
 *                   type: string
 *                   format: date-time
 *                   description: The creation date and time of the log
 *                 message:
 *                   type: string
 *                   description: The message content of the log
 *                 bot:
 *                   type: string
 *                   description: The unique identifier of the associated bot
 *                 worker:
 *                   type: string
 *                   description: The unique identifier of the associated worker
 *       400:
 *         description: Bad request, possibly due to a missing logId
 *       404:
 *         description: Log not found with the specified ID
 *       500:
 *         description: Server error
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { logId } = req.query;

  if (!logId || Array.isArray(logId)) {
    return res.status(400).json({ error: 'Invalid log ID' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'logs.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const logs = JSON.parse(fileContents);

    const log = logs.find((log: { id: string }) => log.id === logId);

    if (!log) {
      return res.status(404).json({ error: 'Log not found' });
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}