const classNames = require('classnames');

import Image from "next/image";
import Styles from "@/styles/ContentGrid.module.css";
import General from "@/styles/General.module.css"

export default function ContentBox({ image, title, desc, link }) {
  
  var classnames = classNames(Styles.box, General.border_style);
  //box that previews article or project
  return (
    <div className={classnames}>
      <Image src={image} alt="error" className={Styles.img}/>
      <div className={General.heading}>{title}</div>
      <div className={General.body}>{desc}</div>
    </div>
  );
}
