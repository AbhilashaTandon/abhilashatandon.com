const classNames = require("classnames");

import Image from "next/image";
import Styles from "@/styles/ContentGrid.module.css";
import General from "@/styles/General.module.css";
import Link from "next/link";

export default function ContentBox({ image, title, desc, dest }) {
    //box that previews article or project
    var classnames = classNames(Styles.box, General.border_style);
    return (
        <div className={classnames}>
            <div className={Styles.img_container}>
                <Link href={dest}>
                    <Image src={image} alt="error" className={Styles.img}/>
                </Link>
            </div>
            <div className={Styles.desc}>
                <h3 className={General.heading}>{title}</h3>
                <h4 className={General.body}>{desc}</h4>
            </div>
        </div>
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
