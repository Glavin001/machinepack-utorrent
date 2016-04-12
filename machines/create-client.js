var uTorrent = require("utorrent-api");

module.exports = {

  friendlyName: 'Create Client',

  description: 'Create a client instance for uTorrent API',

  cacheable: false,

  sync: true,

  inputs: {
    host: {
      example: 'localhost',
      required: true
    },
    port: {
      example: 26085,
      required: true
    },
    username: {
      example: 'admin',
      required: true
    },
    password: {
      example: '12345',
      required: true
    }
  },

  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
      example: {
        rootUrl: 'http://localhost:26085/gui',
          username: 'admin',
          password: '12345',
          token: '',
          cookies: {},
          setCredentials: '->',
          fetchToken: '->',
          call: '->',
          makeCall: '->',
          makeRequest: '->'
      }
    },

  },

  fn: function(inputs, exits) {
    var client = new uTorrent(inputs.host, inputs.port);
    client.setCredentials(inputs.username, inputs.password);
    return exits.success(client);
  },

};