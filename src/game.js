
function init(canvasName) {
  var scale = 1;
  var width = 568;
  var height = 320;

  var canvas = document.getElementById(canvasName);
  if (!canvas) {
    canvas = document.createElement('canvas');
    document.body.appendChild('canvas');
  }

  canvas.width = width * scale;
  canvas.height = height * scale;


  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'white';

  // clear screen
  function cls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
  }

  cls();

  function getPosition(element) {
    var xPos = 0;
    var yPos = 0;

    while (element) {
      xPos += element.offsetLeft - element.scrollLeft + element.clientLeft;
      yPos += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }

    return { x: xPos, y: yPos }
  }

  ctx.fillStyle = 'white';
  var pos = getPosition(canvas);

  var loading = true;

  var loadCounter = 0;
  var loadingStrings = ['Loading', 'Loading.', 'Loading..', 'Loading...'];

  function animateLoadScreen() {
    if (loading) {
      cls();
      ctx.fillText(loadingStrings[loadCounter++ % loadingStrings.length], pos.x + 5, pos.y + 10);
      setTimeout(animateLoadScreen, 300);
    } else {
      cls();
      ctx.fillText('Finished!', pos.x + 5, pos.y + 10);
    }
  }

  // start loading animation
  animateLoadScreen();

  // load sprite sheet
  var sheet = new Image();
  sheet.src = 'sheet.png';

  sheet.onload = function() {
    loading = false;
    console.log('loading complete');

    setTimeout(function() {
      // start game loop
      cls();
      update();
    }, 2000);
  }

  var paused = false;

  /**
  * Stats.js mrdoob - github
  */
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '10px';
  stats.domElement.style.top = (canvas.height * 0.8) + 'px';
  document.body.appendChild( stats.domElement );

  function update() {
    if (!paused) {
      stats.begin();
      tick();
      render();
      stats.end();
      setTimeout(update, 17);
    } else {
      console.log("Game Paused");
    }
  }

  var ticks = 0;
  var last = 0;

  function tick() {
    ticks++;
  }

  function render() {
    
  }

}

