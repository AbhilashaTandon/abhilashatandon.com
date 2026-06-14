import data from "../../collections/artist_data.json"
let sorted_data = data.sort((a, b) => a.popularity < b.popularity);
//sorted by popularity in descending order

function drawCircle(ctx, x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
}

const x_threshold = 3000
const y_threshold = 430

function artist_coord_to_local_coord(x, y) {
        return [x
                , y]
}

export default function updateVis(ctx, canvas, transform) {

        console.log(transform)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = "#ffffff"
        //clear screen
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
        //bounds of screen in local coordinate system



        sorted_data.map((artist) => {
                const [x_coord, y_coord] = artist_coord_to_local_coord(artist.x, artist.y)
                const radius = .08 * Math.sqrt(artist.popularity) / Math.pow(transform.zoom, .5)

                if (x_coord < left || x_coord > right || y_coord < top || y_coord > bottom) {
                        return
                }

                const opacity = Math.min(Math.max(Math.floor(Math.sqrt(transform.zoom) * 2), 16), 64)


                drawCircle(ctx, x_coord, y_coord, radius, "#696969" + opacity.toString(16))


        });

        //I need to do go through the artists twice so that the circles dont cover the labels
        //
        ctx.fillStyle = "#000000ff";
        ctx.font = "72px serif";
        const max_artists = 100
        let labeled_artists = []
        sorted_data.map((artist) => {
                const [x_coord, y_coord] = artist_coord_to_local_coord(artist.x, artist.y)
                const size = 0.023 * Math.pow(artist.popularity / Math.pow(transform.zoom, 1) + 2, .55) / Math.pow(transform.zoom, .75)

                const threshold = size / Math.pow(transform.zoom, .25)


                if (x_coord < left || x_coord > right || y_coord < top || y_coord > bottom) {
                        return
                }
                //outside bounds

                ctx.scale(size, size)
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

                        var metrics = ctx.measureText(artist.artist);
                        var textWidth = metrics.width;
                        ctx.fillText(artist.artist, x_coord / size - textWidth / 2, y_coord / size)
                        labeled_artists.push(artist)
                }
                ctx.scale(1 / size, 1 / size)
        });




        //left -x / z
        //top -y / z
        //right (2000 - x) / z
        //bottom (1000 - y) / z

}

