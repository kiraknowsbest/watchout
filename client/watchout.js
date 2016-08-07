// initialize enemies
var enemies = [];
var player = [{
  x: 75,
  y: 75
}];

var currentScore = 0;
var gamesPlayed = 0;
var highScore = 0;

for ( var i = 0; i < 26; i++ ) {
  enemies[i] = {
    x: 150 * Math.random(),
    y: 150 * Math.random()
  };
}

//appends svg board and patterns to DOM
// d3.select('.board')
//   .append('svg')
//   .attr('viewBox', '0 0 150 150')
//   .append('defs')
//   .append('g')
//   .attr('id', 'asteroid')
//   .append('circle')
//   .attr('x', '0')
//   .attr('y', '0')
//   .attr('r', '2')
//   .attr('fill', 'asteroid.png');


// d3.select('svg').selectAll('circle')
//   .data( enemies )
//   .enter()
//   .append('circle')
//   .attr('id', 'asteroid');


d3.select('.board')
  .append('svg')
  .attr('viewBox', '0 0 150 150')
  .append('defs')
  .append('pattern')
  .attr('patternUnits', 'objectBoundingBox')
  .attr('id', 'asteroid')
  .attr('x', '0')
  .attr('y', '0')
  .attr('height', '10')
  .attr('width', '10')
  .style('fill', 'svg:image')
  .append('image')
  .attr('xlink:href', 'asteroid.png')
  .attr('x', '0')
  .attr('y', '0')
  .attr('height', '4');

// var defs = svg.append('defs');

// var pattern = svg.append('pattern')
//   .attr({
//     'width': 20,
//     'height': 20,
//     fill: url('asteroid.png')
//   });

// svg.selectAll('circle')
//   .data( enemies )
//   .enter()
//   .append('circle')
//   .attr('cx', function(d) { return d.x; })
//   .attr('cy', function(d) { return d.y; })
//   .attr('r', 2)
//   .attr('class', 'enemies')
//   .attr('xlink:href', 'asteroid.png')
//   .attr('width', 4)
//   .attr('height', 4);



// appends .enemies to svg
d3.select('svg').selectAll('circle')
  .data( enemies )
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 2)
  .attr('fill', 'asteroid.png')
  .attr('class', 'enemies')
  .attr('id', 'asteroid')
  .attr('width', 4)
  .attr('height', 4);
  // .attr('x', '-8')
  // .attr('y', '-8')
  // .attr('width', '16')
  // .attr('height', '16');

// var svg = d3.select('svg');

// var defs = d3.select('defs');

// defs.append('svg:pattern')
//   .attr('id', 'enemy-pattern')
//   .attr('width', 4)
//   .attr('height', 4)
//   .append('svg:circle')
//   .attr('xlink:href', 'svc:image') //this
//   .attr('x', 100 * Math.random())
//   .attr('y', 100 * Math.random())
//   .attr('width', 4)
//   .attr('height', 4);

// var svg = d3.select(this.el)
//   .append('svg')
//   .attr('width', 750)
//   .attr('height', 500);

// var defs = svg.append('svg:defs');
// defs.append('svg:pattern')
//     .attr('id', 'enemy-pattern')
//     .attr('width', '4')
//     .attr('height', '4')
//     .append('svg:image')
//     .attr('xlink:href', 'asteroid.png')
//     .attr('x', 100 * Math.random())
//     .attr('y', 100 * Math.random())
//     .attr('width', 4)
//     .attr('height', 4);

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