/*
TODO: This Handler could be re-worked to access the database instead of the local file-system
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
/**
 * @swagger
 * /api/bots:
 *   get:
 *     summary: Retrieve a list of bots
 *     description: Fetches all bots from the database.
 *     responses:
 *       200:
 *         description: A list of bots.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The bot ID.
 *                   name:
 *                     type: string
 *                     description: The bot's name.
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                     description: The bot's status ["DISABLED", "ENABLED", "PAUSED"].
 *                   created:
 *                     type: integer
 *                     description: The timestamp (in milliseconds) when the bot was created.
 *       404:
 *         description: Bots not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bots not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'data', 'bots.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const bots = JSON.parse(fileContents);
    try {
        if (!bots) {
            return res.status(404).json({error: 'Bots not found'});
        }
        res.status(200).json(bots);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }

}
