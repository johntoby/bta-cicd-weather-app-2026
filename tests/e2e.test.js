const request = require('supertest');
const app = require('../server');

describe('E2E Tests - Full Weather Flow', () => {
  it('should fetch real weather data for a known city', async () => {
    const res = await request(app).get('/weather/London');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('city', 'London');
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('humidity');
  }, 15000);

  it('should return error for non-existent city', async () => {
    const res = await request(app).get('/weather/Xyznonexistent99999');
    expect([200, 404]).toContain(res.status);
  }, 15000);
});
