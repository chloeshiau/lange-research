var width = 1360,
    height = 600;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(180)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("miserables.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("g").append("circle")
      .attr("class", "node")
      .attr("r", 15)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  var text = svg.selectAll("g")
      .append("text")
      .attr("class", "text")
      .attr("font-size", "12px")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    text.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
  });

    // Method to create the filter
    createFilter();

    // Method to create the filter, generate checkbox options on fly
    function createFilter() {
        d3.select(".filterContainer").selectAll("div")
          .data(["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
          .enter()  
          .append("div")
          .attr("class", "checkbox-container")
          .append("label")
          .each(function (d) {
                // create checkbox for each data
                d3.select(this).append("input")
                  .attr("type", "checkbox")
                  .attr("id", function (d) {
                      return "chk_" + d;
                   })
                  .attr("checked", true)
                  .on("click", function (d, i) {
                      // register on click event
                      var lVisibility = this.checked ? "visible" : "hidden";
                      filterGraph(d, lVisibility);
                   })
                d3.select(this).append("span")
                    .text(function (d) {
                        return d;
                    });
        });
        $("#sidebar").show();
    }


 // Method to filter graph
    function filterGraph(aType, aVisibility) {

        // change the visibility of the connection path
        link.style("visibility", function (o) {
          console.log(o.target);
            var lOriginalVisibility = $(this).css("visibility");
            if(o.value == aType) {
              aVisibility == lOriginalVisibility;
              o ? "visible" : "hidden";
              return aVisibility;
            }
  
            // return o.value == aType ? aVisibility : lOriginalVisibility;
        });

        // change the visibility of the node
        // if all the links with that node are invisibile, the node should also be invisible
        // otherwise if any link related to that node is visibile, the node should be visible
        node.style("visibility", function (o, i) {
          console.log("i am in here");
            var lHideNode = true;
            link.each(function (d, i) {
              //console.log("source" + d.source + " target" + d.target + " link"+ o);
                if (d.value === o.group || d.target === o.group || d.source === o.group) {
                    if ($(this).css("visibility") === "visible") {
                        lHideNode = false;
                        // we need show the text for this circle
                        d3.select(d3.selectAll(".node")[0][i]).style("visibility", "visible");
                        return "visible";
                    }
                }
            });
            if (lHideNode) {
                // we need hide the text for this circle 
                d3.select(d3.selectAll(".node")[0][i]).style("visibility", "hidden");
                return "hidden";
            }
        });
    }

});







