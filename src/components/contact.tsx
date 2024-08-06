import Link from "next/link";
import Styles from "../styles/contact.module.css";
import Text from "../styles/text.module.css";

function Attrib({
  link,
  title,
  text,
  new_line,
}: {
  link: string;
  title: string;
  text: string;
  new_line: boolean;
}) {
  if (new_line) {
    return (
      <Link
        className={Styles.link}
        href={link}
        title={title}
        aria-label={title}
      >
        <h4>
          <u>{text}</u>
        </h4>
      </Link>
    );
  } else {
    return (
      <Link
        href={link}
        title={title}
        aria-label={title}
        className={Styles.link}
      >
        <u>{text}</u>
      </Link>
    );
  }
}

export default function Contact() {
  return (
    <div className={Styles.contact} id="contact">
      <div className={Text.section_header}>Contact</div>
      <div className={Styles.icons}>
        <Link
          href="https://github.com/AbhilashaTandon"
          aria-label="My Github Account"
        >
          <svg height="40" viewBox="0 0 16 16" width="40">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </Link>

        <Link
          href="https://www.linkedin.com/in/abhilasha-tandon-4ba104207/"
          aria-label="My LinkedIn Account"
        >
          <svg viewBox="0 0 24 24" width="40" height="40">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
        </Link>

        <Link href="" aria-label="My Instagram Account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="40"
            height="40"
          >
            <path d="M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z" />
            <path d="M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z" />
            <circle cx="390.476" cy="121.524" r="30.23" />
          </svg>
        </Link>
      </div>

      <div className={Styles.attrib}>
        <h3 className={Styles.email}>abhilashatandon167@gmail.com</h3>

        <Attrib
          link="https://www.flaticon.com/free-icons/software-development"
          title="See Attribution for Software Development Icon"
          text="Software development icon created by Witdhawaty - Flaticon"
          new_line={true}
        ></Attrib>
        <Attrib
          link="https://www.flaticon.com/free-icons/data"
          title="See Attribution for Web Development Icon"
          text="Web Development icon created by Freepik - Flaticon"
          new_line={true}
        ></Attrib>

        <Attrib
          link="https://www.flaticon.com/free-icons/neural-network"
          title="See Attribution for Machine Learning Icon"
          text="Neural network icon created by Freepik - Flaticon"
          new_line={true}
        ></Attrib>

        <h4>
          Instagram Logo By{" "}
          <Attrib
            link="https://en.wikipedia.org/wiki/Instagram"
            title="Instagram Icon"
            text="Instagram"
            new_line={false}
          />{" "}
          / Ian Spalter, Joy-Vincent Niemantsverdriet, Eric Goud, Robert Padbury
          -{" "}
          <Attrib
            link="//instagram-brand.com"
            title="Instagram Brand Specifications"
            text="instagram-brand.com"
            new_line={false}
          />
          , Public Domain,{" "}
          <Attrib
            link="https://commons.wikimedia.org/w/index.php?curid=48707756"
            title="Wikimedia Source"
            text="Link"
            new_line={false}
          />
        </h4>
      </div>
    </div>
  );
}
