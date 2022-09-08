var spinning = false;
var money = getmoney();


function getmoney() {
    $.ajax(
        'casino.php?type=money',
        {
            success: function(data) {
                return data;
            },
            error: function() {
                alert('tell the developer his code sucks');
            }
        }
    );
}



function spin() {
    if (spinning) {
        return;
    } else {
        spinning = true;
        money -= 100;
        updatemoney();
    }
    const wheel1 = document.getElementById("wheel.1");
    const wheel2 = document.getElementById("wheel.2");
    const wheel3 = document.getElementById("wheel.3");

    // test = Math.floor(Math.random()*4);
    landon1 = Math.floor(Math.random()*4);
    if (Math.random() < 0.5) {
        landon2 = Math.floor(Math.random()*4);
        landon3 = Math.floor(Math.random()*4);
    } else {
        landon2 = landon1;
        landon3 = Math.floor(Math.random()*4);
    }

    spinwheel(wheel1,landon1);
    setTimeout(() => {
        spinwheel(wheel2,landon2);    
    }, 500);
    setTimeout(() => {
        spinwheel(wheel3,landon3);
    }, 1000);
    setTimeout(() => {
        if (landon1 == landon2 && landon1 == landon3) {
            console.log("you win!");
            money += 500;
            updatemoney();
        }
        spinning = false;
    }, 5700);
    

    function spinwheel(wheel,landon) {
        let id = null;
        let id2 = null;
        let pos;
        if (wheel.style.top) {
            pos = -parseInt(wheel.style.top,10);
        } else {
            pos = 0;
        }
        clearInterval(id);
        clearInterval(id2);
        let speed = 0;
        let acc = 0.09;
        let ticks = 400;
        id = setInterval(accelerate, 5);
        function accelerate() {
            if (ticks <= 0) {
                acc = -0.02;
                pos = 75+(100*landon);
                id2 = setInterval(decelerate, 5);
                clearInterval(id);
            }
            if (pos >= 400) {
            pos = pos-400;
            } else {
            pos += speed; 
            speed += acc;
            ticks--;
            }
            wheel.style.top = -pos + "px";
        }
        function decelerate() {
            if (speed <= 0.1) {
                acc = 0;
                clearInterval(id2);
            }
            if (pos >= 400) {
            pos = pos-400;
            } else {
            pos += speed; 
            speed *= 0.99;
            }
            wheel.style.top = -pos + "px";
        }

    }
}

function updatemoney() {
    document.getElementById("money").textContent = money;
}