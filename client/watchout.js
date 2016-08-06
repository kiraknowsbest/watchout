var asteroids = [];

for ( var i = 0; i < 11; i++ ) {
  asteroids[i] = {
    x: Math.random() * 100,
    y: Math.random() * 100
  };
}
for ( var i = 0; i < 11; i++ ) {
  d3.select('svg').selectAll('.enemies').data( asteroids ).enter().append('circle').attr('cx', function(d) { return d.x; }).attr('cy', function(d) { return d.y; }).attr('r', 5).style('fill', 'red');
}