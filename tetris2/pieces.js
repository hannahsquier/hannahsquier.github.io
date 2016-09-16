var PIECES = {
  buildSquare: function(col) {
    if (col > MODEL.WIDTH - 2) {
      col = MODEL.WIDTH - 2
    }
    MODEL.board[3][col] = new Block(3, col, "#FFD700")
    MODEL.board[3][col + 1] = new Block(3, col + 1, "#FFD700")
    MODEL.board[4][col] = new Block(4, col, "#FFD700")
    MODEL.board[4][col + 1] = new Block(4, col + 1, "#FFD700")
    MODEL.currentPiece = "square"
  },

  buildLine: function(col) {
    MODEL.board[1][col] = new Block(1, col, "#00e5ee");
    MODEL.board[2][col] = new Block(2, col, "#00e5ee");
    MODEL.board[3][col] = new Block(3, col, "#00e5ee");
    MODEL.board[4][col] = new Block(4, col, "#00e5ee");
    MODEL.currentPiece = "line"
  },

  buildT: function(col) {
    if (col > MODEL.WIDTH - 3) {
      col = MODEL.WIDTH - 3
    }
    MODEL.board[3][col + 2] = new Block(3, col + 2, "#6f006f");
    MODEL.board[3][col] = new Block(3, col, "#6f006f");
    MODEL.board[3][col + 1] = new Block(3, col + 1, "#6f006f");
    MODEL.board[4][col + 1] = new Block(4, col + 1, "#6f006f");
    MODEL.currentPiece = "t"
  },

  buildL: function(col) {
    if (col > MODEL.WIDTH - 2) {
      col = MODEL.WIDTH - 2
    }
    MODEL.board[2][col] = new Block(2, col, "#6666ff");
    MODEL.board[3][col] = new Block(3, col, "#6666ff");
    MODEL.board[4][col] = new Block(4, col, "#6666ff");
    MODEL.board[4][col + 1] = new Block(4, col + 1, "#6666ff");
    MODEL.currentPiece = "l"
  },

  buildJ: function(col) {
    if (col > MODEL.WIDTH - 2) {
      col = MODEL.WIDTH - 2
    }
    MODEL.board[2][col + 1] = new Block(2, col + 1, "#ffb732");
    MODEL.board[3][col + 1] = new Block(3, col + 1, "#ffb732");
    MODEL.board[4][col + 1] = new Block(4, col + 1, "#ffb732");
    MODEL.board[4][col] = new Block(4, col, "#ffb732");
    MODEL.currentPiece = "j"
  },

  buildS: function(col) {
    if (col > MODEL.WIDTH - 3) {
      col = MODEL.WIDTH - 3
    }
    MODEL.board[4][col] = new Block(4, col, "#aadd77");
    MODEL.board[4][col + 1] = new Block(4, col + 1, "#aadd77");
    MODEL.board[3][col + 1] = new Block(3, col + 1, "#aadd77");
    MODEL.board[3][col + 2] = new Block(3, col + 2, "#aadd77");
    MODEL.currentPiece = "s"
  },

  buildZ: function(col) {
    if (col > MODEL.WIDTH - 3) {
      col = MODEL.WIDTH - 3
    }
    MODEL.board[3][col] = new Block(3, col, "#006400");
    MODEL.board[3][col + 1] = new Block(3, col + 1, "#006400");
    MODEL.board[4][col + 1] = new Block(4, col + 1, "#006400");
    MODEL.board[4][col + 2] = new Block(4, col + 2, "#006400");
    MODEL.currentPiece = "z"
  },


  RandomPiece: function(col) {

    var shapes = (["buildSquare", "buildZ", "buildS", "buildL", "buildJ", "buildLine", "buildT"]);
    var randNum = Math.floor(Math.random() * shapes.length);
    PIECES[shapes[randNum]](col);
    // PIECES["buildZ"](col);
  },

  gatherActivePieces: function() {
    var pieces = []
    MODEL.eachCell(function(cell) {
      if (cell && cell.active) {
        pieces.push(cell)
      }
    });
    return pieces
  },


  rotateLine: function() {
    var pieces = PIECES.gatherActivePieces()

    for (var i in pieces) {
      pieces[i].rotState++;
        if (pieces[i].rotState === 2) {
          pieces[i].rotState = 0
        }
    }

    switch (pieces[0].rotState) {
      // flat to standing
      case 0:
        pieces[0].row -= 2
        pieces[0].col += 2
        pieces[1].row -= 1
        pieces[1].col += 1
        pieces[3].row += 1
        pieces[3].col -= 1
        break;
      // standing to flat
      case 1:
        pieces[0].row += 2
        pieces[0].col -= 2
        pieces[1].row += 1
        pieces[1].col -= 1
        pieces[3].row -= 1
        pieces[3].col += 1
        break;
    }
  },

  rotateL: function() {
    var pieces = PIECES.gatherActivePieces()

    for (var i in pieces) {
      pieces[i].rotState++;
        if (pieces[i].rotState === 4) {
          pieces[i].rotState = 0
        }
    }

    switch (pieces[0].rotState) {
      case 0:
        pieces[0].row += 2
        pieces[1].row += 1
        pieces[1].col += 1
        pieces[3].row -= 1
        pieces[3].col -= 1
        break;

      case 1:
        pieces[0].row += 1
        pieces[0].col += 1
        pieces[2].row -= 1
        pieces[2].col -= 1
        pieces[3].col -= 2
        break;

      case 2:
        pieces[0].row -= 1
        pieces[0].col += 1
        pieces[2].row += 1
        pieces[2].col -= 1
        pieces[3].row -= 2
        break;

      case 3:
        pieces[0].col += 2
        pieces[1].row += 1
        pieces[1].col += 1
        pieces[3].row -= 1
        pieces[3].col -= 1
        break;
    }
  },

  rotateJ: function() {
    var pieces = PIECES.gatherActivePieces()

    for (var i in pieces) {
      pieces[i].rotState++;
        if (pieces[i].rotState === 4) {
          pieces[i].rotState = 0
        }
    }

    switch (pieces[0].rotState) {
      case 3:
        pieces[0].row += 1
        pieces[0].col += 1
        pieces[1].row += 2
        pieces[3].col -= 1
        pieces[3].row -= 1
        break;

      case 0:
        pieces[0].col += 1
        pieces[0].row -= 1
        pieces[2].col -= 1
        pieces[2].row += 1
        pieces[3].col -= 2

        break;

      case 1:
        pieces[0].row += 1
        pieces[0].col += 1
        pieces[2].row -= 2
        pieces[3].col -= 1
        pieces[3].row -= 1
        break;

      case 2:
        pieces[0].col += 2
        pieces[1].row -= 1
        pieces[1].col += 1
        pieces[3].row += 1
        pieces[3].col -= 1
        break;
    }
  },

  rotateT: function() {
    var pieces = PIECES.gatherActivePieces()

    for (var i in pieces) {
      pieces[i].rotState++;
        if (pieces[i].rotState === 4) {
          pieces[i].rotState = 0
        }
    }

    switch (pieces[0].rotState) {
      case 0:
        pieces[0].row += 1
        pieces[0].col += 1
        pieces[2].row += 1
        pieces[2].col -= 1
        pieces[3].col -= 1
        pieces[3].row -= 1
        break;

      case 1:
        pieces[0].row -= 1
        pieces[0].col += 1
        pieces[2].col -= 1
        pieces[2].row += 1
        pieces[3].row -= 1
        pieces[3].col -= 1

        break;

      case 2:
        pieces[0].row += 1
        pieces[0].col += 1
        pieces[1].row -= 1
        pieces[1].col += 1
        pieces[3].col -= 1
        pieces[3].row -= 1
        break;

      case 3:
        pieces[0].row += 1
        pieces[0].col += 1
        pieces[1].row -= 1
        pieces[1].col += 1
        pieces[3].col -= 1
        pieces[3].row += 1
        break;
    }
  },

    rotateS: function() {
    var pieces = PIECES.gatherActivePieces()

    for (var i in pieces) {
      pieces[i].rotState++;
        if (pieces[i].rotState === 4) {
          pieces[i].rotState = 0
        }
    }


    switch (pieces[0].rotState) {
      case 0:
        pieces[0].row += 1
        pieces[0].col += 1
        pieces[2].row += 1
        pieces[2].col -= 1
        pieces[3].col -= 2
        break;

      case 1:
        pieces[0].col += 1
        pieces[1].row += 1
        pieces[2].row -= 2
        pieces[2].col += 1
        pieces[3].row -= 1

        break;

      case 2:
        pieces[0].row += 1
        pieces[0].col += 1
        pieces[2].row += 1
        pieces[2].col -= 1
        pieces[3].col -= 2
        break;

      case 3:
        pieces[0].col += 1
        pieces[1].row += 1
        pieces[2].col += 1
        pieces[2].row -= 2
        pieces[3].row -= 1
        break;
    }
  },


    rotateZ: function() {
    var pieces = PIECES.gatherActivePieces()

    for (var i in pieces) {
      pieces[i].rotState++;
        if (pieces[i].rotState === 4) {
          pieces[i].rotState = 0
        }
    }


    switch (pieces[0].rotState) {
      case 0:
        pieces[0].row += 2
        pieces[2].row += 1
        pieces[2].col -= 1
        pieces[3].col -= 1
        pieces[3].row -= 1

        break;
      case 1:
        pieces[0].col += 1
        pieces[1].row += 1
        pieces[2].row -= 2
        pieces[2].col += 1
        pieces[3].row -= 1

        break;

      case 2:
        pieces[0].row += 2
        pieces[2].row += 1
        pieces[2].col -= 1
        pieces[3].col -= 1
        pieces[3].row -= 1

        break;

      case 3:
        pieces[0].col += 1
        pieces[1].row += 1
        pieces[2].col += 1
        pieces[2].row -= 2
        pieces[3].row -= 1
        break;
    }
  },

}
