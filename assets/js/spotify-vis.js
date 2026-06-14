import updateVis from "./update-spotify-vis.js"
import data from "../../collections/artist_data.json"
let sorted_data = data.sort((a, b) => a.popularity < b.popularity);

export default function createVis() {
        let canvas = document.getElementById("spotify-canvas");
        if (canvas == null) {
                return;
        }
        let ctx = canvas.getContext('2d');

        let transform = { x: 440, y: 224, zoom: 72 }

        const MIN_ZOOM = .8;

        const MAX_ZOOM = 100;

        // const MIN_X = -222400
        // const MAX_X = -9400
        // const MIN_Y = -68000
        // const MAX_Y = 300

        // Object { x: -4888.101146055941, y: -14830.411183743961, zoom: 15.490802233011848 }
        //Object { x: -92610.05706844841, y: 258.7759369478374, zoom: 101.57604483928662 }
        //Object { x: -1247142.405891415, y: -379265.441151771, zoom: 816.7466642802924 }

        let rect = canvas.getBoundingClientRect()
        canvas.height = rect.height
        canvas.width = rect.width
        // console.log(rect.width, rect.height)

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        canvas.addEventListener('resize', (e) => {
                rect = canvas.getBoundingClientRect()
                canvas.height = rect.height
                canvas.width = rect.width
        });

        //adapted from https://harrisonmilbradt.com/blog/canvas-panning-and-zooming

        updateVis(ctx, canvas, transform)

        let previousX = 0,
                previousY = 0

        function getPosXY(x, y) {
                return [(x - rect.left), (y - rect.top)]
        }

        const getPos = (e) => {
                return getPosXY(e.clientX, e.clientY)
        }

        const updatePanning = (e) => {
                const [currentX, currentY] = getPos(e);

                transform.x += currentX - previousX
                transform.y += currentY - previousY
                //
                // if (transform.x > MAX_X || transform.x < MIN_X || transform.y > MAX_Y || transform.y < MIN_Y) {
                //         transform.x -= currentX - previousX
                //         transform.y -= currentY - previousY
                //         console.log(transform.x, transform.y)
                //         return;
                // }


                previousX = currentX
                previousY = currentY
                // console.log(transform.x / transform.zoom, transform.y / transform.zoom)

        }

        const updateZooming = (e) => {
                const oldX = transform.x
                const oldY = transform.y

                const [localX, localY] = getPos(e);

                const previousScale = transform.zoom

                const newScale = (transform.zoom += e.deltaY * (-0.0004 * transform.zoom))

                const newX = localX - (localX - oldX) * (newScale / previousScale)
                const newY = localY - (localY - oldY) * (newScale / previousScale)




                transform.x += (newX - oldX)
                transform.y += (newY - oldY)
                transform.zoom = newScale



                // if (transform.zoom <= MIN_ZOOM || transform.zoom >= MAX_ZOOM || transform.x > MAX_X || transform.x < MIN_X || transform.y > MAX_Y || transform.y < MIN_Y) {
                //         transform.zoom = previousScale
                //         transform.x = oldX
                //         transform.y = oldY
                //         console.log(transform.x, transform.y)
                // }

        }

        const onMouseMove = (e) => {
                updateVis(ctx, canvas, transform)
                updatePanning(e)

        }

        canvas.addEventListener('mousedown', (e) => {
                const pos = getPos(e)
                previousX = pos[0]
                previousY = pos[1]

                canvas.addEventListener('mousemove', onMouseMove)
        })

        canvas.addEventListener('mouseup', (e) => {
                canvas.removeEventListener('mousemove', onMouseMove)
        })

        const onMouseWheel = (e) => {
                updateZooming(e)

                updateVis(ctx, canvas, transform)

        }

        canvas.addEventListener('wheel', onMouseWheel)



        const search = document.querySelector('#search-bar')
        const suggestions = document.querySelector('#search-suggestions')


        search.addEventListener(
                "input",
                (event) => handleSearch(event, search, suggestions),

        );

        search.addEventListener('keydown', (event) => {
                // Check if the pressed key is "Enter"
                if (event.key === 'Enter') {
                        event.preventDefault(); // Optional: Prevent default behavior (e.g., form submission)
                        const new_transform = zoomToArtist(event.target.value.toLowerCase())
                        if (new_transform != null) {
                                transform = new_transform
                                updateVis(ctx, canvas, transform)
                                console.log(transform)
                        }
                }
        });

        function handleSearch(event, search, suggestions) {
                const query = event.target.value.toLowerCase();
                while (suggestions.lastElementChild) {
                        suggestions.removeChild(suggestions.lastElementChild);
                }

                let suggested_artists = []

                for (const artist of sorted_data) {
                        const artist_name = artist.artist.toLowerCase()
                        if (!artist_name.includes(query)) {
                                continue;
                        }

                        suggested_artists.push(artist)
                        if (suggested_artists.length == 5) {
                                break;
                        }

                }


                for (const suggestion of suggested_artists) {
                        const suggestion_tag = document.createElement("option")
                        suggestion_tag.setAttribute("value", suggestion.artist)
                        suggestions.appendChild(suggestion_tag)
                }



        }

        function zoomToArtist(artist_name) {
                const selected_artist = sorted_data.find((artist) => artist.artist.toLowerCase() === artist_name)

                if (selected_artist == null) {
                        return null
                }

                const zoom_level = 5000

                const x_coord = selected_artist.x * zoom_level - rect.width / 2
                const y_coord = selected_artist.y * zoom_level - rect.height / 2

                const target_transform = { x: -x_coord, y: -y_coord, zoom: zoom_level }
                console.log(target_transform)

                return target_transform
        }



}

