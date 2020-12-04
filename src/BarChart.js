import * as d3 from "d3";

function barChart() {
    
  let data = [];

  const URLes =
    "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";

  fetch(URLes)
    .then((res) => res.json())
    .then((res) => {
      data = res;
    });

  const canvas = d3.select("#canvas");

  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 50, bottom: 40, right: 10 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const y = d3.scaleLinear().domain([0, 30]).range([iheight, 0]);
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, iwidth])
    .padding(0.1);

  const bars = g.selectAll("rect").data(data);

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.age))
    .attr("height", (d) => iheight - y(d.age))
    .attr("width", x.bandwidth());

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

  return <div id={"#canvas" + this.props.id}></div>;
}

export default barChart;
