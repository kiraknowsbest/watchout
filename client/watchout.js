// initialize enemies
var enemies = [];
var player = [{
  x: 50,
  y: 50
}];

var currentScore = 0;
var gamesPlayed = 0;
var highScore = 0;

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
  .style('fill', 'white')
  .style('opacity', '.2')
  .attr('xlink:href', 'asteroid.png')
  .attr('width', 4)
  .attr('height', 4);

// player element
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

// timer function

var timer = function (interval) {
  setInterval( function() {
    update();
    d3.selectAll('.enemies')
    .data( enemies )
    .transition()
    .duration( interval * 1.0 )
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  }, interval);
};

// function func () {}
// var func = function () {}

// invokes timer
timer(1000);

// event handler for player element
d3.selectAll('.player').on('mousedown', function() {
  var player = d3.select(this);

  //sets interval for collision check
  setInterval( function() {
    d3.select('.current').selectAll('span').text(currentScore++);
    d3.select('body').selectAll('.enemies').each(function(d, i) {
      if ( collisionCheck(this) ) {
        d3.select('.games-played').selectAll('span').text(gamesPlayed++);
        if (currentScore > highScore ) {
          highScore = currentScore;
          d3.select('.highscore').selectAll('span').text(highScore);
        }
        currentScore = 0;
      }
    });
  }, 250 );

  var svg = d3.select('svg')
    .on('mousemove', mousemove);

  d3.event.preventDefault();

  function mousemove() {
    player.attr('cx', d3.mouse(svg.node())[0] )
    .attr('cy', d3.mouse(svg.node())[1]);

    // d3.select('body').selectAll('.enemies').each(function(d, i) {
    //   console.log(collisionCheck(this));
  }

  //checks for collisions
  var collisionCheck = function (enemy) {
    var player = d3.selectAll('.player');
    var radiusPlayer = player.attr('r');
    var radiusEnemy = enemy.r.animVal.value;
    var deltaX = player.attr('cx') - enemy.cx.animVal.value;
    var deltaY = player.attr('cy') - enemy.cy.animVal.value;
    var dist = (Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY))) - radiusPlayer - radiusEnemy;
    return dist < 0;
  };

});