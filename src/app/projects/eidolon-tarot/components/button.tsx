import "../eidolon_tarot.css";

export default function Button({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <button onClick={onClick} className="button">
      <h5 className="h5">{text}</h5>
    </button>
  );
}
