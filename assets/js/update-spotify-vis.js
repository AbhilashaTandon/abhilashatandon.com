import data from "../../collections/artist_data.json"
let sorted_data = data.sort((a, b) => a.popularity < b.popularity);

function drawCircle(ctx, x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        const root = document.documentElement;
        ctx.fillStyle = color;
        ctx.fill();
}

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


        sorted_data.map((artist) => {
                drawCircle(ctx, 100 * artist.x + 600, 100 * artist.y + 300, Math.sqrt(artist.popularity) / Math.pow(transform.zoom, .6), "#00000040")
        });

//left -x / z
//top -y / z
//right (2000 - x) / z
//bottom (1000 - y) / z

}
