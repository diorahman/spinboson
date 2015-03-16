var spinBoson = require('./spin-boson.js');

var w = 940;
var h = 300;
var pad = 20;
var leftPad = 100;

var sInput = document.getElementById('S');
sInput.value = 3;

sInput.addEventListener('keyup', function() {
  update(10, sInput.value);
});

function getOfArray(numArray, minOrMax) {
  return Math[minOrMax].apply(null, numArray);
}

function createTriplets(data) {
  var triplets = [];
  for (var i = 0; i < data.index.length; i++) {
    var d = [data.index[i], data.acquiredJspin[i], data.acquiredPercentages[i] * 10.0];
    triplets.push(d);
  }
  return triplets;
}

function update (N, S) {
  N = N || 10;
  S = S || 3;

  var data = spinBoson(N, S);

  d3.select('#graph > *').remove();

  var svg = d3.select('#graph')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

  var x = d3.scale.linear().domain([data.index[data.index.length - 1], data.index[0]]).range([leftPad, w-pad]);
  var y = d3.scale.linear().domain([getOfArray(data.acquiredJspin, 'min'), getOfArray(data.acquiredJspin, 'max')]).range([h-pad*2, pad]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom');
  var yAxis = d3.svg.axis().scale(y).orient('left');

  svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0, ' + (h - pad) + ')')
      .call(xAxis);
   
  svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + (leftPad - pad) + ', 0)')
      .call(yAxis);

  var triplets = createTriplets(data);

  var maxR = d3.max(triplets.map(function (d) { return d[2]; }));
  var r = d3.scale.linear()
              .domain([0, d3.max(triplets, function (d) { return d[2]; })])
              .range([0, 20]);

  svg.selectAll("circle")
      .data(triplets)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", function (d) { return x(d[1]); })
      .attr("cy", function (d) { return y(d[0]); })
      .transition()
      .duration(500)
      .attr("r", function (d) { return r(d[2]); });
}

update();
