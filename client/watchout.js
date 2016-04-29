// start slingin' some d3 here.
var dataArray = [20, 40, 50, 100, 80, 30, 50, 60, 70];

var width = 700;
var height = 450;
var perpetrators = 30;

var container = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var color = container.select('body')
  .enter()
  .append()
  .style('color', 'black');
// var bars = canvas.selectAll('rect')
//   .data(dataArray)
//   .enter()
//     .append('rect')
//     .attr('width', d => d * 10)
//     .attr('height', 50)
//     .attr('y', (d, i) => i * 100 );
