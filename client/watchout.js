// initialize enemies
var enemies = [];
var player = [{
  x: 50,
  y: 50
}];

var score = 0;

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
    d3.select('.current').selectAll('span').text(score++);
    d3.selectAll('.enemies')
    .data( enemies )
    .transition()
    .duration( interval * .75 )
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

  var svg = d3.select('svg')
    .on('mousemove', mousemove);

  d3.event.preventDefault();

  function mousemove() {
    player.attr('cx', d3.mouse(svg.node())[0] )
    .attr('cy', d3.mouse(svg.node())[1]);
  }

  var enemies = d3.selectAll('.enemies');
  // console.log(enemies.selectAll('.enemies').select('.enemies')._parents[0].attributes[2].value);
  // console.log( collisionCheck(d3.select('.enemies')));

  // var stillPlaying = true;
  // while (stillPlaying) {
  //   for ( var i = 0; i < enemies.length; i++ ) {
  //     console.log(enemies[i]);
  //     if ( collisionCheck(enemies[i]) ) {
  //       d3.select('.highscore').selectAll('span').text(score);
  //       score = 0;
  //     }
  //   }
  // }
  var collisionCheck = function (enemy) {
    var player = d3.selectAll('.player');
    var radiusPlayer = player.attr('r');
    var radiusEnemy = enemy.attr('r');
    var deltaX = +player.attr('cx') - +enemy.attr('cx');
    var deltaY = +player.attr('cy') - +enemy.attr('cy');
    var dist = Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) ) - radiusPlayer - radiusEnemy;
    return dist < 0;
  };
  console.log( collisionCheck(d3.select('.enemies')));


  console.log( collisionCheck( enemies.select('.enemies') ));

  // var stillPlaying = true;
  // while (stillPlaying) {
  //   for (var i = 0; i < enemies.length; i++) {
  //     if ( collisionCheck(enemies[i]) ) {
  //       // stillPlaying = false;
  //       // clearInterval(timer);
  //       // stop game function call
  //       // return;
  //       // d3.select('.current').selectAll('span').text( 5 );
  //       // console.log('crash');
  //     }
  //   }
  // }

});



// checkCollision = (enemy, collidedCallback) ->
//     _(players).each (player) ->
//       radiusSum =  parseFloat(enemy.attr('r')) + player.r
//       xDiff = parseFloat(enemy.attr('cx')) - player.x
//       yDiff = parseFloat(enemy.attr('cy')) - player.y

//       separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) )
//       collidedCallback(player, enemy) if separation < radiusSum
// ¶
// If we have a collision, just reset the score

//   onCollision = ->
//     updateBestScore()
//     gameStats.score = 0
//     updateScore()