import updateVis from "./update-spotify-vis.js"
import data from "../../collections/artist_data.json"
let sorted_data = data.sort((a, b) => a.popularity < b.popularity);

export default function createVis() {
        let canvas = document.getElementById("spotify-canvas");

        if (canvas == null) {
                return;
        }
        let ctx = canvas.getContext('2d');

        let initial_transform = { x: 440, y: 224, zoom: 72 }


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

        if (window.screen.width < 1024) {
                canvas.height = 1.5 * canvas.width;
                initial_transform = { x: 41, y: 188, zoom: 43 }
        }


        let transform = initial_transform

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        canvas.addEventListener('resize', (e) => {
                rect = canvas.getBoundingClientRect()
                canvas.height = rect.height
                canvas.width = rect.width
        });

        //adapted from https://harrisonmilbradt.com/blog/canvas-panning-and-zooming
        //and partially from https://codepen.io/chengarda/pen/wRxoyB

        let showGenres = false
        let clickStart = { x: undefined, y: undefined }

        updateVis(ctx, canvas, transform, showGenres, clickStart)

        let previousX = 0,
                previousY = 0, previousDist = null



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
                e.preventDefault()
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
                updateVis(ctx, canvas, transform, showGenres, null)
                updatePanning(e)

        }

        const handlePinch = (e) => {
                e.preventDefault();

                let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
                let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }


                const oldX = transform.x
                const oldY = transform.y

                const midpointX = touch1.x * .5 + touch2.x * .5
                const midpointY = touch1.y * .5 + touch2.y * .5

                const distance = (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2

                const [localX, localY] = getPosXY(midpointX, midpointY);

                if (previousDist == null) {
                        previousDist = distance
                        return
                }
                const previousScale = transform.zoom

                const newScale = (transform.zoom += (previousDist / distance) * (-0.0004 * transform.zoom))

                const newX = localX - (localX - oldX) * (newScale / previousScale)
                const newY = localY - (localY - oldY) * (newScale / previousScale)

                transform.x += (newX - oldX)
                transform.y += (newY - oldY)
                transform.zoom = newScale
        }

        const onTouch = (e) => {
                e.preventDefault()
                if (e.touches.length == 1) {
                        const pos = getPos(e)

                        clickStart.x = pos[0]
                        clickStart.y = pos[1]

                        console.log(clickStart, transform)
                        updatePanning(e)
                }
                else if (e.type == "touchmove" && e.touches.length == 2) {
                        handlePinch(e)
                }

        }

        canvas.addEventListener('mousedown', (e) => {
                const pos = getPos(e)
                previousX = pos[0]
                previousY = pos[1]

                clickStart.x = pos[0]
                clickStart.y = pos[1]

                console.log(clickStart, transform)

                updateVis(ctx, canvas, transform, showGenres, clickStart)
                updateVis(ctx, canvas, transform, showGenres, clickStart)

                canvas.addEventListener('mousemove', onMouseMove)
        })

        canvas.addEventListener('mouseup', (e) => {
                canvas.removeEventListener('mousemove', onMouseMove)
        })

        const onMouseWheel = (e) => {
                updateZooming(e)

                updateVis(ctx, canvas, transform, showGenres, null)

        }

        canvas.addEventListener('wheel', onMouseWheel)


        canvas.addEventListener('touchstart', (e) => {
                e.preventDefault()
                const pos = getPos(e)
                previousX = pos[0]
                previousY = pos[1]
                previousDist = null

                canvas.addEventListener('touchmove', onTouch)
        })


        canvas.addEventListener('touchend', (e) => {
                previousDist = null
                e.preventDefault()
                canvas.removeEventListener('touchmove', onTouch)
        })


        // const genreToggleButton = document.querySelector("#toggle-genre")
        //
        // genreToggleButton.addEventListener('change', (event) => { showGenres = this.checked; })

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
                        const new_transform = findArtist(event.target.value.toLowerCase())
                        if (new_transform != null) {
                                zoomToPoint(ctx, canvas, new_transform)
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

        function findArtist(artist_name) {
                const selected_artist = sorted_data.find((artist) => artist.artist.toLowerCase() === artist_name)

                if (selected_artist == null) {
                        return null
                }

                const zoom_level = 5000

                const x_coord = selected_artist.x * zoom_level - rect.width / 2
                const y_coord = selected_artist.y * zoom_level - rect.height / 2

                const target_transform = { x: -x_coord, y: -y_coord, zoom: zoom_level }

                return target_transform
        }


        function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function zoomToPoint(ctx, canvas, new_transform) {
                const steps = 100
                const total_time = 2000

                const original_transform = initial_transform
                updateVis(ctx, canvas, transform, showGenres, clickStart)

                let i = 0

                const interval = setInterval(() => {
                        const mix = Math.pow(i / steps, 2)
                        if (i < steps) {
                                transform.x = original_transform.x * (1 - mix) + new_transform.x * mix
                                transform.y = original_transform.y * (1 - mix) + new_transform.y * mix
                                transform.zoom = original_transform.zoom * (1 - mix) + new_transform.zoom * mix
                                updateVis(ctx, canvas, transform, showGenres, clickStart)
                                i++;
                        } else {
                                clearInterval(interval); // Stop the interval when done
                        }
                }, total_time / steps);

        }



}

