import General from "@/styles/General.module.css";
import { useState } from "react";
import ColorPicker from "@/styles/ColorPicker.module.css";

export default function Main() {
  return (
    <>
      <h3 className={General.medium_text}>
        Ever wanted to choose a color for a project but struggled to find the
        right one with a color picker?
      </h3>
      <p className={General.medium_text}>Select a color below!</p>
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

function ColorGrid() {
  const [iter, setIter] = useState(128);
  const [colors, setColors] = useState(init_colors);

  function handleClick(id) {
    
    var new_colors = init_colors;
    new_colors[0] = colors[id+1];
    for (var i = 0; i < 6; i++) {
      var current_color = [0,0,0];
      for (var j = 0; j < 3; j++){
          current_color[j] = colors[id+1][j] + iter * basis_vectors[i][j];
      }
      new_colors[i+1] = normalize(current_color);
    }
    console.log(new_colors[0]);
    setIter(a => (a == 1) ? 1: a/2);
    setColors(new_colors);
  }

  var buttons = [0, 1, 2, 3, 4, 5];
  var button_display = buttons.map((x) => (
    <button key={x}
      style={{ "background-color": "rgb(" + colors[x + 1].join(",") + ")" }}
      className={ColorPicker.tile}
      onClick={() => handleClick(x)}
    /> //maybe add text here showing hex value, change text color depending on background color
  ));
  return (
    <>
    <div
      className={ColorPicker.grid}
      style={{ "background-color": "rgb(" + colors[0].join(",") + ")" }}
    >
      {button_display}
      
    </div>
    <p className={General.medium_text}>Current color: {'rgb(' + colors[0].join(', ') + ')'}</p>
    </>
  );
}


