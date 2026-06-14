import data from "../../collections/artist_data.json"
let sorted_data = data.sort((a, b) => a.popularity < b.popularity);
//sorted by popularity in descending order

function drawCircle(ctx, x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        const root = document.documentElement;
        ctx.fillStyle = color;
        ctx.fill();
}

const x_threshold = 0.15
const y_threshold = .025

export default function updateVis(ctx, canvas, transform) {

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.transform(
                transform.zoom,
                0,
                0,
                transform.zoom,
                transform.x,
                transform.y,
        )



        const left = -transform.x / transform.zoom - 1
        const top = -transform.y / transform.zoom - 1
        const right = (2000 - transform.x) / transform.zoom + 1
        const bottom = (1000 - transform.y) / transform.zoom + 1



        sorted_data.map((artist) => {
                const x_coord = 100 * artist.x + 600
                const y_coord = 100 * artist.y + 300
                const radius = .75 * Math.sqrt(artist.popularity) / Math.pow(transform.zoom, .6)

                if (x_coord < left || x_coord > right || y_coord < top || y_coord > bottom) {
                        return
                }

                drawCircle(ctx, x_coord, y_coord, radius, "#69696920")


        });

        //I need to do go through the artists twice so that the circles dont cover the labels
        let labeled_artists = []
        sorted_data.map((artist) => {
                const x_coord = 100 * artist.x + 600
                const y_coord = 100 * artist.y + 300
                const size = 6 * Math.pow(artist.popularity / transform.zoom + 2, .2) / Math.pow(transform.zoom, .7)
                const threshold = size / Math.pow(transform.zoom, .25)


                if (x_coord < left || x_coord > right || y_coord < top || y_coord > bottom) {
                        return
                }





                let overlap = false

                for (const labeled_artist of labeled_artists) {
                        const x_distance = Math.abs(artist.x - labeled_artist.x)
                        const y_distance = Math.abs(artist.y - labeled_artist.y)
                        if (x_distance < x_threshold * threshold && y_distance < y_threshold * threshold) {
                                overlap = true
                                break
                        }

                }

                if (!overlap) {
                        ctx.fillStyle = "#000000ff";
                        ctx.font = size + "px serif";
                        ctx.fillText(artist.artist, x_coord, y_coord)
                        labeled_artists.push(artist)
                }
        });



        const search = document.querySelector('#search-bar')
        const suggestions = document.querySelector('#search-suggestions')


        search.addEventListener(
                "input",
                (event) => {
                        const query = event.target.value.toLowerCase();
                        while (suggestions.lastElementChild) {
                                suggestions.removeChild(suggestions.lastElementChild);
                        }

                        let suggested_artists = []

                        for (const artist of sorted_data) {
                                const artist_name = artist.artist.toLowerCase()
                                if (artist_name.includes(query)) {
                                        suggested_artists.push(artist.artist)
                                        if (suggested_artists.length == 5) {
                                                break;
                                        }
                                }

                        }


                        for (const suggestion of suggested_artists) {
                                const suggestion_tag = document.createElement("option")
                                suggestion_tag.setAttribute("value", suggestion)
                                suggestions.appendChild(suggestion_tag)
                        }
                },

        );

//left -x / z
//top -y / z
//right (2000 - x) / z
//bottom (1000 - y) / z

}
