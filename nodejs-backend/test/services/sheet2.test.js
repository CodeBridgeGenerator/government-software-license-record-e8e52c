const assert = require('assert');
const app = require('../../src/app');

describe('\'sheet2\' service', () => {
  it('registered the service', () => {
    const service = app.service('sheet2');

    assert.ok(service, 'Registered the service (sheet2)');
  });
});
