"use client";

import { DndContext } from "@dnd-kit/core";
import { act, useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";

import Slot from "./components/slot";
import Section from "./components/section";
import Button from "./components/button";

function shuffleArray<T>(arr: Array<T>): Array<T> {
  //i dont know why this isnt built in
  let currentIndex: number = arr.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex: number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr.slice();
}

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  //we could replace this with a filter
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr.slice();
}

type card_state = {
  //keeps track of where cards are in the game. order is important!
  fate: Array<number>;
  discard: Array<number>;
  spread: Array<number>;
  aside: Array<number>;
};

const initial_state: card_state = {
  //start out with every card in the fate deck shuffled
  fate: shuffleArray([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22,
  ]),
  discard: [],
  spread: [],
  aside: [],
};

const blank_state: card_state = {
  //we use this to avoid having undefined values. This state should never actually appear
  fate: [],
  discard: [],
  spread: [],
  aside: [],
};

const undo_stack_initializer: card_state[] = []; //we need this because typescript needs the blank initialization array to have a type

export default function App() {
  const [cardState, setCardState] = useState(initial_state); //state of where cards are and what order the stacks are in

  const [undoStack, setUndoStack] = useState(undo_stack_initializer.slice());
  const [redoStack, setRedoStack] = useState(undo_stack_initializer.slice());

  function handleUndo() {
    if (undoStack.length === 0) {
      //if no actions taken, nothing to undo
      return;
    }

    let last_state: card_state = JSON.parse(
      JSON.stringify(undoStack.at(-1) || cardState)
    ); //last in undo_stack

    if (last_state === cardState) {
      //safety check
      return;
    }

    setUndoStack(undoStack.filter((a) => a !== last_state)); //remove last action from undoStack

    setRedoStack([cardState, ...redoStack]); //and place it at beginning of redo stack

    setCardState(last_state); //set state to previous state
  }

  function handleRedo() {
    if (redoStack.length === 0) {
      //if no undos done, nothing to redo
      return;
    }
    let last_state: card_state = JSON.parse(
      JSON.stringify(redoStack.at(0) || cardState)
    ); //first in redo_stack is action we just undid

    if (last_state === cardState) {
      //safety check
      return;
    }

    setUndoStack([...undoStack, cardState]); //add last event to end of undo stack

    setRedoStack(redoStack.filter((a) => a !== last_state)); //and remove it from beginning of redoStack

    setCardState(last_state); //set state to the redo
  }

  const [fateVisible, setFateVisible] = useState(false); //whether the cards in the fate deck are shown

  function handleToggleFateVisibility() {
    setFateVisible((x) => !x);
  }

  const [discardVisible, setDiscardVisible] = useState(false); //whether the cards in the discard pile are shown

  function handleToggleDiscardVisibility() {
    setDiscardVisible((x) => !x);
  }

  const [fateReturnBottom, setFateReturnBottom] = useState(false); //whether cards are returned to the bottom of the fate deck or not (the top)

  function handleToggleFateReturnBottom() {
    setFateReturnBottom((x) => !x);
  }

  const [fateDrawBottom, setFateDrawBottom] = useState(true); //whether cards are drawn from the bottom of the fate deck or not (the top)

  function shuffle() {
    //puts discard pile back into fate deck and shuffles it

    updateUndoStack();

    setCardState((state) => {
      state["fate"] = state["fate"].concat(state["discard"]).slice(); //add discard pile back to fate deck
      state["discard"] = [];
      state["fate"] = shuffleArray(state["fate"]); //and shuffle
      return JSON.parse(JSON.stringify(state)); //deep copy
    });

    setFateVisible(false);
    setDiscardVisible(false);
  }

  function updateUndoStack() {
    setRedoStack(undo_stack_initializer.slice());
    //once you take an action when having undone something the redo history vanishes

    setUndoStack([...undoStack, cardState]); //add last event to undo stack
  }

  function handleReset() {
    updateUndoStack();
    setCardState(initial_state);
    shuffle();
  }

  function handleDragEnd(event: DragEndEvent) {
    let { active, over } = event;

    if (over === null) {
      return;
    }

    updateUndoStack();

    let newState = JSON.parse(JSON.stringify(cardState)); //initialize to deep copy

    for (const key of Object.keys(newState)) {
      newState[key as keyof typeof newState] = removeItem(
        newState[key as keyof typeof newState],
        active.id //remove card from where it was before
      );
    }

    if (over.id === "fate" && !fateReturnBottom) {
      //only scenario where cards are returned to top

      newState[over.id as keyof typeof newState].unshift(active.id);
    } else {
      //cards returned to bottom as normal
      newState[over.id as keyof typeof newState].push(active.id);
    }

    setCardState(newState);
  }

  const slot_items = Object.keys(cardState).map((slot_id) => {
    //each section of the app, fate deck, discard pile, spread, and aside
    let card_stack = cardState[slot_id as keyof typeof cardState];
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
      <div className="ui">
        <Button onClick={shuffle} text="Shuffle Discard into Fate" />
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
        {/* <Button onClick={handleUndo} text={"Undo"} />
        <Button onClick={handleRedo} text={"Redo"} /> */}
        {/* I will add undo and redo back once I can get them to work */}
        <Button onClick={handleReset} text={"Reset"} />
      </div>
    );

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="table">{slot_items}</div>
      </DndContext>
      {ui}
    </>
  );
}
