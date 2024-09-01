"use client";

import { DndContext } from "@dnd-kit/core";
import { act, useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";

import Slot from "./components/slot";
import Section from "./components/section";
import Button from "./components/button";
import {
  undo,
  redo,
  take_action,
  reset,
  shuffle,
  card_state,
  initial_state_history,
} from "./state_management";

import "./eidolon_tarot.css";

export default function App() {
  const [history, setHistory] = useState(initial_state_history); //state of where cards are and what order the stacks are in

  function handleUndo() {
    setHistory((hist) => undo(hist));
  }

  function shuffleFate() {
    setHistory((hist) => shuffle(hist));

    setFateVisible(false);
    setDiscardVisible(false);
  }

  function handleRedo() {
    setHistory((hist) => redo(hist));
  }

  function handleReset() {
    setHistory((hist) => reset(hist));
  }

  function handleDragEnd(event: DragEndEvent) {
    let { active, over } = event;

    if (over === null) {
      return;
    }

    const dest: keyof card_state = over.id as keyof typeof history.present;
    //destination as key of card_state object

    let card_id: number = active.id as number;

    let new_state: card_state = structuredClone(history.present);
    //how to deep copy this

    Object.keys(history.present).forEach(function (key, index) {
      const card_state_key: keyof card_state = key as keyof card_state;
      new_state[card_state_key] = history.present[card_state_key].filter(
        (a) => a !== card_id
      );
    });

    if (over.id === "fate" && !fateReturnBottom) {
      //only scenario where cards are returned to top

      new_state[dest].unshift(card_id);
    } else {
      //cards returned to bottom as normal
      new_state[dest].push(card_id);
    }

    setHistory((hist) => take_action(hist, new_state));
  }

  const [fateVisible, setFateVisible] = useState(false); //whether the cards in the fate deck are shown

  function handleToggleFateVisibility() {
    setFateVisible((x) => !x);
  }

  const [discardVisible, setDiscardVisible] = useState(false); //whether the cards in the discard pile are shown

  function handleToggleDiscardVisibility() {
    setDiscardVisible((x) => !x);
  }

  const [fateReturnBottom, setFateReturnBottom] = useState(true); //whether cards are returned to the bottom of the fate deck or not (the top)

  function handleToggleFateReturnBottom() {
    setFateReturnBottom((x) => !x);
  }

  const [fateDrawBottom, setFateDrawBottom] = useState(true); //whether cards are drawn from the bottom of the fate deck or not (the top)

  const slot_items = Object.keys(history.present).map((slot_id) => {
    //each section of the app, fate deck, discard pile, spread, and aside
    let card_stack = history.present[slot_id as keyof card_state];
    let visibility = false;
    if (slot_id === "aside" || slot_id === "spread") {
      visibility = true;
    }
    if (slot_id === "fate" && fateVisible) {
      visibility = true;
    }
    if (slot_id === "discard" && discardVisible) {
      visibility = true;
    }
    //whether cards are spread out in a grid or shown as a deck
    return (
      <Slot key={slot_id} name={slot_id} id={slot_id}>
        <Section stack={card_stack} visible={visibility} />
      </Slot>
    );
  });

  let ui = //has all buttons
    (
      <h5 className="ui h5">
        <Button onClick={shuffleFate} text="Shuffle Discard into Fate" />
        <Button
          onClick={handleToggleFateVisibility}
          text={fateVisible ? "Hide Fate" : "Show Fate"}
        />
        <Button
          onClick={handleToggleDiscardVisibility}
          text={discardVisible ? "Hide Discard" : "Show Discard"}
        />
        <Button
          onClick={handleToggleFateReturnBottom}
          text={
            fateReturnBottom
              ? "Return To Bottom of Fate"
              : "Return To Top of Fate"
          }
        />
        <Button onClick={handleUndo} text={"Undo"} />
        <Button onClick={handleRedo} text={"Redo"} />
        <Button onClick={handleReset} text={"Reset"} />
      </h5>
    );

  return (
    <center className="eidolon_tarot">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="table">{slot_items}</div>
      </DndContext>
      {ui}
    </center>
  );
}
