$(function(){
  var serverData = {};
  var ajax1 = $.get('url1')
  .done(function(result){
    serverData['1'] = result;
  });
  var ajax2 = $.get('url2')
  .done(function(result){
    serverData['2'] = resule;
  });
  $.when(ajax1, ajax2).done(function(){
    console.log(serverData);
  });
});