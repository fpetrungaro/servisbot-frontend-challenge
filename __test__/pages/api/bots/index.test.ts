import handler from '../../../../pages/api/bots/index';
import {NextApiRequest, NextApiResponse} from 'next';
import {readData} from "@/utils/fileReader";

jest.mock('../../../../utils/fileReader')

describe('Bots API', () => {
    it('should return a 200 response with bot data', async () => {
        const mockReq = {method: 'GET'} as NextApiRequest;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as NextApiResponse;

        const mockBots = [{id: 1, name: 'Bot 1'}, {id: 2, name: 'Bot 2'}];

        (readData as jest.Mock).mockResolvedValueOnce(mockBots);
        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockBots);
    });

    it('should return a 404 error if file not found', async () => {
        const mockReq = {method: 'GET'} as NextApiRequest;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as NextApiResponse;

        (readData as jest.Mock).mockResolvedValueOnce(undefined)

        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'Bots not found'});
    });

    it('should return a 500 error on internal server error', async () => {
        const mockReq = {method: 'GET'} as NextApiRequest;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as NextApiResponse;

        (readData as jest.Mock).mockRejectedValueOnce(new Error('Internal error'));
        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: 'Internal server error'
        });
    });
});





