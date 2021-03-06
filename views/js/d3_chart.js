// var data = [230,245,269,274,292,320,368];
// var dataError = false;
// for ( var i = 0; i < data.length; i++ ) {
//   if ( data[i] === "N/A") {
//     dataError = true;
//   }
// }

// if ( dataError ) {
//   data = [0];
// }

var chart = d3.select(".chart");
var chartBackground = d3.select(".chartBackground");

// <polyline points="50,375
//                     150,375 150,325 250,325 250,375
//                     350,375 350,250 450,250 450,375
//                     550,375 550,175 650,175 650,375
//                     750,375 750,100 850,100 850,375
//                     950,375 950,25 1050,25 1050,375
//                     1150,375" />

if ( data.length !== 1 ){
  var polygon = chartBackground.append("polygon")
                        .attr("fill", "url(#grad1)")
                        .attr("points", function(){
                          var result = [];
                          var range = d3.max(data) - d3.min(data);

                          for ( var i  = 0; i < data.length; i++ ) {
                            var xCo = Math.floor(((( i / ( data.length - 1 ) ) * 90 ) + 5) * 4 );
                            result.push(xCo);

                            var diff = d3.max(data) - data[i];
                            var yCo =  Math.floor((((diff / range) * 80) + 5) * 4 );

                            result.push(yCo);
                          }

                          var xTopRight = 400;
                          result.push(xTopRight);

                          var lastDataPoint = data.length - 1;
                          var diffLast = d3.max(data) - data[lastDataPoint];
                          var yTopRight = ((((diffLast / range) * 80) + 5) * 4 );
                          result.push(yTopRight);

                          result.push(400);
                          result.push(400);
                          result.push(0);
                          result.push(400);
                          result.push(0);

                          var firstDataPoint = data[0];
                          var diffFirst = d3.max(data) - firstDataPoint;
                          var yBotLeft = ((((diffFirst / range) * 80) + 5) * 4 );
                          result.push(yBotLeft);

                          var string = "";
                          for ( var j = 0; j < result.length; j++) {
                              if( j % 2) {
                                string = string + result[j]+" "
                              } else {
                                string = string + result[j]+","
                              }
                          }
                          return string;
                        });
}

// <line x1="25%" y1="75%" x2="50%" y2="25%"></line>
var lines =  chart.selectAll("line")
                  .data(data)
                  .enter().append("line")
                    .attr("x1", function(d, i){
                      if ( i !== (data.length - 1) ) {
                        var percent = Math.floor((( i / ( data.length - 1 ) ) * 90 ) + 5 );
                        return percent+"%";
                      }
                    })
                    .attr("y1", function(d, i){
                      if ( i !== (data.length - 1) ) {
                        var range = d3.max(data) - d3.min(data);
                        var diff = d3.max(data) - d;
                        if ( diff === 0 && d3.max(data) === d3.min(data) ) {
                          var diff = d3.max(data);
                        }
                        if ( range === 0 && d3.max(data) === d3.min(data) ) {
                          var range = d3.max(data);
                        }
                        return (((diff / range) * 80) + 5) +"%";
                      }
                    })
                    .attr("x2", function(d, i){
                      if ( i !== (data.length - 1) ) {
                        var percent = Math.floor((( (i+1)  / ( data.length - 1 ) ) * 90 ) + 5 );
                        return percent+"%";
                      }
                    })
                    .attr("y2", function(d, i){
                      if ( i !== (data.length - 1) ) {
                        var range = d3.max(data) - d3.min(data);
                        var diff = d3.max(data) - data[i+1];
                        if ( diff === 0 && d3.max(data) === d3.min(data) ) {
                          var diff = d3.max(data);
                        }
                        if ( range === 0 && d3.max(data) === d3.min(data) ) {
                          var range = d3.max(data);
                        }
                        return (((diff / range) * 80) + 5) +"%";
                      }
                    });

if ( data.length !== 1 && d3.max(data) !== d3.min(data) ){
  var maxLine = chart.append("line")
                    .attr("class", "maxLine")
                    .attr("x1", 0)
                    .attr("y1", 5 +"%")
                    .attr("x2", 100+"%")
                    .attr("y2", 5 +"%");
}

var minLine = chart.append("line")
                  .attr("class", "minLine")
                  .attr("x1", 0)
                  .attr("y1", 85 +"%")
                  .attr("x2", 100+"%")
                  .attr("y2", 85 +"%");

var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")

if ( data.length !== 1 ){
  // <circle cx="75%" cy="50%" r="4"></circle>
  var dots = chart.selectAll("circle")
                  .data(data)
                  .enter().append("circle")
                    .attr("cx", function(d, i){
                      var percent = Math.floor((( i / ( data.length - 1 ) ) * 90 ) + 5 );
                      return percent+"%";
                    })
                    .attr("cy", function(d){
                      var range = d3.max(data) - d3.min(data);
                      var diff = d3.max(data) - d;
                      if ( diff === 0 && d3.max(data) === d3.min(data) ) {
                        var diff = d3.max(data);
                      }
                      if ( range === 0 && d3.max(data) === d3.min(data) ) {
                        var range = d3.max(data);
                      }
                      return (((diff / range) * 80) + 5) +"%";
                    })
                    .attr("r", 4)
                    .on("mouseover", function(d, i){

                      var diff = data[i] - ( data[i-1] );
                      if ( i === 0 || diff === 0) {
                        return tooltip.style("visibility", "visible").text(d);
                      } else {
                        return tooltip.style("visibility", "visible").text(d+" (+"+(data[i]-data[i-1])+")");
                      }
                    })
                    .on("mousemove", function(){
                      return tooltip.style("top", (event.pageY-26)+"px").style("left",(event.pageX-100)+"px");
                    })
                    .on("mouseout", function(){
                      return tooltip.style("visibility", "hidden");
                    });
}

if ( data.length !== 1 && d3.max(data) !== d3.min(data)  ){
  var labelMax = chart.append("text")
                      .attr("x", "5%")
                      .attr("y", "7%")
                      .attr("dy", ".71em")
                      .text(function(){
                        var maxVal = data.length - 1;
                        return data[maxVal];
                      });
}

var labelMin = chart.append("text")
                    .attr("x", "95%")
                    .attr("y", "87%")
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text(function(){
                      var maxVal = data.length - 1;
                      return data[0];
                    });
