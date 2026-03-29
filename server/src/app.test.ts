import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import todoRoutes from './routes';

// Create test app
const app = express();
app.use(express.json());
app.use('/api/v1/todos', todoRoutes);

describe('Todo API', () => {
  it('should return 200 OK for GET /api/v1/todos', async () => {
    const response = await request(app).get('/api/v1/todos');
    expect(response.statusCode).toBe(200);
  });

  it('should return 400 Bad Request for POST /api/v1/todos with invalid data', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({ invalid: 'data' });
    expect(response.statusCode).toBe(400);
  });
});
