// initialize enemies
var enemies = [];
for ( var i = 0; i < 11; i++ ) {
  enemies[i] = {
    x: 100 * Math.random(),
    y: 100 *Math.random()
  };
}

// appends .enemies to svg
d3.select('svg')
  .selectAll('.enemies')
  .data( enemies )
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 2)
  .attr('class', 'enemies')
  .style('fill', 'red');

// update enemies
var update = function () {
  for ( var i = 0; i < enemies.length; i++ ) {
    enemies[i].x = Math.random() * 100;
    enemies[i].y = Math.random() * 100;
  }
};

// timer
var timer = function (interval) {
  setInterval(function() {
    update();
    d3.selectAll('.enemies')
    .data( enemies )
    .transition()
    .duration(interval * .75)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  }, interval);
};

timer( 1000 );

// var updateEnemies = function() {
//   d3.select('svg')
//     .selectAll('.enemies')
//     //.data( enemies )
//     .transition()
//     .duration(1000)
//     .attr('cx', function(d) { return d.x * Math.random(); })
//     .attr('cy', function(d) { return d.y * Math.random(); });
// };
