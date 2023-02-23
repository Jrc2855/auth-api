'use strict';

require('dotenv').config();
const { db } = require('./api-server/src/models');
const server = require('./api-server/src/server');
const PORT = process.env.PORT || 3001

db.sync().then(() => {
  server.start(PORT);
});