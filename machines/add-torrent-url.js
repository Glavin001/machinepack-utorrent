module.exports = {

  friendlyName: 'Add Torrent URL',

  description: 'Add a torrent URL to the uTorrent client.',

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
    },
    torrentUrl: {
      example: '',
      required: true
    },
    downloadDir: {
      example: 0,
      required: false
    },
    path: {
      example: '/dir/path/',
      description: 'Download directory path relative to downloadDir index',
      required: false
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
    var options = {
      's': inputs.torrentUrl,
      'download_dir': inputs.downloadDir || 0,
      'path': inputs.path || ''
    };
    client.call('add-url', options, function(err, data) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(data);
    });

  },

};