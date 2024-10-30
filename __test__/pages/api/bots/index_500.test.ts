import handler from '../../../../pages/api/bots/index';
import { NextApiRequest, NextApiResponse } from 'next';
import {readData} from "@/utils/fileReader";

jest.mock('../../../../utils/fileReader', () => ({
    readData: jest.fn().mockRejectedValueOnce(() => {
        throw new Error('Internal Server Error');
    })
}));
describe('Bots API Route 500', () => {
  it('should return a 500 error on internal server error', async () => {
    const mockReq = {method: 'GET'} as NextApiRequest;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;


    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Internal server error'
    });
  });

});
