(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var spinBoson=require("./spin-boson.js");var w=940;var h=300;var pad=20;var leftPad=100;var sInput=document.getElementById("S");sInput.value=3;sInput.addEventListener("keyup",function(){update(10,sInput.value)});function getOfArray(numArray,minOrMax){return Math[minOrMax].apply(null,numArray)}function createTriplets(data){var triplets=[];for(var i=0;i<data.index.length;i++){var d=[data.index[i],data.acquiredJspin[i],data.acquiredPercentages[i]*10];triplets.push(d)}return triplets}function update(N,S){N=N||10;S=S||3;var data=spinBoson(N,S);d3.select("#graph > *").remove();var svg=d3.select("#graph").append("svg").attr("width",w).attr("height",h);var x=d3.scale.linear().domain([data.index[data.index.length-1],data.index[0]]).range([leftPad,w-pad]);var y=d3.scale.linear().domain([getOfArray(data.acquiredJspin,"min"),getOfArray(data.acquiredJspin,"max")]).range([h-pad*2,pad]);var xAxis=d3.svg.axis().scale(x).orient("bottom");var yAxis=d3.svg.axis().scale(y).orient("left");svg.append("g").attr("class","axis").attr("transform","translate(0, "+(h-pad)+")").call(xAxis);svg.append("g").attr("class","axis").attr("transform","translate("+(leftPad-pad)+", 0)").call(yAxis);var triplets=createTriplets(data);var maxR=d3.max(triplets.map(function(d){return d[2]}));var r=d3.scale.linear().domain([0,d3.max(triplets,function(d){return d[2]})]).range([0,20]);svg.selectAll("circle").data(triplets).enter().append("circle").attr("class","circle").attr("cx",function(d){return x(d[1])}).attr("cy",function(d){return y(d[0])}).transition().duration(500).attr("r",function(d){return r(d[2])})}update()},{"./spin-boson.js":2}],2:[function(require,module,exports){module.exports=function(N,S){var Sz=2*S+1;var Jz=2*N*S+1;var maxSpin=N*S;var numberOfSpin=maxSpin+1;var sum=0;var Jspin=[];for(var i=0;i<numberOfSpin;i++){Jspin.push(0)}var JzCounter=[];for(var i=0;i<Jz;i++){JzCounter.push(0)}var particles=[];for(var i=0;i<N;i++){particles.push(0)}var particles=[];for(var i=1;i<Sz;i++){particles[0]=i-S;for(var j=1;j<N;j++){particles[j]=-1*S}sum=0;for(var k=0;k<N;k++){sum+=particles[k]}JzCounter[sum+N*S]+=1;while(particles[0]>particles[N-1]){for(var l=1;l<N;l++){var rightStatus=1;for(var m=l+1;m<N-1;m++){if(particles[N-1]!=particles[m]){rightStatus=0}}if(l<N-1&&particles[l]<particles[l-1]&&particles[l]==particles[l+1]&&rightStatus>0||l==N-1&&particles[N-1]<particles[N-2]){particles[l]+=1;for(var n=l+1;n<N;n++){particles[n]=-1*S}sum=0;for(var o=0;o<N;o++){sum+=particles[o]}JzCounter[sum+N*S]+=1}}}}JzCounter[0]+=1;for(var p=maxSpin;p>-1;p--){var status=1;while(status>0){var less=maxSpin-p;var bottom=less;var top=Jz-1-less;for(var q=bottom;q<=top;q++){if(JzCounter[q]<1){status=0}}if(status>0){Jspin[p]=Jspin[p]+1;for(var r=bottom;r<=top;r++){JzCounter[r]-=1}}}}var numberOfState=0;var percentages=[];for(var i=0;i<numberOfSpin;i++){percentages.push(0)}for(var i=maxSpin;i>-1;i--){numberOfState+=Jspin[i]}for(var i=maxSpin;i>-1;i--){percentages[i]=100*Jspin[i]/(numberOfState+1)}var index=[];var acquiredJspin=[];var acquiredPercentages=[];for(var i=maxSpin;i>-1;i--){if(Jspin[i]!=0){index.push(i);acquiredJspin.push(Jspin[i]);acquiredPercentages.push(percentages[i])}}return{index:index,acquiredJspin:acquiredJspin,acquiredPercentages:acquiredPercentages}}},{}]},{},[1]);