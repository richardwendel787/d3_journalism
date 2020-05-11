// @TODO: YOUR CODE HERE!
//var schema="id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,healthcare,healthcareLow,healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh,-0.385218228".split(',')
//var y_name="obesityHigh";
//vay x_name="income";

function BuildScatter()
{
    var dataloc="assets/data/data.csv";
    var data_points=[];
    var margin={top: 10, right: 30, bottom: 40, left: 50};
    //  var margin = 20; 
    //chart_w = 520 - margin.left - margin.right,
    var chart_w = parseInt(d3.select("#scatter").style("width"));
    var chart_h =(chart_w / 1.6);

    //var svg=d3.select("#circlescatter")
    //.append('svg') //make the base svg graph
    //.attr('height',chart_h + margin.top + margin.bottom)
    //.attr('width',chart_w + margin.left + margin.right)
    //.append('g')
    //.attr("transform","translate(" + margin.left + "," + margin.top + ")")

    //svg.append('rect')//make background rectangle
    var svg = d3.select("#scatter").append("svg").attr("height", chart_h).attr("width", chart_w).attr("class", "chart");

    //1define svg, 2 imports csv 3 visualization function, 4 define visualization function
    d3.csv(dataloc).then(function(data)
    { //read the data
        //console.log(data);

        
        svg.append("text")
            .attr("text-anchor","end")
            .attr("transform","rotate(-90)")
            .attr("y",-margin.left+20)
            .attr("x",-margin.top - chart_h/2 +20)
            .text("obesityHigh Percentage");
        
        var x_vals=[];
        var y_vals=[];
        var x = d3.scaleLinear()//scale the x and y to be within the same domain
                .domain([0,80000])// plug in the min and max of x
                .range([0,chart_w])
        svg.append("g")
            .attr("transform","translate(0,"+chart_h+")")
            .call(d3.axisBottom(x).tickSize(-chart_h*1.3).ticks(10))
            .select(".domain").remove();
        var y=d3.scaleLinear()
            .domain([0,100])// plug in the min and max of y
            .range([chart_h,0])
            .nice();
        svg.append("g")
            .call(d3.axisLeft(y).tickSize(-chart_h*1.3).ticks(10))
            .select(".domain").remove();      


        svg.append("g").attr("class","txt");
        var txt=d3.select(".xText");
        function RefreshText(){
            txt.attr("transform","translate("+((chart_w-100)/2 +100)+", "+(chart_h-40)+")")
        }
        txt.append("text")
        .attr("y",0)
        .attr("data-name","income")
        .attr("data-axis","x")
        .attr("class","aText active x")
        .text("Income by obesity");
        // svg.append("text")  //add text to our axes
        //     .attr("text-anchor","end")
        //     .attr("x",chart_w/2 + margin.left)
        //     .attr("y",chart_h+margin.top+20)
        //     .text("Income in thousands of dollars");
        // svg.append("text")
        //     .attr("text-anchor","end")
        //     .attr("transform","rotate(-90)")
        //     .attr("y",-margin.left+20)
        //     .attr("x",-margin.top - chart_h/2 +20)
        //     .text("obesityHigh Percentage");
        data.forEach(function(row)
        {
            x_vals.push(row.income);
            y_vals.push(row.obesityHigh);
            var x_point=row['income'];
            var y_point=row['obesityHigh'];
            svg.append("g")//append circle dots for each point
            //.enter()
                .append("circle")
                .attr("cx",x(x_point))
                .attr("cy",y(y_point))
                .attr("r",15)
                .style("fill","#FF0000");
        });

        //use x, y min, max values to define data points
        //xin_min, x_max, y_min, y_max

        var x_min;
        var x_max ;
        var y_min;
        var y_max;
        
        var curX = "poverty";
        var curY ="obesity";

        function x_min_max()
        {
            x_min = d3.min(data, function(d)
            {
                return parseFloat(d[curX]) * 0.9;
            });
            x_max = d3.max(data, function(d){
                return parseFloat(d[curX]) * 1.1;
            });
        };

        function y_min_max()
        {
            y_min = d3.min(data, function(d){
                return parseFloat(d[curY]) * 0.9;
            });
            y_max = d3.max(data, function(d){
                return parseFloat(d[curY]) * 1.1;
            });
        };

        x_min_max();
        y_min_max();

        //var margin = 20; 

        var xScale =d3.scaleLinear()
            .domain([x_min, x_max])
            .range([y_min, y_max])
            .nice();

            //put margin inside range later
        //var x_vals=[];
        //var y_vals=[];
    });
};
    //add labels, tic marks, resize the graph, make it more responsive
    //update the locations, and update the radius, if there is a change in the data
    //add a tool tip
      //label-change (bonus)
      //all these functions are in visualization function
      //inside the d3.csv.data location function
BuildScatter();

    /*
    function BuildScatter()
    {
        var dataloc="http://127.0.0.1:8080/assets/data/data.csv";
        var data_points=[];
        d3.csv(dataloc).then(function(data){
            var header = [];
            data.forEach(function (line){
                    var x_point=line['income'];
                    var y_point=line['obesityHigh'];
                    var z_value=line['state'];
                    var scaled_x = (parseFloat(x_point)/1000).toPrecision(3);
                    data_points.push([scaled_x,y_point,z_value]);       //x represents income, in thousands

            });
        });
    };
    var margin = {top: 10, right: 30, bottom: 40, left: 50},
    chart_w = 520 - margin.left - margin.right,
    chart_h = 520 - margin.top - margin.bottom;
    var chart_w=300;
    var chart_h=500;
    var svg=d3.select("#circlescatter").append('svg')
    .attr('height',chart_h)
    .attr('width',chart_w)
    .append('g')
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    svg.append('rect')
            .attr("x",0)
            .attr("y",0)
            .attr("height",chart_h)
            .attr("width",chart_w)
            .style("fill","FFFFFF")


            y=d3.scaleLinear()
            .domain([0,100])
            .range([chart_h,0])
            .nice();

            svg.append("g")
            .attr("transform","translate(0,"+chart_h+")")
            .call(d3.axisBotton(x).tickSize(-chart_h*1.3).ticks(10))
            .select(".domain").remove();

            svg.append("g")
            .call(d3.axisLeft(y).tickSize(-chart_h*1.3).ticks(10))
            .select(".domain").remove();

            svg.append("text")
            .attr("text-anchor","end")
            .attr("y",chart_h+margin.top+20)
            .attr("x",chart_w/2 + margin.left)
            .text("Income in thousands of dollars");
            svg.append("text")
            .attr("text-anchor","end")
            .attr("transform","rotate(-90)")
            .attr("y",-margin.left+20)
            .attr("x",-margin.top - chart_h/2 +20)
            .text("Obesity Percentage");

            svg.append("g")
            .selectAll("dot")
            .data(data)
            .entrt()
            .append("circle")
            .attr("cx",function(d){return x[d[0]];})
            .attr("cy",function(d){return y[d[0]];})
            .attr("radius",5)
            .style("fill","A0A0A0A0");
    };
    d3.csv(dataloc, function(data) //read the data
    {
        var x = d3.scaleLinear()//scale the x and y to be within the same domain
            .domain([0,100])
            .range([0,chart_w]);
        svg.append("g")
            .attr("transform","translate(0,"+chart_h+")")
            .call(d3.axisBottom(x).tickSize(-chart_h*1.3).ticks(10))
            .select(".domain").remove();
        var y=d3.scaleLinear()
            .domain([0,100])
            .range([chart_h,0])
            .nice();
        svg.append("g")
            .call(d3.axisLeft(y).tickSize(-chart_h*1.3).ticks(10))
            .select(".domain").remove();        
        svg.append("text")  //add text to our axes
            .attr("text-anchor","end")
            .attr("x",chart_w/2 + margin.left)
            .attr("y",chart_h+margin.top+20)
            .text("Income in thousands of dollars");
        svg.append("text")
            .attr("text-anchor","end")
            .attr("transform","rotate(-90)")
            .attr("y",-margin.left+20)
            .attr("x",-margin.top - chart_h/2 +20)
            .text("obesityHigh Percentage");
        var x_vals=[];
        var y_vals=[];
        data.forEach(function(e){
            x_vals.push(e.income);
            y_vals.push(e.obesityHigh);
        });        
        console.log(x_vals);
        svg.append("g")//append circle dots for each point
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx",function(d){return x(d.income);})
            .attr("cy",function(d){return y(d.obesityHigh);})
            .attr("r",5)
            .style("fill","#A0A0A0");
        for (var i=0; i<item.length; i++)
        {
            console.log(item[i]);
        };
        item.forEach(function(element){
            var x_point=element['income'];
            var y_point=element['obesityHigh'];
            console.log(element['income']);
            svg.append("g")//append circle dots for each point
                .enter()
                .append("circle")
                .attr("cx",x_point)
                .attr("cy",y_point)
                .attr("r",5)
                .style("fill","#A0A0A0");
        };
*/