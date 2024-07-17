const assert = require('assert');
const app = require('../../src/app');

describe('\'sheet1\' service', () => {
  it('registered the service', () => {
    const service = app.service('sheet1');

    assert.ok(service, 'Registered the service (sheet1)');
  });
});
