const classNames = require("classnames");

import Image from "next/image";
import Styles from "@/styles/ContentGrid.module.css";
import Link from "next/link";
import Date from "../components/date";

export default function ContentBox({ title, desc, dest, date }) {
  //box that previews article or project
  var box_style = classNames(Styles.box, Styles.text);
  var title_style = classNames(Styles.title);
  var desc_style = classNames(Styles.desc);

  return (
    <Link href={dest} className={box_style}>
      <h4 className={title_style}>{title}</h4>
      <h5 className={desc_style}>{desc}</h5>
      <small>
        <Date dateString={date} />
      </small>
    </Link>
  );
}
