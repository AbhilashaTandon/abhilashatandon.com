
function renderText(cursor, text, textbox) {
        cursor.classList.add("w-max");
        cursor.classList.add("text-4xl");
        const char_elem = document.createTextNode("⏐");
        cursor.appendChild(char_elem);
        textbox.appendChild(cursor)

        for (let i = 0; i < text.length; i++) {
                const child = document.createElement("h5");
                // child.classList.add("w-max");
                child.classList.add("text-[2rem]");
                child.classList.add("font-medium");
                child.classList.add("text-(--gray)");

                let char = text[i];
                if (char === " ") {
                        char = ' ';
                        child.classList.add("w-[0.5rem]")
                }

                const char_elem = document.createTextNode(char);
                child.appendChild(char_elem);
                textbox.appendChild(child);
        }
}

let root = document.getElementById("Keylie");


export default function keylie() {

        function reset() {
                cursor_pos = 0;
                textbox.insertBefore(cursor, textbox.children[0]);
                for (let char_idx = 1; char_idx < textbox.children.length; char_idx++) {
                        const current_char_elem = textbox.children[char_idx]
                        current_char_elem.classList.remove("text-(--accent)")
                        current_char_elem.classList.remove("text-red-500")
                        current_char_elem.classList.add("text-(--gray)")
                }
        }

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
                        reset();
                        // current_char_elem.classList.add("text-red-500")
                }
                else {
                        current_char_elem.classList.add("text-(--accent)")
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
                current_char_elem.classList.remove("text-(--accent)")
                current_char_elem.classList.remove("text-red-500")
                current_char_elem.classList.add("text-(--gray)")

        }

        if (root == null) {
                console.log("Root element not found.");
                return;
        }

        let textbox = document.getElementById("text");
        let timer_elem = document.getElementById("timer");

        const text = "The quick brown fox jumps over the lazy dog.";
        const desired_speed = 10; //wpm
        const time_for_text = text.length / 5 / desired_speed * 60;

        const cursor = document.createElement("h5");
        renderText(cursor, text, textbox)

        let cursor_pos = 0;
        reset();

        addEventListener("keypress", onKeypress);
        addEventListener("keydown", onKeydown);

        let timer = time_for_text;

        function decrementTimer() {
                timer_elem.innerText = Math.round(timer);
                timer -= 1;
        }

        setTimeout(decrementTimer(), 1)
}
