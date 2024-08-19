import React from "react";
import { useDroppable } from "@dnd-kit/core";

import "../eidolon_tarot.css";

export default function Slot({
  name,
  id,
  children,
}: {
  name: string;
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  let slot_header: string;
  switch (name) {
    case "fate":
      slot_header = "Fate Deck";
      break;
    case "discard":
      slot_header = "Discard Pile";
      break;
    case "aside":
      slot_header = "Aside";
      break;
    case "spread":
      slot_header = "Spread";
      break;
    default:
      slot_header = "";
      break;
  }

  return (
    <div className={name} ref={setNodeRef} id={name}>
      <h4>{slot_header}</h4>
      {children}
    </div>
  );
}
