import Image from "next/image";
import Avatar from "@/../public/avatar.png";

export default function Hero() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "-4vh" }}>
      <div style={{ textAlign: "left", width: "40vw" }}>
        <h3>Hi There 🙋🏽‍♀️! I’m</h3>
        <h1 style={{ color: "var(--primary-color)", marginLeft: "-.5rem" }}> Abhilasha Tandon</h1>
        {/* i keep this a bit to the left since the text is bigger, it looks like it lines up with the rest of the text even though it doesnt */}
        <h3>I like making things. Designing things. Coding things. Optimizing things.</h3>
        <h5
          style={{
            marginTop: "1rem",
          }}>
          I am passionate about expressing my creativity and desire for efficiency and elegance in software.
        </h5>
      </div>
      <div>
        <Image
          src={Avatar}
          width={345}
          height={345}
          alt="error"
          style={{ borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}
