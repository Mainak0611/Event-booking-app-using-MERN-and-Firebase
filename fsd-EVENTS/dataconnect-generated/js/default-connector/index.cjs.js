const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'fsd-EVENTS',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

