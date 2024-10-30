import handler from '../../../../pages/api/bots/index';
import {NextApiRequest, NextApiResponse} from 'next';

jest.mock('../../../../utils/fileReader', () => ({
    readData: jest.fn().mockResolvedValueOnce([{id: 1, name: 'Bot 1'}, {id: 2, name: 'Bot 2'}])
}));

describe('Bots API', () => {
    it('should return a 200 response with bot data', async () => {
        const mockReq = {method: 'GET'} as NextApiRequest;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as NextApiResponse;


        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith([{id: 1, name: 'Bot 1'}, {id: 2, name: 'Bot 2'}]);
    });
});





