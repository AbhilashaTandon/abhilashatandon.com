import Styles from "../styles/skills.module.css";
import Image, { StaticImageData } from "next/legacy/image";
import SWE from "../../public/software-dev.png";
import Web from "../../public/web-dev.png";
import ML from "../../public/ml.png";
import React from "react";
import Text from "@/styles/text.module.css";

function SkillTile({
  title,
  body,
  symbol,
}: {
  title: string;
  body: string;
  symbol: StaticImageData;
}) {
  return (
    <div className={Styles.tile}>
      <Image
        src={symbol}
        alt="error"
        width={75}
        height={75}
        className={Styles.image}
      />
      <h3 className={Styles.title}>{title}</h3>
      <h4>{body}</h4>
    </div>
  );
}

export default function Skills() {
  return (
    <div id="skills" className={Styles.skills}>
      <h3 className={Text.section_header}>My Skills</h3>
      <div className={Styles.tiles}>
        <SkillTile
          title="Software Development "
          body="Seasoned in the software development lifecycle, I excel in writing  clean, maintainable code using Java, Python, and C++. I also am familiar with C#."
          symbol={SWE}
        />
        <SkillTile
          title="Web Development"
          body="I create visually appealing, functional websites, focusing on elegant and simple design using Javascript, HTML, CSS, React.js, and Next.js"
          symbol={Web}
        />
        <SkillTile
          title="Machine Learning"
          body="I innovate AI models for, natural language  processing, predictive models, and computer vision, with experience in PyTorch and Tensorflow."
          symbol={ML}
        />
      </div>
    </div>
  );
}
