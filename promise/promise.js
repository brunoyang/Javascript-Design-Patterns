var D = new $.Deferred();

D.always(function() {
  console.log('A choice was made: ');
});

D.done(function(play) {
  console.log('Game Start', play);
});

D.fail(function() {
  console.log('No Game Today');
});

$('#play-game').on('keypress', function(e) {
  var Y = 121,
    N = 110;
  if (e.keyCode === Y) {
    D.resolve('one');
  } else if (e.keyCode === N) {
    D.reject();
  } else {
    return false;
  }
});