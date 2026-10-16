const { test, after } = require('node:test');
const assert = require('node:assert/strict');

require('./server.js'); // loading the module binds 127.0.0.1:3000

const BASE = 'http://127.0.0.1:3000';

// Case 1: a GET to "/" returns 200 with the exact body.
test('GET / returns 200 and the exact body', async () => {
  const res = await fetch(BASE);
  assert.equal(res.status, 200);
  assert.equal(await res.text(), 'Hello, World!\n');
});

// Case 2: a different method gets the same response.
test('POST / returns the same status and body', async () => {
  const res = await fetch(BASE, { method: 'POST' });
  assert.equal(res.status, 200);
  assert.equal(await res.text(), 'Hello, World!\n');
});

// server.js exports nothing, so there is no handle to close: end the process once the cases report.
after(() => setImmediate(() => process.exit(process.exitCode || 0)));
