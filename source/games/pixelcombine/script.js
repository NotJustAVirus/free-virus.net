window.onload = function() {
    var canvas = document.getElementById("canvas");
    canvas.width = 1500;
    canvas.height = 1000;
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generate(noflag) {
    var url = document.getElementById("url").value;
    if (url == "") {
        url = "https://raw.githubusercontent.com/MeblIkea/NordicPlace/main/datas.json";
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var input = xhr.responseText;
            var canvas = document.getElementById("canvas");
            canvas.width = 3000;
            canvas.height = 2000;
            var ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var imglist = [];
            var list = JSON.parse(input).templates.reverse();
            var done = 0;
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                let img = new Image();
                img.src = item.sources[0];
                img.onload = function() {
                    imglist[i] = img;
                    done++;
                }
            }
            var handle = setInterval(() => {
                if (done == list.length) {
                    for (let i = 0; i < list.length; i++) {
                        const item = list[i];
                        if (noflag) {
                            if (item.name == "r/nordics") {
                                continue;
                            }
                        }
                        var img = imglist[i];
                        ctx.drawImage(img, item.x, item.y);
                    }
                    clearInterval(handle)
                    submit();
                }
            }, 1000);
        }
    }
    
}

function submit() {
    var file = document.getElementById("fileToUpload");
    var submit = document.getElementById("submit");
    var canvas = document.getElementById("canvas");
    var blob = canvas.toBlob(function(blob) {
        var file = new File([blob], "image.png", {type: "image/png"});
        var formdata = new FormData();
        formdata.append("fileToUpload", file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://nordicplace.mebl-ikea.repl.co/upload.php");
        xhr.send(formdata);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var input = xhr.responseText;
                var url = "https://nordicplace.mebl-ikea.repl.co/" + input;
                var link = document.getElementById("link");
                link.innerHTML = url;
            }
        }
    });
    // var image = canvas.toDataURL("image/png");
    // var imgfile = dataURLtoFile(image, "image.png");
    // file.files[0] = imgfile;
    // submit.click();
}


function getTemplate() {
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    var w = document.getElementById("w").value;
    var h = document.getElementById("h").value;
    x = parseInt(x);
    y = parseInt(y);
    w = parseInt(w);
    h = parseInt(h);

    var mainCanvas = document.getElementById("canvas");
    var mainCtx = mainCanvas.getContext("2d");
    
    var pixelData = mainCtx.getImageData(x, y, w, h).data;

    var canvas = document.getElementById("canvas2");
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
                var truex = xi + x -500;
                var truey = yi + y -500;

                // write coordinates
                ctx.font = "20px Arial";
                ctx.fillText(truex, xi * 50 + 5, yi * 50 + 25);
                ctx.fillText(truey, xi * 50 + 5, yi * 50 + 45);
            }
            i += 4;
        }
    }
}