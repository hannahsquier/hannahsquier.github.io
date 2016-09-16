var CONTROLLER = {

  init: function() {
    MODEL.init();
    CONTROLLER.gameLoop();
    VIEW.setEventListeners();
  },

  gameLoop: function() {
    var counter = counter || 0
    setInterval(function() {
      if(counter % 2 === 0) {
        MODEL.moveBlocks();
      }
      MODEL.checkFullRow();
      CONTROLLER.checkActivePiece();
      VIEW.render(MODEL.board);
      counter++
    }, 200)

  },

  checkActivePiece: function() {
    if (!MODEL.hasActivePiece()) {
      MODEL.addPiece();
    }

  },


  keyListener: function(keypress) {
    MODEL.keyListener(keypress);
  }


}

$(document).ready(CONTROLLER.init)
