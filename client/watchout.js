// initialize enemies
var enemies = [];
var player = [{
  x: 50,
  y: 50
}];

for ( var i = 0; i < 11; i++ ) {
  enemies[i] = {
    x: 100 * Math.random(),
    y: 100 * Math.random()
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

// player
d3.select('svg')
  .selectAll('.player')
  .data( player )
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 3)
  .attr('class', 'player')
  .style('fill', 'blue');

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

// d3.select('.player').on('mousedown', function(event) {
//   d3.event.preventDefault;
//   debugger;
//   var coordinates = d3.mouse('svg');
//   d3.select(this)
//     .attr('cx', function(d) { d.x = coordinate[0]; })
//     .attr('cy', function(d) { d.y = coordinates[1]; });
// });

d3.selectAll('.player').on('mousedown', function() {
  var player = d3.select(this);

  var svg = d3.select('svg')
    .on('mousemove', mousemove);

  d3.event.preventDefault();

  function mousemove() {
    player.attr('cx', d3.mouse(svg.node())[0] )
    .attr('cy', d3.mouse(svg.node())[1]);
  }

});


// var updateEnemies = function() {
//   d3.select('svg')
//     .selectAll('.enemies')
//     //.data( enemies )
//     .transition()
//     .duration(1000)
//     .attr('cx', function(d) { return d.x * Math.random(); })
//     .attr('cy', function(d) { return d.y * Math.random(); });
// };