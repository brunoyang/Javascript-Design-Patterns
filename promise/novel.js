$(function() {
  var D = $.Deferred();
  var wordGoal = 500;

  D.progress(function(wordCount) {
    var percentComplete = Math.floor(wordCount / wordGoal * 100);
    $('#text').text(percentComplete + '% complete');
  });

  D.done(function() {
    $('#text').text('complete!');
  });

  $('#document').on('keydown', function(e) {
    var wordCount = $(this).val().length;
    if (wordCount > wordGoal) {
      D.resolve();
    }
    D.notify(wordCount);
  });
});