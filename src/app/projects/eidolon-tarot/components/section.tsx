import Card from "./card";

export default function Section({
  stack,
  visible,
}: {
  stack: number[];
  visible: boolean;
}) {
  let top_of_stack: number = stack[0];

  if (stack.length == 0) {
    return <></>;
  } else if (visible) {
    let card_spread = stack.map((id) => (
      <Card key={id} card_type={id} visible={true}></Card>
    ));

    let style = {
      gridTemplateRows: "repeat(" + Math.floor(stack.length / 6) + ",1fr)",
    };
    //makes number of rows in grid whatever is necessary
    //ie with 6 items 1 row, with 12 2 rows, etc

    return (
      <div className="layout" style={style}>
        {card_spread}
      </div>
    );
  } else {
    return <Card card_type={top_of_stack} visible={false}></Card>;
  }
}
