var music = require('./music');
var five = require('johnny-five');
var board, lcd, last;

board = new five.Board();

board.on('ready', function() {

  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 16
  });

  lcd.useChar("note");

  this.loop(1000, function() {
    music.getTrack('Living Room', function (data) {
      if(last !== data.title) {
        lcd.clear().print(':note: ' + data.artist);
        lcd.cursor(1,0).print('  ' + data.title);
      }
      last = data.title;
    });
  });
});
