import type {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {promises as fs} from 'fs';
/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Retrieve logs for a specific bot, with optional filtering by worker
 *     description: Returns a list of logs associated with a specific bot. Optionally, logs can be filtered by a specific worker.
 *     parameters:
 *       - in: query
 *         name: botId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bot for which to retrieve logs.
 *       - in: query
 *         name: workerId
 *         required: false
 *         schema:
 *           type: string
 *         description: The ID of the worker to filter logs (optional).
 *     responses:
 *       200:
 *         description: A list of log summaries for the specified bot, optionally filtered by worker.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the log entry.
 *                   created:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the log entry was created.
 *       400:
 *         description: Bad request, invalid or missing botId parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing botId parameter."
 *       404:
 *         description: Logs not found for the specified bot or worker.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Logs not found for bot {botId} and worker {workerId}."
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
    const {botId, workerId} = req.query;
    try {
        const filePath = path.join(process.cwd(), 'data', 'logs.json');
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const logs = JSON.parse(fileContents);

        // Filter logs by botId and workerId, if provided
        // Filter logs and map to log summaries (id and created only)
        const logSummaries = logs
            .filter((log: { bot: string; worker: string }) => {
                const matchesBot = botId ? log.bot === botId : true;
                const matchesWorker = workerId ? log.worker === workerId : true;
                return matchesBot && matchesWorker;
            })
            .map((log: { id: string; created: string }) => ({
                id: log.id,
                created: log.created,
            }));

        if (logSummaries.length === 0) {
          return res.status(404).json({error: `Logs not found for bot ${botId}${workerId ? ` and worker ${workerId}` : ''}.`});
        }
        res.status(200).json(logSummaries);
    } catch (error) {
        console.error('Error reading logs:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}



