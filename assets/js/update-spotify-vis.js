import data from "../../collections/artist_data.json"

function drawCircle(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        const root = document.documentElement;
        ctx.fillStyle = '#00000040';
        ctx.fill();
}

export default function updateVis(ctx, canvas, transform) {

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.transform(1, 0, 0, 1, transform.x, transform.y)
        ctx.transform(
                transform.zoom,
                0,
                0,
                transform.zoom,
                0,
                0,
        )

        data.map((artist) => {
                drawCircle(ctx, 100 * artist.x + 600, 100 * artist.y + 300, Math.sqrt(artist.popularity) / Math.pow(transform.zoom, .6))
        });
}
