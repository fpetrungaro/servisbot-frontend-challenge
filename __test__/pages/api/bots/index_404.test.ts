import handler from '../../../../pages/api/bots/index';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('../../../../utils/fileReader', () => ({
  readData: jest.fn()
}));

describe('Bots API Route 404', () => {
  it('should return a 404 error if file not found', async () => {
    const mockReq = {method: 'GET'} as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({error: 'Bots not found'});
  });

});


