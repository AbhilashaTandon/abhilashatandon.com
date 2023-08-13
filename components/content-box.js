const classNames = require('classnames');

import Image from "next/image";
import Styles from "@/styles/ContentGrid.module.css";
import General from "@/styles/General.module.css"

export default function ContentBox({ image, title, desc, link }) {
  
  var classnames = classNames(Styles.box, General.border_style);
  //box that previews article or project
  return (
    <div className={classnames}>
      <Image src={image} alt="error" />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
