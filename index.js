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

var last;

setInterval(function() {
  getTrack('Living Room', function (data) {
    if(last !== data.title) {
      console.log(data.artist + ' - ' + data.title);
    }
    last = data.title;
  });
},1000);
