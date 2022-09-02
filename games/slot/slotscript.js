function spin() {
    const wheel1 = document.getElementById("wheel-1");
    const wheel2 = document.getElementById("wheel-2");
    const wheel3 = document.getElementById("wheel-3");
    let id = null;
    let pos = 0;
    if (wheel1.style.top == "340px") {
        wheel1.style.top = "0px";
    }
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        if (pos == 340) {
        clearInterval(id);
        } else {
        pos++; 
        wheel1.style.top = pos + "px";
        }
    }
}