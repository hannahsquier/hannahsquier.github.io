MARGIN_SIZE = 5
BRICK_WIDTH = 100
BRICK_HEIGHT = 20
WINDOW_WIDTH = 1000
WINDOW_HEIGHT = 600

function Brick(x_min, x_max, y_min, y_max) {
  this.alive = true
  this.x_min = x_min
  this.x_max = x_max
  this.y_min = y_min
  this.y_max = y_max
}

model = {
  init: function() {
    model.bricks = model.create_bricks();
    model.x = 50;
    model.y = 50;
    model.dx = 3;
    model.dy = 3;
    model.xDir = "pos";
    model.yDir = "pos";
    model.paddleLoc = WINDOW_WIDTH / 2;
    model.gameOver = false;
  },

  create_bricks: function() {
      var bricks = []
      for( var j = 0; j < 2; j++){
        bricks.push([])
        for( var i= 0; i < 9; i++) {
          bricks[j].push(new Brick())
        }
      }

      for (var row in bricks) {
        for(var col in bricks[row]) {
          bricks[row][col].x_min = (Number(col) + 1) * MARGIN_SIZE + (Number(col) * Number(BRICK_WIDTH));
          bricks[row][col].x_max = (Number(col) + 1) * (Number(MARGIN_SIZE) + Number(BRICK_WIDTH));
          bricks[row][col].y_min =  (Number(row) + 1) * MARGIN_SIZE + row * BRICK_HEIGHT;
          bricks[row][col].y_max =  (Number(row) + 1) * (MARGIN_SIZE + BRICK_HEIGHT);
          bricks[row][col].alive = true
      }
    }
    return bricks
  },

  moveBall: function() {

    model.assignBallDirection()

    if(model.xDir === "pos") {
      model.x += model.dx;
    } else if(model.xDir === "neg") {
      model.x -= model.dx;
    }

    if(model.yDir === "pos") {
      model.y += model.dy;
    } else if(model.yDir === "neg") {
      model.y -= model.dy;
    }
  },

  assignBallDirection: function() {
    if(model.x > WINDOW_WIDTH) {
      model.xDir = "neg";
    } else if(model.x < 0) {
      model.xDir = "pos";
    } else if(model.y > WINDOW_HEIGHT) {

      if(model.x > model.paddleLoc && model.x < model.paddleLoc + 100){
        model.yDir = "neg";
      } else {
        model.gameOver = true
        confirm("you lose!")
      }
    } else if(model.y < 0) {
      model.yDir = "pos";
    }
  },

  movePaddle: function(e) {
    e = e || window.event;
    e.preventDefault();

    if(e.keyCode === 37 && model.paddleLoc > 0) {
      model.paddleLoc -= 70
    }  else if(e.keyCode === 39 && model.paddleLoc < WINDOW_WIDTH - 100) {
      model.paddleLoc += 70
    }
  },

  checkForBrickCollision: function() {
      for (var row in model.bricks) {
        for(var col in model.bricks[row]) {
          if(!model.bricks[row][col].alive) { continue }

          if(model.x <= model.bricks[row][col].x_max && model.x >= model.bricks[row][col].x_min && model.y <= model.bricks[row][col].y_max && model.y >= model.bricks[row][col].y_min) {
            model.yDir = "pos"
            model.bricks[row][col].alive = false
          }
      }
    }
  }

}

controller = {
  play: function() {
    model.init()
    view.setArrowKeyListener()

    var myInterval = setInterval(function() {
      model.moveBall()
      model.checkForBrickCollision()
      view.render(model.x, model.y, model.paddleLoc, model.bricks)

      if(model.gameOver) {
        clearInterval(myInterval);
      }

      }, 10)



  },

  adjustPaddle: function(e) {
    model.movePaddle(e)
  }
}

view = {
  render: function(ballX, ballY, paddleLoc, bricks) {
    $container = $("#container")
    $container.empty()

    for (var row in bricks) {
      for(var col in bricks[row]) {
        $brick = $('<div class="brick"></div>')
        if(!bricks[row][col].alive) { $brick.addClass("hidden") }
        $brick.appendTo($container)
      }
    }

    $ball = $("<div id='ball'></div>")
    $ball.appendTo($container)
    $ball.css('top', ballY)
    $ball.css('left', ballX)

    $paddle = $('<div id="paddle"></div>')
    $paddle.appendTo($container)
    $paddle.css("left", paddleLoc)
  },


  setArrowKeyListener: function() {
    $(window).on("keydown", controller.adjustPaddle)
  },


}

if(model.gameOver) {
       $button = $("<button id='play-again'>Play Again!</button>")
        $button.insertAfter($container)
        $button.on("click", controller.play)
      }
$(document).ready(controller.play)