// Copyright 2015 Zulkaida Akbar <za13@my.fsu.edu>
module.exports = function (N, S) {
  var Sz = 2 * S + 1;
  var Jz = 2 * N * S + 1;
  var maxSpin = N * S;
  var numberOfSpin = maxSpin + 1;
  var sum = 0;
  
  // init Jspin
  var Jspin = [];
  for (var i = 0; i < numberOfSpin; i++) {
    Jspin.push(0);
  }

  // init JzCounter
  var JzCounter = [];
  for (var i = 0; i < Jz; i++) {
    JzCounter.push(0);
  }

  // init particles
  var particles = [];
  for (var i = 0; i < N; i++) {
    particles.push(0);
  }

  // first particle loop
  var particles = [];
  for (var i = 1; i < Sz; i++) {
    
    particles[0] = i - S;

    for (var j = 1; j < N; j++) {
      particles[j] = -1 * S;
    }

    sum = 0;
    for (var k = 0; k < N; k++) {
      sum += particles[k];
    }

    JzCounter[sum + N * S] += 1;

    while (particles[0] > particles[N -1]) {

      for (var l = 1; l < N; l++) {
        var rightStatus = 1;
        for (var m = l + 1; m < N -1; m++) {
          if (particles[N -1] != particles[m]) {
            rightStatus = 0;
          }
        }

        if ((l < (N - 1) 
            && particles[l] < particles[l - 1]
            && particles[l] == particles[l + 1]
            && rightStatus > 0)
            || (l == (N - 1) && particles[N - 1] < particles[N - 2])
           ) {
          particles[l] += 1;
          for (var n = l + 1; n < N; n++) {
            particles[n] = -1 * S;
          }
          sum = 0;
          for (var o = 0; o < N; o++) {
            sum += particles[o]; 
          }
          JzCounter[sum + N * S] += 1;
        }        
      }
    }
    // end
  }

  JzCounter[0] += 1;
  for (var p = maxSpin; p > -1; p--) {
    var status = 1;
    while (status > 0) {
      var less = maxSpin - p;
      var bottom = less;
      var top = Jz - 1 - less;
      for (var q = bottom; q <= top; q++) {
        if (JzCounter[q] < 1) {
          status = 0;
        }
      }
      if (status > 0) {
        Jspin[p] = Jspin[p] + 1;
        for (var r = bottom; r <= top; r++) {
          JzCounter[r] -= 1;
        }
      }
    }
  }

  var numberOfState = 0;
  var percentages = [];

  for (var i = 0; i < numberOfSpin; i++) {
    percentages.push(0.0);
  }

  for (var i = maxSpin; i > -1; i--) {
    numberOfState += Jspin[i];
  }

  for (var i = maxSpin; i > -1; i--) {
    percentages[i] = (100.0 * Jspin[i])/(numberOfState + 1.0);
  }
  
  var index = [];
  var acquiredJspin = [];
  var acquiredPercentages = [];
  for (var i = maxSpin; i > -1; i--) {
    if (Jspin[i] != 0) {
      index.push(i);
      acquiredJspin.push(Jspin[i]);
      acquiredPercentages.push(percentages[i]);
    }
  }

  return {
    index: index,
    acquiredJspin: acquiredJspin,
    acquiredPercentages: acquiredPercentages
  }
}
