const request = require('supertest');
const axios = require('axios');
const app = require('../server');

jest.mock('axios');

describe('Integration Tests - API Routes', () => {
  it('should serve static files from public directory', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  it('should handle JSON content type on weather endpoint', async () => {
    axios.get.mockResolvedValue({
      data: {
        current_condition: [{
          temp_C: '15',
          weatherDesc: [{ value: 'Cloudy' }],
          humidity: '80'
        }]
      }
    });
    const res = await request(app).get('/weather/Paris');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.city).toBe('Paris');
  });

  it('should encode city names with special characters', async () => {
    axios.get.mockResolvedValue({
      data: {
        current_condition: [{
          temp_C: '10',
          weatherDesc: [{ value: 'Rain' }],
          humidity: '90'
        }]
      }
    });
    const res = await request(app).get('/weather/New%20York');
    expect(res.status).toBe(200);
  });
});
