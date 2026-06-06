import * as d3 from "d3";
import data from "./artist_data.json"


const sorted_data = data.sort((a, b) => a.popularity < b.popularity);
// Final colors: "#005151", "#e6ac07", "#bc8dff", "#00bbff", "#ff9488", "#6c4700", "#64364d", "#3f9818",

const x_offset = 0;
const y_offset = 0;

function artists_shown(transform) {
  let shown = [];

  const top = (-0.3 - transform.y) / transform.k;
  const bottom = (9.1 - transform.y) / transform.k;
  const left = (-6.8 - transform.x) / transform.k;
  const right = (15 - transform.x) / transform.k;

  const x_threshold = 1.6 / transform.k;
  const y_threshold = .2 / transform.k;

  for (const artist of sorted_data) {
    if (artist.x < left) {
      continue;
    }
    if (artist.x > right) {
      continue;
    }
    if (artist.y < top) {
      continue;
    }
    if (artist.y > bottom) {
      continue;
    }

    let invalid = false;
    for (const prev_artist of shown) {
      if (Math.abs(prev_artist.x - artist.x) < x_threshold && Math.abs(prev_artist.y - artist.y) < y_threshold) {
        invalid = true;
        break;
      }
    }

    if (!invalid) {
      shown.push(artist)
    }
  }

  return shown;
}

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


function handleZoom(event) {
  const { k, x, y } = event.transform;

  const points = d3.selectAll("circle");
  const labels = d3.selectAll("text");
  const max_artists = artists_shown(event.transform);
  points.data(data).attr("r", d => Math.sqrt(d.popularity / k) / (200));
  labels.data(data).attr("font-size", (d) => {
    if (!max_artists.includes(d)) {
      return 0;
    }
    return .2 / k;
  });


  points.attr("transform", (transform = event.transform));
  labels.attr("transform", (transform = event.transform));

}

export default function createVis() {
  const svg = d3.select("#spotify_artists")
    .attr("viewBox", [-1, -1, 10, 10]).style('width', '100vw').style('height', '100vh');


  const points_group = svg.append("g").attr('opacity', '.6');

  const points = points_group.selectAll("circle")
    .enter()
    .data(data)
    .join("circle")
    .attr("cx", (d => d.x + x_offset))
    .attr("cy", (d => d.y + y_offset))
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
    .attr('x', d => d.x + x_offset)
    .attr('y', d => d.y + y_offset)
    .attr('font-size', '0.001em')
    .attr('text-anchor', 'middle');

  const zoom = d3.zoom().scaleExtent([.8, 40]);
  // .extent([[marginLeft, 0], [width - marginRight, height]])
  // .translateExtent([[marginLeft, -Infinity], [width - marginRight, Infinity]]);

  zoom.on("zoom", e => handleZoom(e));



  svg
    .call(zoom)
    .call(zoom.transform, d3.zoomIdentity)


}
