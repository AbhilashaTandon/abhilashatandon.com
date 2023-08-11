import "@/styles/globals.css";
import Logo from "../components/logo.js"
import Navbar from "../components/navbar.js"

export default function App({ Component, pageProps }) {
  return (
  <>
  <Navbar/>
  <Component {...pageProps} />
  </>
  );
}
