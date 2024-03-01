import get from 'axios';
import {expect} from 'chai';

describe('/health endpoint integration tests', () => {
    it ('should return a 200 status code healthcheck', async()=>{
        const response = await get('http://localhost:3000/api/health');
        expect(response.status).to.equal(200);
    });
});