const classNames = require("classnames");

import Image from "next/image";
import Styles from "@/styles/ContentGrid.module.css";
import General from "@/styles/General.module.css";
import Link from "next/link";

export default function ContentBox({ image, title, desc, dest }) {
    var classnames = classNames(Styles.box, General.border_style);
    //box that previews article or project
    return (
        <>
            <Link className={classnames} href={dest}>
                <Image src={image} alt="error" className={Styles.img} />
                <div className={Styles.hover_text}>
                    <div className={General.heading}>{title}</div>
                    <div className={General.heading}>{desc}</div>
                </div>
            </Link>
        </>
    );
}
