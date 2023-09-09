import General from "@/styles/General.module.css";
import { useState } from "react";
import ColorPicker from "@/styles/ColorPicker.module.css";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <h3 className={General.medium_text}>
        Ever wanted to choose a color for a project but struggled to find the
        right one with a color picker?
      </h3>
      <p className={General.medium_text}>
        Click the color below that&apos;s closest to the one you have in mind!
      </p>
      <ColorGrid />
    </>
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

function normalize(color_array) {
  for (var i = 0; i < 3; i++) {
    if (color_array[i] < 0) {
      color_array[i] = 0;
    } else if (color_array[i] > 255) {
      color_array[i] = 255;
    }
  }
  return color_array;
}

function format_color(color) {
  return "rgb(" + color.join(", ") + ")";
}

function ColorGrid() {
  const [iter, setIter] = useState(128);
  const [colors, setColors] = useState(init_colors);

  function handleClick(id) {
    if (iter < 1) {
      var new_colors = colors;
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 3; j++) {
          new_colors[i][j] = colors[0][j];
        }
      }
      setColors(new_colors);
      console.log("Complete");
    } else {
      var new_colors = init_colors;
      new_colors[0] = colors[id + 1];
      for (var i = 0; i < 6; i++) {
        var current_color = [0, 0, 0];
        for (var j = 0; j < 3; j++) {
          current_color[j] = colors[id + 1][j] + iter * basis_vectors[i][j];
        }
        new_colors[i + 1] = normalize(current_color);
      }
      console.log(new_colors[0]);
      setColors(new_colors);
      setIter((a) => (a <= 1 ? 0 : a / 2));
    }
  }

  var buttons = [0, 1, 2, 3, 4, 5];
  var button_display = buttons.map((x) => (
    <ColorButton key={x}
      id={x}
      format_color={format_color}
      handleClick={handleClick}
      colors={colors}
    />
  ));

  function reset() {
    setIter(128);
    setColors(init_colors);
    console.log("Reset");
  }

  return (
    <>
      <button onClick={reset}>Reset</button>
      <div
        className={ColorPicker.grid}
        style={{ "background-color": format_color(colors[0]) }}
      >
        {button_display}
      </div>
      <p className={General.medium_text}>
        Current color: {format_color(colors[0])}
      </p>
      {/* <p className={General.medium_text}> Based loosely on the oppositional color model: <Link href = "">Wikipedia</Link></p> */}
    </>
  );
}

function ColorButton({ id, format_color, handleClick, colors }) { //single color button tile
  var formatted_color = format_color(colors[id + 1]);
  var brightness = colors[id + 1].reduce((a, b) => a + b); //sum of colors
  return (
    <button
      key={id}
      style={{
        "background-color": formatted_color,
      }}
      className={ColorPicker.tile}
      onClick={() => handleClick(id)}
    >
      <p
        className={General.medium_text}
        style={{
          color: brightness > 384 ? "black" : "white",
        }}
      >
        {formatted_color}
      </p>
    </button>
  ); //maybe add text here showing hex value, change text color depending on background color);
}
