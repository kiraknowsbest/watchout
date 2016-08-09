// initialize enemies
var enemies = [];
var player = [{
  x: 75,
  y: 75
}];

var currentScore = 0;
var gamesPlayed = 0;
var highScore = 0;

for ( var i = 0; i < 10; i++ ) {
  enemies[i] = {
    x: 150 * Math.random(),
    y: 150 * Math.random()
  };
}

d3.select('.board')
  .append('svg')
  .attr('viewBox', '0 0 150 150')
  .append('defs')
  .append('pattern')
  .attr('id', 'asteroid')
  .attr('x', '0')
  .attr('y', '0')
  .attr('height', '15')
  .attr('width', '15')
  .append('image')
  .attr('xlink:href', 'asteroid.png')
  .attr('x', '0')
  .attr('y', '0')
  .attr('height', '15')
  .attr('width', '15');

d3.select('defs')
  .append('pattern')
  .attr('id', 'spaceman')
  .attr('x', '0')
  .attr('y', '0')
  .attr('height', '15')
  .attr('width', '15')
  .append('image')
  .attr('xlink:href', 'spaceman.png')
  .attr('x', '0')
  .attr('y', '0')
  .attr('height', '15')
  .attr('width', '15');

// appends .enemies to svg
d3.select('svg').selectAll('circle')
  .data( enemies )
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 7.5)
  .attr('fill', 'url(#asteroid)')
  .attr('class', 'enemies')
  .attr('id', 'asteroid')
  .attr('width', 15)
  .attr('height', 15);


// player element
d3.select('svg')
  .selectAll('.player')
  .data( player )
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 5)
  .attr('fill', 'url(#spaceman)')
  .attr('id', 'spaceman')
  .attr('class', 'player')
  .attr('width', '15')
  .attr('height', '15');

// update enemies
var update = function () {
  for ( var i = 0; i < enemies.length; i++ ) {
    enemies[i].x = Math.random() * 150;
    enemies[i].y = Math.random() * 150;
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
  }, 200 );

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