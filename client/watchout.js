/*  #####   Scoring Functions   #####  */

// select current score
var currentScore = 0;

// select high score
var highScore = 0;

// increase score
var increaseScore = function() {
  d3.select('.current')
    .select('span')
    .text(++currentScore);
};

// execute score increase every 100ms
setInterval(increaseScore, 1000);


// increase high score
var increaseHighScore = function() {
  if (currentScore > highScore) {
    highScore = currentScore;
    d3.select('.highscore')
      .select('span')
      .text(highScore);
  }
};

// watch current score and increment high score when current passes it
// setInterval(increaseHighScore, 100);

// select collision count
var collisionCount = d3.select('.collisions')
    .select('span')
    .text();

// increase collision count and reset current score
var increaseCollisions = function() {
  increaseHighScore();
  currentScore = 0;
  d3.select('.collisions')
    .select('span')
    .text(++collisionCount);
};



/* #####   Build Board   ##### */

// Build board
var svg = d3.select('.board')
  .append('svg')
  .attr('width', 800)
  .attr('height', 550)
  .style('background-color', 'white');



/* #####   Define Asteroids   ##### */

// asteroid dimensions and placements
  // x is horizontal; y is vertical
var jsonAsteroids = [
  {'asteroid': 'asteroid.png', 'width': 25, 'height': 25},
  {'asteroid': 'asteroid.png', 'width': 30, 'height': 30},
  {'asteroid': 'asteroid.png', 'width': 35, 'height': 35},
  {'asteroid': 'asteroid.png', 'width': 40, 'height': 40},
  {'asteroid': 'asteroid.png', 'width': 45, 'height': 45},
  {'asteroid': 'asteroid.png', 'width': 50, 'height': 50},
  {'asteroid': 'asteroid.png', 'width': 55, 'height': 55},
  {'asteroid': 'asteroid.png', 'width': 60, 'height': 60},
  {'asteroid': 'asteroid.png', 'width': 65, 'height': 65},
  {'asteroid': 'asteroid.png', 'width': 70, 'height': 70}
];

// associate image with asteroids
var asteroids = svg.selectAll('image').data(jsonAsteroids);
asteroids.enter()
  .append('svg:image');

// apply dimensions and placements to asteriods
(function asteroidAttributes () { 
  asteroids
  .transition().duration(1000)
  .attr('xlink:href', function(d) { return d.asteroid; })
  .attr('x', function(d) { return Math.random() * 800; })
  .attr('y', function(d) { return Math.random() * 550; })
  .attr('width', function(d) { return d.width; })
  .attr('height', function(d) { return d.height; })
  .each('end', function() {
    asteroidAttributes();
  });
})();

//add class to asteroids
d3.selectAll('image')
  .classed('whirlingShuriken', true);


/* #####   Define Player   ##### */

// build dot for player
var player = svg.append('circle')
  .attr('cx', 350)
  .attr('cy', 200)
  .attr('r', 10) 
  .style('fill', 'red');

d3.selectAll('circle')
  .classed('player', true);

var position = [0, 0];

//set internal variable based on mouse position
var ondrag = function() {
  position = [d3.event.x, d3.event.y];
  redraw();
  
};

//set player position based on internal variable
var redraw = function() {
  d3.select('circle')
  .attr('cx', position[0])
  .attr('cy', position[1]);
};

//capture mouse drag event
d3.behavior.drag()
  .on('drag', ondrag)
  .call(d3.select('circle'));


/* #####   Collision Detection   ##### */
// var collide = function() {
//   var array = [];
//   d3.selectAll('image')
//     .each();
// //find centers of each asteroid
// //find center of circle
//   //check for collision
//   //if collision reset score
//     //update highscore if less than current score
//     //new game
// };
// collide(asteroids);
  






var collisions = function() {
  // var distances = [];

  // access x/y coordinates for all asteroids
  var asteroidsX = asteroids[0].map(x => x.x.animVal.value);
  var asteroidsY = asteroids[0].map(y => y.y.animVal.value);

  // access x/y coordinates for player
  var playerX = player[0].map(cx => cx.cx.animVal.value);
  var playerY = player[0].map(cy => cy.cy.animVal.value);

  for (var i = 0; i < asteroidsX.length; i++) {
    var distance = Math.sqrt(Math.pow((asteroidsX[i] - playerX[0]), 2) + Math.pow((asteroidsY[i] - playerY[0]), 2));
    //fix collisions so it reads it correctly
    //fix collision so it increments by 1 instead of all at once
    if (distance < 10) {
      increaseCollisions();
    }
  }
  // return distances;
};


setInterval(collisions, 1);