import updateVis from "./update-spotify-vis.js"

export default function createVis() {
        let canvas = document.getElementById("spotify-canvas");
        if (canvas == null) {
                alert("Canvas not found");
                return;
        }
        let ctx = canvas.getContext('2d');

        let transform = { x: 0, y: 0, zoom: 1 }

        const MIN_ZOOM = .8;

        const MAX_ZOOM = 100;

        const MIN_X = -222400
        const MAX_X = -9400
        const MIN_Y = -68000
        const MAX_Y = 300

        // Object { x: -4888.101146055941, y: -14830.411183743961, zoom: 15.490802233011848 }
        //Object { x: -92610.05706844841, y: 258.7759369478374, zoom: 101.57604483928662 }
        //Object { x: -1247142.405891415, y: -379265.441151771, zoom: 816.7466642802924 }

        let rect = canvas.getBoundingClientRect()
        // console.log(rect.width, rect.height)

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        canvas.addEventListener('resize', (e) => {
                rect = canvas.getBoundingClientRect()
        });

        //adapted from https://harrisonmilbradt.com/blog/canvas-panning-and-zooming

        updateVis(ctx, canvas, transform)

        let previousX = 0,
                previousY = 0

        const getPos = (e) => {
                return [((e.clientX - centerX) * 1.40 + centerX + 41) * (1440 / rect.width) - (1440 - rect.width) * .05, ((e.clientY - centerY) * 1.39 + centerY + 66.5) * (721 / rect.height) - (721 - rect.height) * .66]
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
}

