import type { NextApiRequest, NextApiResponse } from 'next';
import {readData} from "@/utils/fileReader";

/**
 * @swagger
 * /api/workers/bot/{botName}:
 *   get:
 *     summary: Retrieve workers associated with a specific bot
 *     description: Returns a list of workers that are associated with a specified bot name.
 *     parameters:
 *       - in: path
 *         name: botName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the bot to retrieve associated workers for.
 *     responses:
 *       200:
 *         description: A list of workers associated with the specified bot.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the worker.
 *                   name:
 *                     type: string
 *                     description: The name of the worker.
 *                   description:
 *                     type: string
 *                     description: A description of the worker's role or purpose.
 *                   bot:
 *                     type: string
 *                     description: The name of the associated bot.
 *                   created:
 *                     type: integer
 *                     description: The timestamp (in milliseconds) when the worker was created.
 *       400:
 *         description: Bad request, invalid or missing botName parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing botName parameter."
 *       404:
 *         description: Workers not found for the specified bot.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Workers not found for bot {botName}"
 *       500:
 *         description: Internal server error.
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
  const { botName } = req.query;

  // Check if botName is valid
  if (typeof botName !== 'string' || botName.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing botName parameter.' });
  }

  try {
    const workers = await readData('workers.json')

    // Filter workers associated with the given bot name
    const filteredWorkers = workers.filter((worker: { bot: string }) => worker.bot === botName);

    if (filteredWorkers.length === 0) {
      return res.status(404).json({ error: `Workers not found for bot ${botName}` });
    }

    res.status(200).json(filteredWorkers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
