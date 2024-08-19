import "../eidolon_tarot.css";

export default function Button({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <button onClick={onClick}>
      <p>{text}</p>
    </button>
  );
}
