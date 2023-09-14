const classNames = require("classnames");

import Image from "next/image";
import Styles from "@/styles/ContentGrid.module.css";
import General from "@/styles/General.module.css";
import Link from "next/link";
import Date from "../components/date";

export default function ContentBox({ title, desc, dest, date }) {
  //box that previews article or project
  var box_style = classNames(Styles.box, General.border_style);
  var title_style = classNames(General.medium_text, Styles.title);
  var desc_style = classNames(General.small_text, Styles.desc)

  return (
    <Link href={dest}>
      <div className={box_style}>
        <div className={Styles.text}>
          <h3 className={title_style}>{title}</h3>

          <h4 className={desc_style}>{desc}</h4>
          <p className={General.small_text}>
            <Date dateString={date} />
          </p>
        </div>
      </div>
    </Link>
  );
}

/*
<>
            <Link className={classnames} href={dest}>
                <Image src={image} alt="error" className={Styles.img} />
                <div className={Styles.hover_text}>
                    <div className={General.heading}>{title}</div>
                    <div className={General.heading}>{desc}</div>
                </div>
            </Link>
        </>

<div>
    <div>
        <a href="">
            <img />
        </a>
    </div>
    <div class="portfolio-item-details text-left">
        <h3 class="portfolio-item-headline title">
            Flight Local (B2B Travel Solution)
        </h3>
        <div class="category-holder">
            <span class="category"><a href="">Web Development</a></span>
        </div>
        <div class="show-project">
            <div class="show-project-link">
                <a href=""> Show project </a>
            </div>
        </div>
    </div>
</div>

*/
