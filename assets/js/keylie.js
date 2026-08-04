function loadSample() {
        fetch('https://www.gutenberg.org/cache/epub/345/pg345.txt')
                .then(response => response.text())
                .then((data) => {
                        console.log(data)
                })
}


export default function keylie() {
        loadSample();
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
                child.classList.add("font-medium");
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

        function onKeypress(event) {
                console.log(event)
                if (cursor_pos >= text.length) {
                        return;
                }
                cursor_pos++;

                //move cursor one spot forward
                textbox.insertBefore(cursor, textbox.children[cursor_pos + 1]);

                //recolor character depending on whether we got it right
                const current_char_elem = textbox.children[cursor_pos - 1]
                if (current_char_elem === cursor) {
                        return;
                }

                current_char_elem.classList.remove("text-(--gray)")

                const current_char = text[cursor_pos - 1];
                if (current_char != event.key) {
                        current_char_elem.classList.add("text-red-500")
                }
                else {
                        current_char_elem.classList.add("text-(--text)")
                }
        }

        function onKeydown(event) {
                textbox.focus();

                if (event.key !== "Backspace") {
                        return;
                }

                if (cursor_pos <= 0) {
                        return;
                }

                cursor_pos--;

                textbox.insertBefore(cursor, textbox.children[cursor_pos]);

                const current_char_elem = textbox.children[cursor_pos + 1]
                current_char_elem.classList.remove("text-(--text)")
                current_char_elem.classList.remove("text-red-500")
                current_char_elem.classList.add("text-(--gray)")

        }

        addEventListener("keypress", onKeypress);
        addEventListener("keydown", onKeydown);
}
