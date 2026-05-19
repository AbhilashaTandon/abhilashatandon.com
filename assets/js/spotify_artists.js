import * as d3 from "d3";
import data from "./artist_data.json"

// Final colors: "#005151", "#e6ac07", "#bc8dff", "#00bbff", "#ff9488", "#6c4700", "#64364d", "#3f9818",

function spatial_hash_max(data, scale) {
  //
  const cell_size_x = 2.5 / scale;
  const cell_size_y = .5 / scale;

  let hash_table = {};

  for (const artist of data) {
    const cell = [Math.floor(artist.x / cell_size_x), Math.floor(artist.y / cell_size_y)];
    if (cell in hash_table) {
      if (hash_table[cell].popularity < artist.popularity) {
        hash_table[cell] = artist;
      }
    }
    else {
      hash_table[cell] = artist;
    }

  }

  return Object.values(hash_table);

}



export default function createVis() {
  const svg = d3.select("svg")
    .attr("viewBox", [-1, -1, 10, 10]).style('width', '100vw').style('height', '100vh');


  const points_group = svg.append("g").attr('opacity', '.6');

  const points = points_group.selectAll("circle")
    .enter()
    .data(data)
    .join("circle")
    .attr("cx", (d => d.x))
    .attr("cy", (d => d.y))
    .attr('fill', "rgba(0, 0, 0, .25)")
    .attr("r", (d => Math.sqrt(d.popularity) / 200))
    .append("title")
    .text((d) => d.artist);


  const labels_group = svg.append('g');

  const labels = labels_group.selectAll('text')
    .enter()
    .data(data)
    .join('text')
    .text(d => d.artist)
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('font-size', '0.001em')
    .attr('text-anchor', 'middle');

  const zoom = d3.zoom().scaleExtent([.4, 32]);
  // .extent([[marginLeft, 0], [width - marginRight, height]])
  // .translateExtent([[marginLeft, -Infinity], [width - marginRight, Infinity]]);

  zoom.on("zoom", e => {
    // console.log(e.transform.invert());
    const max_artists = spatial_hash_max(data, e.transform.k);
    points_group.attr("transform", (transform = e.transform));
    labels_group.attr("transform", (transform = e.transform));
    points.data(data).attr("r", (d) => (d.popularity / (e.transform.k * e.transform.k)) / 200);
    labels.data(data).attr("font-size", (d) => {
      if (!max_artists.includes(d)) {
        return 0;
      }
      return .2 / e.transform.k;

    });

    // points.data(data).attr("r", (d) => {
    //   return Math.sqrt(d.popularity / e.transform.k) / 200;
    // });
  });



  svg
    .call(zoom)
    .call(zoom.transform, d3.zoomIdentity)


// return svg.node();
}
