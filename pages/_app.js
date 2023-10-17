import "@/styles/globals.css";
import Logo from "../components/logo.js";
import Navbar from "../components/navbar.js";

export default function App({ Component, pageProps }) {
  return (
    <>
      <meta charSet="UTF-8"></meta>
      <meta
        name="description"
        content="A Passionate Developer with Versatile Skills"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
