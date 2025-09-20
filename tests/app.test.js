// tests/app.test.js
process.env.NODE_ENV = 'test'; // enable test mode

const request = require('supertest');

// Mock Mongoose completely for tests
jest.mock('mongoose', () => {
  class MockSchema {
    constructor(obj) { this.obj = obj; }
  }

  return {
    connect: jest.fn().mockResolvedValue(true),
    connection: { once: jest.fn((event, cb) => cb()) },
    Schema: MockSchema,
    model: jest.fn(() => ({
      find: async () => [
        { _id: '1', name: 'Test Image 1', path: '/test1.jpg', size: 123 },
        { _id: '2', name: 'Test Image 2', path: '/test2.jpg', size: 456 },
      ]
    })),
  };
});

// Require app AFTER mocking mongoose
const app = require('../server');

describe('Landing Page - GET /', () => {
  it('should return 200 OK and contain MILESTONE 2', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('MILESTONE 2');
  });

  it('should render at least one image', async () => {
    const res = await request(app).get('/');
    expect(res.text).toContain('/test1.jpg');
  });
});

describe('Image Page - GET /image', () => {
  it('should return 200 OK and JSON array', async () => {
    const res = await request(app).get('/image');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name', 'Test Image 1');
  });
});
