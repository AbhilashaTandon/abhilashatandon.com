// Add your javascript here

// https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript


const darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

let darkMode = true;

const button = document.querySelector("#darkModeToggle");
const darkIcon = document.querySelector("#darkModeToggleIcon");
const lightIcon = document.querySelector("#lightModeToggleIcon");

function updateMode() {
  let navbar = document.querySelector("nav");
  let content = document.querySelector("main");
  if (darkMode) {
    navbar.classList.add("dark_mode");
    content.classList.add("dark_mode");
    navbar.classList.remove("light_mode");
    content.classList.remove("light_mode");
    lightIcon.classList.remove("hidden"); //we want to show light icon in dark mode to tell user what we're switching to
    darkIcon.classList.add("hidden");
  }
  else {
    navbar.classList.add("light_mode");
    content.classList.add("light_mode");
    navbar.classList.remove("dark_mode");
    content.classList.remove("dark_mode");
    darkIcon.classList.remove("hidden");
    lightIcon.classList.add("hidden");
  }

  window.darkMode = darkMode;
}

updateMode();

button.addEventListener("click", () => {
  darkMode = !darkMode;
  updateMode();
});
