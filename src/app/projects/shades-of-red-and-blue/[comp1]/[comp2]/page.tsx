export default function Results({
  params,
}: {
  params: { comp1: number; comp2: number };
}) {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <h1>
        {params.comp1} {params.comp2}
      </h1>
    </div>
  );
}
