const request = require('supertest');
const express = require('express');
const app = require('../server'); // adjust if your app exports the express instance

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('MILESTONE 2'); // check that your landing page has Milestone 2
  });
});

describe('GET /image', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/image');
    expect(res.statusCode).toBe(200);
  });
});
