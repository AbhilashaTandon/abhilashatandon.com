import * as d3 from "d3";
import data from "../../collections/artist_data.json"

var initial_zoom_level = .8;

const scale_factor = .9;

const sorted_data = data.sort((a, b) => a.popularity < b.popularity);
// Final colors: "#005151", "#e6ac07", "#bc8dff", "#00bbff", "#ff9488", "#6c4700", "#64364d", "#3f9818",

const x_offset = 0;
const y_offset = 0;

function artists_shown(transform) {
  // if (transform.k > 38) {
  //   return sorted_data;
  // }
  let shown = [];

  const top = (-1 - transform.y) / transform.k;
  const bottom = (9.1 - transform.y) / transform.k;
  const left = (-6.8 - transform.x) / transform.k;
  const right = (15 - transform.x) / transform.k;

  const x_threshold = 1.7 / Math.pow(transform.k, 1.0);
  const y_threshold = .2 / Math.pow(transform.k, 1.0);

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


function handleZoom(event) {
  const { k, x, y } = event.transform;


  // zoom_level = k;
  console.log(k, x, y);

  const scale_factor = Math.max(Math.sqrt(k), .9);


  const points = d3.selectAll("circle");
  const labels = d3.selectAll("text");
  const max_artists = artists_shown(event.transform);

  points.data(data).attr("r", (d) => {
    return Math.sqrt(d.popularity) / 200 / scale_factor;
  });

  labels.data(data).attr("font-size", (d) => {
    if (!max_artists.includes(d)) {
      return 0;
    }
    return Math.max(.035 * Math.pow(Math.log(d.popularity), 1 / Math.pow(scale_factor, .75)) / scale_factor, 0.002);

  });


  points.attr("transform", (transform = event.transform));
  labels.attr("transform", (transform = event.transform));

}

export default function createVis() {

  // console.log(zoom_level);
  const zoom = d3.zoom().scaleExtent([.8, 40]);

  const svg = d3.select("#spotify_artists")
    .attr("viewBox", [-1, -1, 10, 10]).style('width', '100vw').style('height', '100vh')
    // .call(zoom) // here
    // .call(zoom.transform, d3.zoomIdentity.translate(.37486, 4.0352))
    // .append("svg:g")
    // .attr("transform", "translate(.37486,4.0352) ");
    ;




  const points_group = svg.append("g").attr('opacity', '.6');

  const points = points_group.selectAll("circle")
    .enter()
    .data(data)
    .join("circle")
    .attr("cx", (d => d.x + x_offset))
    .attr("cy", (d => d.y + y_offset))
    .attr('fill', "rgba(0, 0, 0, .25)")
    // .attr("r", (d => Math.sqrt(d.popularity) / 200))
    .append("title")
    .text((d) => d.artist);


  const labels_group = svg.append('g');

  console.log(zoom.append)

  const labels = labels_group.selectAll('text')
    .enter()
    .data(data)
    .join('text')
    .text(d => d.artist)
    .attr('x', d => d.x + x_offset)
    .attr('y', d => d.y + y_offset)
    // .attr('font-size', d => String(0.001 * d.popularity) + 'em')
    // .attr('opacity', d => String(100 - 500 / d.popularity + zoom_level) + '%')
    .attr('text-anchor', 'middle')
    .classed('noselect', true);

  // .extent([[marginLeft, 0], [width - marginRight, height]])
  // .translateExtent([[marginLeft, -Infinity], [width - marginRight, Infinity]]);

  zoom.on("zoom", e => handleZoom(e));



  svg
    .call(zoom)
    .call(zoom.transform, d3.zoomIdentity.translate(1.4, 3).scale(initial_zoom_level))


}
