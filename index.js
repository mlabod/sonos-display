var music = require('./music');
var five = require('johnny-five');
var scroll = require('lcd-scrolling');
var board, lcd, last;

board = new five.Board();

board.on('ready', function() {

  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 16
  });

  scroll.setup({
    lcd: lcd,
    full: false,
    firstCharPauseDuration: 8000
  });

  this.loop(1000, function() {
    music.getTrack('Living Room', function (data) {
      if(last !== data.title) {
        lcd.clear();
        scroll.line( 0, data.artist);
        scroll.line( 1, data.title);
      }
      last = data.title;
    });
  });

});
