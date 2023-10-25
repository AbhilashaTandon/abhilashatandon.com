/*
---
title: "Color Picker"
desc: 'Specify a color by narrowing it down iteratively.'
date: '2023-09-13'
---
*/

import { useState } from "react";
import ColorPicker from "@/styles/ColorPicker.module.css";
import ContentGrid from "@/styles/ContentGrid.module.css";
import Link from "next/link";
import { parse } from "date-fns";

export default function Main() {
  return (
    <main>
      <h4>
        Ever wanted to choose a color for a project but struggled to find the
        right one with a color picker?
      </h4>
      <h5>
        Click the color below that&apos;s closest to the one you have in mind!
      </h5>
      <ColorGrid />
    </main>
  );
}

const basis_vectors = [
  [1, 1, 1],
  [1, -1, 0],
  [1, 1, -1],
  [-1, -1, -1],
  [-1, 1, 0],
  [-1, -1, 1],
];
// vectors parallel to directions in oppositional color model
//positive and negative of brightness, +R-G, +Y-B

const init_colors = [
  [154, 152, 152],
  [255, 255, 255],
  [196, 2, 35],
  [255, 211, 0],
  [0, 0, 0],
  [0, 163, 104],
  [0, 134, 191],
];

//6 base colors of oppositional color model

function normalize(color_array) {
  //gets rid of invalid values
  for (var i = 0; i < 3; i++) {
    if (color_array[i] < 0) {
      color_array[i] = 0;
    } else if (color_array[i] > 255) {
      color_array[i] = 255;
    }
  }
  return color_array;
}

function format_color(color, format) {
  if (format === "rgb") {
    //html style rgb
    return "rgb(" + color.join(", ") + ")";
  } else if (format === "hsv") {
    color = rgb_to_hsv(color);
    return "hsv(" + color[0] + "°, " + color[1] + "%, " + color[2] + "%)";
  } else if (format === "hex") {
    //hex value
    var to_hex = (x) => ("0" + x.toString(16)).slice(-2);
    return "#" + to_hex(color[0]) + to_hex(color[1]) + to_hex(color[2]);
  }
}

function rgb_to_hsv(color) {
  var r = color[0];
  var g = color[1];
  var b = color[2];
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);

  var range = max - min;
  var h_prime;
  if (range === 0) {
    h_prime = 0;
  } else if (max === r) {
    h_prime = ((g - b) / range) % 6;
  } else if (max === g) {
    h_prime = (b - r) / range + 2;
  } else if (max === b) {
    h_prime = (r - g) / range + 4;
  }
  var h = Math.round(60 * h_prime);
  var v = Math.round((max / 255) * 100);
  var s = Math.round(v === 0 ? 0 : range / v);
  return [h, s, v];
}

function ColorGrid() {
  //component with colors in grid
  const [iter, setIter] = useState(128);
  const [colors, setColors] = useState(init_colors);

  function handleClick(id) {
    var new_colors = colors;
    new_colors[0] = colors[id + 1]; //set current color to click location
    // console.log(iter, colors);
    if (iter < 1) {
      //if amount to change colors is smaller than 1
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 3; j++) {
          new_colors[i + 1][j] = colors[0][j]; //set all colors to picked color
        }
      }
    } else {
      new_colors = init_colors; //initialize colors

      for (var i = 0; i < 6; i++) {
        var current_color = [0, 0, 0];
        for (var j = 0; j < 3; j++) {
          current_color[j] = colors[id + 1][j] + iter * basis_vectors[i][j]; //set other colors to slightly varied versions of chosen color
        }
        new_colors[i + 1] = normalize(current_color);
      }
    }
    setIter((a) => a / 2); //decrease iter
    setColors(new_colors);
  }

  var buttons = [0, 1, 2, 3, 4, 5];
  var button_display = buttons.map((x) => (
    <ColorButton
      key={x}
      id={x}
      format_color={format_color}
      handleClick={handleClick}
      colors={colors}
    /> //map array to list of components
  ));

  function reset() {
    setIter(128);
    setColors(init_colors);
  }

  return (
    <>
      <button onClick={reset}>Reset</button>

      <div
        className={ColorPicker.window}
        style={{ backgroundColor: format_color(colors[0]) }}>
        <div className={ContentGrid.grid}>{button_display}</div>
        {/* <h3> Based loosely on the oppositional color model: <Link href = "">Wikipedia</Link></h3> */}
      </div>

      <h5>
        Current color:{" "}
        {format_color(colors[0], "rgb") +
          "\t" +
          format_color(colors[0], "hsv") +
          "\t" +
          format_color(colors[0], "hex")}
      </h5>
    </>
  );
}

function ColorButton({ id, format_color, handleClick, colors }) {
  //single color button tile
  var formatted_color = format_color(colors[id + 1], "rgb"); //converts to html
  var brightness = colors[id + 1].reduce((a, b) => a + b); //sum of colors
  return (
    <button
      key={id}
      style={{
        backgroundColor: formatted_color, //inline css is the only way
      }}
      className={ColorPicker.tile}
      onClick={() => handleClick(id)}>
      <h5
        style={{
          color: brightness > 384 ? "black" : "white", //propr text color contrast
        }}>
        {formatted_color}
      </h5>
    </button>
  ); //maybe add text here showing hex value, change text color depending on background color);
}
