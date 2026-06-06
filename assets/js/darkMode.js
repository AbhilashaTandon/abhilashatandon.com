
// Add your javascript here

// https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript

export default function toggleDarkMode() {
        const darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

        let darkMode = darkModeMql;

        const icons = [
                {
                        "light": document.querySelector("#lightModeToggleIcon"),
                        "dark": document.querySelector("#darkModeToggleIcon")
                },
                {
                        "light": document.querySelector("#githubLight"),
                        "dark": document.querySelector("#githubDark")
                },
                {
                        "light": document.querySelector("#githubLightMobile"),
                        "dark": document.querySelector("#githubDarkMobile")
                },
                {
                        "light": document.querySelector("#hamburgerLight"),
                        "dark": document.querySelector("#hamburgerDark")
                }
        ];

        const button = document.querySelector("#darkModeToggle");

        function updateMode() {
                let navbar = document.querySelector("nav");
                let content = document.querySelector("main");
                let footer = document.querySelector("footer");
                if (darkMode) {
                        navbar.classList.add("dark_mode");
                        content.classList.add("dark_mode");
                        footer.classList.add("dark_mode");
                        navbar.classList.remove("light_mode");
                        content.classList.remove("light_mode");
                        footer.classList.remove("light_mode");


                        for (const icon of icons) {
                                icon['light'].classList.remove("hidden");
                                icon['dark'].classList.add("hidden");
                        }
                }
                else {
                        navbar.classList.add("light_mode");
                        content.classList.add("light_mode");
                        footer.classList.add("light_mode");
                        navbar.classList.remove("dark_mode");
                        content.classList.remove("dark_mode");
                        footer.classList.remove("dark_mode");


                        for (const icon of icons) {
                                icon['light'].classList.add("hidden");
                                icon['dark'].classList.remove("hidden");
                        }
                }

                window.darkMode = darkMode;
        }

        updateMode();

        button.addEventListener("click", () => {
                darkMode = !darkMode;
                updateMode();
        });
}
