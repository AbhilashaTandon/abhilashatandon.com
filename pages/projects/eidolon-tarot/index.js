/*
---
title: "Eidolon 2.0 Tarot Simulator"
desc: 'A little webtool for simulating deck mechanics in Eidolon: Become Your Best Self 2.0'
date: '2023-09-13'
---
*/

import Style from "@/styles/EidolonTarot.module.css";

import { useState, useEffect } from "react";

const card_names = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Justice",
  "The Hermit",
  "The Wheel of Fortune",
  "Strength",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgment",
  "The World",
];

const polarities = [
  "Neutral",
  "Positive",
  "Neutral",
  "Neutral",
  "Neutral",
  "Neutral",
  "Neutral",
  "Neutral",
  "Neutral",
  "Neutral",
  "Neutral",
  "Positive",
  "Negative",
  "Neutral",
  "Neutral",
  "Negative",
  "Negative",
  "Positive",
  "Negative",
  "Positive",
  "Negative",
  "Positive",
];

const forecasts = [
  "You become who you are needed to be in this moment.",
  "You achieve the impossible.",
  "The supernatural acts through you.",
  "You create something.",
  "You break something.",
  "You discover something.",
  "You are faced with two paths.",
  "You exceed your own limits.",
  "The situation becomes more fair.",
  "Your actions isolate you.",
  "You are at the mercy of the fates.",
  "You triumph through force.",
  "You must make an impossible choice.",
  "Something ends, and something else begins.",
  "You are met with an equal and opposite reaction.",
  "You get what you want at a price you can’t afford.",
  "Something terrible happens.",
  "A new direction reveals itself.",
  "Something unknown or unknowable interferes.",
  "You are given cause to celebrate.",
  "Your past failures catch up to you.",
  "For a single moment, the world bends to your will.",
];

const init = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
];

export default function Main() {
  const [fateDeck, setFateDeck] = useState(init);
  const [discard, setDiscard] = useState([]);
  const [spread, setSpread] = useState([]);

  //end of list is top of stack

  function shuffleFate() {
    setFateDeck(shuffle(fateDeck.slice()));
  }

  function shuffle(list) {
    let currentIndex = list.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [list[currentIndex], list[randomIndex]] = [
        list[randomIndex],
        list[currentIndex],
      ];
    }

    return list.slice();
  }

  function draw(num_cards, from_top) {
    var new_fate = fateDeck.slice();
    var new_spread = spread.slice();
    var new_discard = discard.slice();
    if (from_top) {
      for (var i = 0; i < num_cards; i++) {
        if (new_fate.length == 0) {
          //if we ran out of cards then reshuffle and draw more
          new_fate = shuffle(new_discard.slice());
          new_discard = [];
        }
        new_spread.push(new_fate.pop());
      }
    } else {
      var item = new_fate[0];
      new_spread.push(item);
      new_fate.splice(0, 1);
    }
    setFateDeck(new_fate);
    setSpread(new_spread);
  }

  function select(id) {
    var new_fate = fateDeck.slice();
    var new_discard = discard.slice();
    var idx = spread.findIndex((x) => id == x);
    if (idx != -1) {
      new_discard.push(id);
      spread.splice(idx, 1);
      for (var i = 0; i < spread.length; i++) {
        new_fate.splice(0, 0, spread[i]);
      }
    }
    setFateDeck(new_fate);
    setSpread([]);
    setDiscard(new_discard);
  }

  function Card({ id, notes }) {
    var polarity = polarities[id];
    var color;
    if (polarity == "Positive") {
      color = "#00E07B"; //green
    } else if (polarity == "Negative") {
      color = "#F46773"; //red
    } else {
      color = "#EBD233"; //yellow
    }
    return (
      <button
        className={Style.card}
        style={{
          backgroundColor: color, //inline css is the only way
        }}
        onClick={() => select(id)}>
        <b>
          <small className={Style.text}>{card_names[id]}</small>
        </b>
        <small className={Style.text}>{forecasts[id]}</small>
        <small className={Style.text}>{notes}</small>
      </button>
    );
  }

  function Spread({ cards }) {
    return (
      <div className={Style.spread}>
        {cards.map((id) => (
          <Card key={id} id={id} notes={""} />
        ))}
      </div>
    );
  }

  console.log(fateDeck);
  console.log(discard);

  return (
    <>
      <h4>
        A simple card manager for the TTRPG Eidolon: Become Your Best Self 2.0
      </h4>
      <Spread cards={spread} />
      <button onClick={shuffleFate}>Shuffle</button>
      <button onClick={() => draw(3, true)}>Draw From Top</button>
      <button onClick={() => draw(3, false)}>Draw From Bottom</button>
    </>
  );
}
