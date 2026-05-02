const request = require('supertest');
const axios = require('axios');
const app = require('../server');

jest.mock('axios');

describe('Unit Tests - Weather Endpoint', () => {
  it('should return formatted weather data for a valid city', async () => {
    axios.get.mockResolvedValue({
      data: {
        current_condition: [{
          temp_C: '22',
          weatherDesc: [{ value: 'Sunny' }],
          humidity: '45'
        }]
      }
    });
    const res = await request(app).get('/weather/London');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      city: 'London',
      temperature: 22,
      description: 'Sunny',
      humidity: '45'
    });
  });

  it('should return 404 when API fails', async () => {
    axios.get.mockRejectedValue(new Error('API error'));
    const res = await request(app).get('/weather/InvalidCity');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});
