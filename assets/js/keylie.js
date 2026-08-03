export default function keylie() {
        let root = document.getElementById("Keylie");

        if (root == null) {
                console.log("Root element not found.");
                return;
        }

        let textbox = document.getElementById("text");

        const text = "The quick brown fox jumps over the lazy dog.";

        const cursor = document.createElement("h5");
        cursor.classList.add("w-max");
        cursor.classList.add("text-4xl");
        const char_elem = document.createTextNode("⏐");
        cursor.appendChild(char_elem);
        textbox.appendChild(cursor)

        for (let i = 0; i < text.length; i++) {
                const child = document.createElement("h5");
                child.classList.add("w-max");
                child.classList.add("text-4xl");
                child.classList.add("text-(--gray)");
                let char = text[i];
                if (char === " ") {
                        char = '\xa0';

                }
                const char_elem = document.createTextNode(char);
                child.appendChild(char_elem);
                textbox.appendChild(child);
        }


        let cursor_pos = 0;

        root.addEventListener("keypress",)
}
