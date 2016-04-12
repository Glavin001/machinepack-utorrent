module.exports = {


  friendlyName: 'Get Torrent Details',


  description: 'Get details of a Torrent from uTorrent client.',


  cacheable: false,


  sync: false,


  inputs: {

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits
    /**/
  ) {
    return exits.success();
  },



};