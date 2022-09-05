function spin() {
    const wheel1 = document.getElementById("wheel-1");
    const wheel2 = document.getElementById("wheel-2");
    const wheel3 = document.getElementById("wheel-3");
    let id = null;
    let id2 = null;
    let pos;
    if (wheel1.style.top) {
        pos = -parseInt(wheel1.style.top,10);
    } else {
        pos = 0;
    }
    // console.log(wheel1.style.top);
    // if (wheel1.style.top >= "400px") {
    //     wheel1.style.top = "0px";
    // }
    clearInterval(id);
    clearInterval(id2);
    let speed = 0;
    let acc = 0.05;
    let ticks = 100;
    id = setInterval(accelerate, 5);
    // acc = -0.01;
    // id = setInterval(decelerate, 5);
    function accelerate() {
        if (ticks <= 0) {
            acc = -0.01;
            id2 = setInterval(decelerate, 5);
            clearInterval(id);
        }
        if (pos >= 400) {
        pos = 0;
        } else {
        pos += speed; 
        speed += acc;
        ticks--;
        }
        wheel1.style.top = -pos + "px";
    }
    function decelerate() {
        if (speed <= 0) {
            acc = 0;
            clearInterval(id2);
        }
        if (pos >= 400) {
        pos = 0;
        } else {
        pos += speed; 
        speed += acc;
        }
        wheel1.style.top = -pos + "px";
    }
}