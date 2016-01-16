var sonos = require('sonos');

function getTrack(room, cb) {
  sonos.search(function(device) {
    device.getZoneAttrs(function(err, data) {
      if(data.CurrentZoneName === room) {
        device.currentTrack(function(err, data) {
          cb(data);
        });
      }
    });
  });
}

exports.getTrack = getTrack;
