// start slingin' some d3 here.


var currentScore = d3.select('.current')
    .select('span')
    .text();

var increaseScore = function() {
  d3.select('.current')
    .select('span')
    .text(++currentScore);
};

setInterval(increaseScore, 100);

// Build board
var svg = d3.select('.board')
  .append('svg')
  .attr('width', 800)
  .attr('height', 550)
  .style('background-color', 'black');


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

// build dot for player
var player = svg.append('circle')
  .attr('cx', 350)
  .attr('cy', 200)
  .attr('r', 10) 
  .style('fill', 'red');

var position = [0, 0];

//set internal variable based on mouse position
var ondrag = function() {
  position = [d3.event.x, d3.event.y];
  redraw();
  
};

//set circles position based on internal variable
var redraw = function() {
  d3.select('circle')
  .attr('cx', position[0])
  .attr('cy', position[1]);
};

//capture mouse drag event
d3.behavior.drag()
  .on('drag', ondrag)
  .call(d3.select('circle'));

var collide = function() {
  var array = [];
  d3.selectAll('image')
    .each();
//find centers of each asteroid
//find center of circle
  //check for collision
  //if collision reset score
    //update highscore if less than current score
    //new game
};
collide(asteroids);
  








