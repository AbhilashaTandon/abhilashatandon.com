// https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript

export default function toggleMobileNav() {

        let mobileNavOpen = false;


        const button = document.querySelector("#hamburger");
        const mobileNav = document.querySelector("#mobileNav");



        button.addEventListener("click", () => {
                if (mobileNavOpen) {
                        mobileNav.classList.add("expandable")
                        mobileNav.classList.remove("expanded");
                }
                else {
                        mobileNav.classList.remove("expandable")
                        mobileNav.classList.add("expanded");
                }
                mobileNavOpen = !mobileNavOpen;
        });
}
