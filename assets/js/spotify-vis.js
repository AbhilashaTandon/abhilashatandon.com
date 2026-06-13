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

        let rect = canvas.getBoundingClientRect()
        console.log(rect.width, rect.height)

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

                previousX = currentX
                previousY = currentY
        }

        const updateZooming = (e) => {
                const oldX = transform.x
                const oldY = transform.y

                const [localX, localY] = getPos(e);

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

                transform.x += (newX - oldX)
                transform.y += (newY - oldY)
                transform.zoom = newScale
        }

        const onMouseMove = (e) => {
                updateVis(ctx, canvas, transform)
                updatePanning(e)

                console.log(e)
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

                console.log(e)
        }

        canvas.addEventListener('wheel', onMouseWheel)
}

