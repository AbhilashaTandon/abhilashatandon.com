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

export type card_state = {
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

const state_stack_initializer: card_state[] = []; //we need this because typescript needs the blank initialization array to have a type

type state_history = {
  past: card_state[];
  present: card_state;
  future: card_state[];
};

export const initial_state_history = {
  past: state_stack_initializer,
  present: initial_state,
  future: state_stack_initializer,
};

export function undo(history: state_history): state_history {
  if (history.past.length == 0) {
    return history;
  }

  const last_state = history.past.at(-1) || blank_state;

  if (last_state === blank_state) {
    //this should never happen
    throw new Error("Attempting to undo to blank state");
  }

  return {
    past: history.past.filter((a) => a !== last_state),
    present: last_state,
    future: [history.present, ...history.future],
  };
}

export function redo(history: state_history): state_history {
  if (history.future.length == 0) {
    return history;
  }

  const next_state = history.future.at(0) || blank_state;

  if (next_state === blank_state) {
    //this should never happen
    throw new Error("Attempting to undo to blank state");
  }

  return {
    past: [...history.past, history.present],
    present: next_state,
    future: history.future.filter((a) => a !== next_state),
  };
}

export function take_action(
  // this function should have no side effects, it should be immutable
  //i dont know if it is now
  history: state_history,
  new_state: card_state
): state_history {
  return {
    past: [...history.past, history.present],
    present: new_state,
    future: state_stack_initializer.slice(),
  };
}

export function reset(history: state_history): state_history {
  const new_state = {
    ...initial_state,
    fate: shuffleArray([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22,
    ]), //do this so resetting doesn't give you the same order of cards
  };
  return take_action(history, new_state);
}

export function shuffle(history: state_history): state_history {
  const new_state: card_state = {
    ...history.present,
    fate: shuffleArray(history.present.fate.concat(history.present.discard)),
    discard: [],
  };

  return take_action(history, new_state);
}

//TODO: check this file for best practices: immutability, etc.
