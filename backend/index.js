const express = require("express");
const fs = require('fs')
const { createCanvas, registerFont } = require('canvas')
registerFont("./Lato-BoldItalic.ttf", { family: "latoBold" })
var app = express()
var cors = require('cors')
const PORT = 1000

app.use(express.json())
app.use(cors())
app.listen(PORT, () => {
    console.log(`server running ${PORT}`)
})

// this function helps to warp up text inside canvas size
var wrapText = function (ctx, text, sx, sy, w) {
    var words = text.match(/\w+/g),
        word,
        lines = [],
        currentLine = '',
        len = words.length,
        wordIndex = 0,
        x = sx,
        y = sy,
        m;
    while (wordIndex < len) {
        word = words[wordIndex];
        m = ctx.measureText(word + ' ');
        x += m.width;
        if (x + m.width < w) {
            currentLine += word + ' ';
            if (wordIndex === len - 1) {
                lines.push(currentLine);
            }
        } else {
            x = sx;
            lines.push(currentLine);
            currentLine = word + ' ';
        }
        wordIndex += 1;
    }
    return lines;
};


app.post("/getcolor", (req, res) => {
    const data = req.body;
    // Dimensions for the image
    const width = 1000;
    const height = 500;

    // Instantiate the canvas object
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);
    context.textAlign = 'center'
    context.textBaseline = 'middle';
    context.fillStyle = data.color
    context.font = "40px 'latoBold'";
    var lines = wrapText(context, data.text, 200, 200, width);
    lines.forEach(function (line, i) {
        if (i == 0) {
            context.fillText(line, (width / 2), (height / 2))
        } else {
            context.fillText(line, (width / 2), (height / 2) + (40 * i))
        }

    });
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
    var imageAsBase64 = fs.readFileSync('./image.png', 'base64');
    res.status(200).send({
        "imageBase": "data:image/png;base64, " + imageAsBase64,
    })
})