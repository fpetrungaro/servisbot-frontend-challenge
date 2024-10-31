import handler from '../../../../pages/api/logs/index';
import {NextApiRequest, NextApiResponse} from 'next';
import {readData} from "@/utils/fileReader";

jest.mock('../../../../utils/fileReader')

describe('Logs Summary API', () => {
  it('should return 200 with filtered log summaries (botId only)', async () => {
    const mockBotId = '22526dec-4e04-4815-a641-ee6c71cbc5a9';
    const mockReq = { query: { botId: mockBotId } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;


    const mockLogs = [{
        id: 'logId1',
        bot: '22526dec-4e04-4815-a641-ee6c71cbc5a9',
        worker: '44700aa2-cba6-43d2-9ad4-8d8a499bd356',
        created: '2023-10-31T00:00:00'
      },
      {
        id: 'logId2',
        bot: '22526dec-4e04-4815-a641-ee6c71cbc5a1',
        worker: '44700aa2-cba6-43d2-9ad4-8d8a499bd356',
        created: '2023-10-31T00:01:00'
      },
    ];


    (readData as jest.Mock).mockResolvedValueOnce(mockLogs);
    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([
      { id: 'logId1', created: '2023-10-31T00:00:00' },
    ]);
  });


  it('should return 200 with filtered log summaries (botId and workerId)', async () => {
    const mockBotId = '22526dec-4e04-4815-a641-ee6c71cbc5a9';
    const mockWorkerId = '44700aa2-cba6-43d2-9ad4-8d8a499bd356';
    const mockReq = { query: { botId: mockBotId, workerId: mockWorkerId } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;


    const mockLogs = [
      {
        id: 'logId1',
        bot: '22526dec-4e04-4815-a641-ee6c71cbc5a9',
        worker: '44700aa2-cba6-43d2-9ad4-8d8a499bd353',
        created: '2023-10-31T00:00:00'
      },
      {
        id: 'logId2',
        bot: '22526dec-4e04-4815-a641-ee6c71cbc5a9',
        worker: '44700aa2-cba6-43d2-9ad4-8d8a499bd352',
        created: '2023-10-31T00:01:00'
      },
      {
        id: 'logId3',
        bot: '22526dec-4e04-4815-a641-ee6c71cbc5a9',
        worker: '44700aa2-cba6-43d2-9ad4-8d8a499bd356',
        created: '2023-10-31T00:02:00'
      },
    ];


    (readData as jest.Mock).mockResolvedValueOnce(mockLogs);


    await handler(mockReq, mockRes);


    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([
      { id: 'logId3', created: '2023-10-31T00:02:00' },
    ]);
  });


  it('should return 400 for missing botId', async () => {
    const mockReq = { query: {} } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;


    await handler(mockReq, mockRes);


    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid Bot Id or Worker ID' });
  });


  it('should return 404 for no logs found (botId)', async () => {
    const mockBotId = '789';
    const mockReq = {query: {botId: mockBotId}} as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;


    const mockLogs = [
      {id: 'logId1', bot: '123', worker: 'abc', created: '2023-10-31T00:00:00'},
      {id: 'logId2', bot: '456', worker: 'def', created: '2023-10-31T00:01:00'},
    ];
  });

  it('should return 500 on internal server error', async () => {
    const mockReq = { query: { botId: '8f0e876e-48a4-4af9-b4a7-3da6fe5507d6' } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    (readData as jest.Mock).mockRejectedValueOnce(new Error('File read error'));

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

})



