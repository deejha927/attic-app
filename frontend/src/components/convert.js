var HSL2COLOR = function () {
    return function (hsl, bg) {
        function checkHex(v) {
            return 1 === v.length ? '0' + v : v;
        }
        var data, r, g, b, a,
            cnv = document.createElement('canvas'),
            ctx = cnv.getContext('2d'),
            alpha = /a\(/.test(hsl),
            output = {};

        return cnv.width = cnv.height = 1,
            bg && (ctx.fillStyle = bg, ctx.fillRect(0, 0, 1, 1)),
            ctx.fillStyle = hsl,
            ctx.fillRect(0, 0, 1, 1),

            data = ctx.getImageData(0, 0, 1, 1).data,
            r = data[0],
            g = data[1],
            b = data[2],
            a = (data[3] / 255).toFixed(2),

            alpha ? (output.hsla = hsl, bg ? output.rgb = 'rgb(' + r + ',' + g + ',' + b + ')' : output.rgba = 'rgb(' + r + ',' + g + ',' + b + ',' + a + ')') : (output.hsl = hsl, output.rgb = 'rgb(' + r + ',' + g + ',' + b + ')'),
            output.hex = '#' + checkHex(r.toString(16)) + checkHex(g.toString(16)) + checkHex(b.toString(16)),
            output;
    };
}();
export default HSL2COLOR;