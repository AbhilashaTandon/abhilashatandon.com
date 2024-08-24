import { useDraggable } from "@dnd-kit/core";

import Fool from "../tarot_cards/fool.jpg";
import Magician from "../tarot_cards/magician.jpg";
import HighPriestess from "../tarot_cards/high_priestess.jpg";
import Empress from "../tarot_cards/empress.jpg";
import Emperor from "../tarot_cards/emperor.jpg";
import Hierophant from "../tarot_cards/hierophant.jpg";
import Lovers from "../tarot_cards/lovers.jpg";
import Chariot from "../tarot_cards/chariot.jpg";
import Strength from "../tarot_cards/strength.jpg";
import Hermit from "../tarot_cards/hermit.jpg";
import WheelOfFortune from "../tarot_cards/wheel_of_fortune.jpg";
import Justice from "../tarot_cards/justice.jpg";
import HangedOne from "../tarot_cards/hanged_man.jpg";
import Death from "../tarot_cards/death.jpg";
import Temperance from "../tarot_cards/temperance.jpg";
import Devil from "../tarot_cards/devil.jpg";
import Tower from "../tarot_cards/tower.jpg";
import Star from "../tarot_cards/star.jpg";
import Moon from "../tarot_cards/moon.jpg";
import Sun from "../tarot_cards/sun.jpg";
import Judgement from "../tarot_cards/judgement.jpg";
import World from "../tarot_cards/world.jpg";

import Back from "../tarot_cards/card_back.jpg";

import "../eidolon_tarot.css";

import Image from "next/image";

const names = [
  "Magician",
  "High Priestess",
  "Empress",
  "Emperor",
  "Hierophant",
  "Lovers",
  "Chariot",
  "Strength",
  "Hermit",
  "Wheel of Fortune",
  "Justice",
  "Hanged One",
  "Death",
  "Temperance",
  "Devil",
  "Tower",
  "Star",
  "Moon",
  "Sun",
  "Judgement",
  "World",
  "Fool",
];

const polarities = [
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
  "Neutral",
];

const forecasts = [
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
  "You become who you are needed to be in this moment.",
];

const images = [
  Magician,
  HighPriestess,
  Empress,
  Emperor,
  Hierophant,
  Lovers,
  Chariot,
  Strength,
  Hermit,
  WheelOfFortune,
  Justice,
  HangedOne,
  Death,
  Temperance,
  Devil,
  Tower,
  Star,
  Moon,
  Sun,
  Judgement,
  World,
  Fool,
];

export default function Card({
  card_type,
  visible,
}: {
  card_type: number;
  visible: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card_type,
  });

  const image = visible ? images[card_type - 1] : Back;
  const name = visible ? names[card_type - 1] : "Hidden";

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // console.log(name, card_type);

  const hover_text = visible
    ? name + ": " + polarities[card_type - 1] + "\n" + forecasts[card_type - 1]
    : "Hidden";

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Image
        className="card"
        id={name}
        src={image}
        alt={name}
        title={hover_text}
      ></Image>
    </div>
  );
}

//idea, make a stack of cards render an image that is just the back face of the card with what look like extra cards at the bottom and right
