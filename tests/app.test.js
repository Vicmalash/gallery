// tests/app.test.js
const request = require('supertest');
const express = require('express');

// Mock mongoose before requiring your server
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(true),
  connection: {
    once: jest.fn((event, callback) => callback()),
  },
}));

// Require your server AFTER mocking mongoose
const app = require('../server'); // make sure server.js exports the express app

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('MILESTONE 2'); // check Milestone 2 is on landing page
  });
});

describe('GET /image', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/image');
    expect(res.statusCode).toBe(200);
  });
});
