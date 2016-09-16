var VIEW = {

  render: function(board) {
    $board = $("#board");
    $board.empty();
    for(var row = 4; row < board.length; row++) {
      $board.append($("<div class='row'></div>"));

      for(var cell = 0; cell < board[0].length; cell++) {
        $cell = $("<div class='cell'></div>");
        $('.row').last().append($cell);

        if(board[row][cell]) {
        console.log(board[row][cell].color)

          $cell.addClass("block")
              .css("background", board[row][cell].color)
        }
      }
    }
  },

  setEventListeners: function() {
  $(document).keydown(function(e) {
    CONTROLLER.keyListener(e.keyCode);
    e.preventDefault();
    });
}


}
