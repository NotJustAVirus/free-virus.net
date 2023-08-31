function genArt() {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    var w = document.getElementById("w").value;
    var h = document.getElementById("h").value;
    x = parseInt(x);
    y = parseInt(y);
    w = parseInt(w);
    h = parseInt(h);
    // get the file from the input element
    var img = document.getElementById("img").files[0];
    if (!img) {alert("No image selected!"); return;}
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        console.log(reader.result);
        var img = new Image();
        img.src = reader.result;
        img.onload = function() {
            // create a canvas element
            var tempCanvas = document.createElement("canvas");
            var tempCtx = tempCanvas.getContext("2d");
            // set its dimension to target size
            tempCanvas.width = 1500;
            tempCanvas.height = 1000;
            // draw source image into the off-screen canvas:
            tempCtx.drawImage(img, 0, 0);
            
            var pixelData = tempCtx.getImageData(x, y, w, h).data;

            var canvas = document.getElementById("canvas");
            canvas.width = w * 50;
            canvas.height = h * 50;
            var ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var i = 0;
            for (var yi = 0; yi < h; yi++) {
                for (var xi = 0; xi < w; xi++) {
                    var r = pixelData[i];
                    var g = pixelData[i + 1];
                    var b = pixelData[i + 2];
                    var a = pixelData[i + 3];
                    if (a > 0) {
                        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
                        ctx.fillRect(xi * 50, yi * 50, 50, 50);
                        // check if the pixel is a dark color
                        if (r + g + b < 255 * 3 / 2) {
                            ctx.fillStyle = 'rgba(255,255,255,1)';
                        } else {
                            ctx.fillStyle = 'rgba(0,0,0,1)';
                        }
                        // fill border
                        ctx.fillRect(xi * 50, yi * 50, 50, 1);
                        ctx.fillRect(xi * 50, yi * 50, 1, 50);
                        ctx.fillRect(xi * 50, yi * 50 + 49, 50, 1);
                        ctx.fillRect(xi * 50 + 49, yi * 50, 1, 50);
                        var truex = xi + x -1000;
                        var truey = yi + y -1000;

                        // write coordinates
                        ctx.font = "20px Arial";
                        ctx.fillText(truex, xi * 50 + 5, yi * 50 + 25);
                        ctx.fillText(truey, xi * 50 + 5, yi * 50 + 45);
                    }
                    i += 4;
                }
            }
        }
    });

    reader.readAsDataURL(img);
}