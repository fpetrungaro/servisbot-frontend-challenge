import handler from '../../../../../pages/api/workers/bot/[botName]';
import {NextApiRequest, NextApiResponse} from 'next';
import {readData} from "@/utils/fileReader";

jest.mock('../../../../../utils/fileReader')

describe('Workers API', () => {
  it('should return 200 with filtered workers', async () => {
    const mockBotName = 'exampleBot';
    const mockReq = { query: { botName: mockBotName } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    const mockWorkers = [
      { id: 'workerId1', name: 'Worker 1', bot: 'exampleBot', created: 1634467200000 },
      { id: 'workerId2', name: 'Worker 2', bot: 'exampleBot', created: 1634553600000 },
    ];

    (readData as jest.Mock).mockResolvedValueOnce(mockWorkers);

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockWorkers);
  });

  it('should return 404 for no workers found', async () => {
    const mockBotName = 'nonExistingBot';
    const mockReq = { query: { botName: mockBotName } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    const mockWorkers: [] = [];

    (readData as jest.Mock).mockResolvedValueOnce(mockWorkers);

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: `Workers not found for bot ${mockBotName}` });
  });

  it('should return 400 for missing or invalid botName', async () => {
    const mockReq = { query: {} } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid or missing botName parameter.' });
  });

  it('should return 500 on internal server error', async () => {
    const mockBotName = 'exampleBot';
    const mockReq = { query: { botName: mockBotName } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    (readData as jest.Mock).mockRejectedValueOnce(new Error('File read error'));

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
