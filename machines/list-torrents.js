module.exports = {

  friendlyName: 'List Torrents',

  description: 'List all Torrents from the uTorrent client.',

  cacheable: false,

  sync: false,

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
    },

  },

  fn: function(inputs, exits) {
    var Machine = require('machine');
    var createClient = Machine.build(require('./create-client'));
    var client = createClient({
      host: inputs.host,
      port: inputs.port,
      username: inputs.username,
      password: inputs.password,
    }).execSync();
    // console.log(client, typeof client.call, client.call);
    client.call("list", function(err, data) {
      if (err) {
        return exists.error(err);
      }
      var torrents = data.torrents;
      torrents = torrents.map(function(info) {
        return {
          hash: info[0],
          name: info[2],
          percentDone: info[4] / 1000,
          eta: info[10],
          torrentUrl: info[19],
          status: info[21],
          downloadDir: info[26]
        };
      });
      return exits.success(torrents);
    });
  },

};