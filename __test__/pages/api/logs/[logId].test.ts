import handler from '../../../../pages/api/logs/[logId]';
import {NextApiRequest, NextApiResponse} from 'next';
import {readData} from "@/utils/fileReader";

jest.mock('../../../../utils/fileReader')

describe('Log Details API', () => {
  it('should return 200 with log details', async () => {
    const mockLogId = '123e4567-e89b-12d3-a456-426614174000';
    const mockReq = { query: { logId: mockLogId } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    const mockLogs = [
      { id: '123e4567-e89b-12d3-a456-426614174000', message: 'Log message 1' },
      { id: '789a012b-c5ed-4fgh-ijkl-123456789012', message: 'Log message 2' },
    ];

    (readData as jest.Mock).mockResolvedValueOnce(mockLogs);

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      id: '123e4567-e89b-12d3-a456-426614174000',
      message: 'Log message 1',
    });
  });

  it('should return 400 for invalid log ID format', async () => {
    const mockReq = { query: { logId: 'invalid_id' } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid log ID' });
  });

  it('should return 404 for non-existent log', async () => {
    const mockLogId = '8f0e876e-48a4-4af9-b4a7-3da6fe5507d6';
    const mockReq = { query: { logId: mockLogId } } as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    const mockLogs = [
      { id: '123e4567-e89b-12d3-a456-426614174000', message: 'Log message 1' },
      { id: '789a012b-c5ed-4fgh-ijkl-123456789012', message: 'Log message 2' },
    ];

    (readData as jest.Mock).mockResolvedValueOnce(mockLogs);

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Log not found' });
  });

  it('should return 500 on internal server error', async () => {
    const mockReq = { query: { logId: '8f0e876e-48a4-4af9-b4a7-3da6fe5507d6' } } as NextApiRequest;
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
