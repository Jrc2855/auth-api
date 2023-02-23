'use strict';

// Code was taken from bearer-auth lab repo to try and practice my test writing

const { db } = require('../src/models');
const { handleCreate } = require('../src/routes/v1');

let userData = {
  testUser: { username: 'user', password: 'password' },
};

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Tests the signup handler', () => {
  const res = {
    send: jest.fn(() => res),
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  };
  const next = jest.fn();

  it('Should respond with a new user if a Username and a Password is present on the request', async() => {
    let req = {
      body: {
        username: 'test',
        password: 'test',
      },
    };

    await handleCreate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.any(Object),
        token: expect.any(String),
      }),
    );
  });
});