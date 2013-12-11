
require "./setup"

10.times ->
  $('body').append $ "<div>",
    class: "item"

`
docReady( function() {
  var container = document.querySelector('body');
  var pckry = new Packery( container );
  var itemElems = pckry.getItemElements();
  // for each item element
  for ( var i=0, len = itemElems.length; i < len; i++ ) {
    var elem = itemElems[i];
    // make element draggable with Draggabilly
    var draggie = new Draggabilly( elem );
    // bind Draggabilly events to Packery
    pckry.bindDraggabillyEvents( draggie );
  }
});
`