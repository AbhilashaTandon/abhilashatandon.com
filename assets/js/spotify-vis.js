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

        //adapted from https://harrisonmilbradt.com/blog/canvas-panning-and-zooming

        updateVis(ctx, canvas, transform)

        let previousX = 0,
                previousY = 0

        const updatePanning = (e) => {
                const currentX = e.clientX
                const currentY = e.clientY

                transform.x += currentX - previousX
                transform.y += currentY - previousY

                previousX = currentX
                previousY = currentY
        }

        const updateZooming = (e) => {
                const oldX = transform.x
                const oldY = transform.y

                const localX = e.clientX
                const localY = e.clientY

                const previousScale = transform.zoom

                const newScale = (transform.zoom += e.deltaY * (-0.0004 * transform.zoom))

                const newX = localX - (localX - oldX) * (newScale / previousScale)
                const newY = localY - (localY - oldY) * (newScale / previousScale)

                if (newScale <= MIN_ZOOM) {
                        transform.zoom = previousScale
                        return;
                }
                if (newScale >= MAX_ZOOM) {
                        transform.zoom = previousScale
                        return;
                }


                transform.x = newX
                transform.y = newY
                transform.zoom = newScale
        }

        const onMouseMove = (e) => {
                updateVis(ctx, canvas, transform)
                updatePanning(e)

                console.log(e)
        }

        canvas.addEventListener('mousedown', (e) => {
                previousX = e.clientX
                previousY = e.clientY

                canvas.addEventListener('mousemove', onMouseMove)
        })

        canvas.addEventListener('mouseup', (e) => {
                canvas.removeEventListener('mousemove', onMouseMove)
        })



        const onMouseWheel = (e) => {
                updateZooming(e)

                updateVis(ctx, canvas, transform)

                console.log(e)
        }

        canvas.addEventListener('wheel', onMouseWheel)
}

