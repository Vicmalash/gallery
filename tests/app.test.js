const request = require('supertest');

// Mock Mongoose
jest.mock('mongoose', () => {
  class MockSchema {
    constructor(obj) {
      this.obj = obj;
    }
  }

  return {
    connect: jest.fn().mockResolvedValue(true),
    connection: { once: jest.fn((event, cb) => cb()) },
    Schema: MockSchema,
    model: jest.fn(() => ({})),
  };
});

// Require the app after mocking
const app = require('../server');

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('MILESTONE 2');
  });
});

describe('GET /image', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/image');
    expect(res.statusCode).toBe(200);
  });
});
