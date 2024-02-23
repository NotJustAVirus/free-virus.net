var spinning = false;
var money;
getmoney();

const wheelResults = [
    "blue",
    "yellow",
    "green",
    "red",
    "blue",
    "yellow",
    "green",
    "black",
    "blue",
    "yellow",
    "green",
    "red",
];
const rustWheelResults = [
    "red",
    "yellow",
    "green",
    "yellow",
    "blue",
    "yellow",
    "green",
    "yellow",
    "purple",
    "yellow",
    "green",
    "yellow",
    "blue",
    "yellow",
    "blue",
    "green",
    "yellow",
    "purple",
    "yellow",
    "green",
    "yellow",
    "blue",
    "yellow",
    "green",
    "yellow",
];


function getmoney() {
    $.ajax(
        '/games/casino.php?type=money',
        {
            success: function(data) {
                money = data;
                updatemoney();
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
    }
    spinning = true;
    // spinto("blue");
    spinto(rustWheelResults[Math.floor(Math.random()*rustWheelResults.length)]);
    return;
    $.ajax(
        '/games/casino.php?type=play_luckywheel',
        {
            success: function(data) {
                roll = data;
                spinto(roll);
            },
            error: function() {
                alert('tell the developer his code sucks');
            }
        }
    );
}

function spinto(result) {
    
    money -= 100;
    updatemoney();
    
    const wheel = document.getElementById("wheelImg");

    var options = [];
    for (var i = 0; i < rustWheelResults.length; i++) {
        if (rustWheelResults[i] == result) {
            options.push(i);
        }
    }
    var landon = options[Math.floor(Math.random()*options.length)];

    var doneSpinng = new Promise((resolve, reject) => {
        spinwheel(wheel,landon, resolve);
    });
    doneSpinng.then(() => {
        console.log(result);
        if (result == "red") {
            // console.log("you win!");
            // money += 0;
            updatemoney();
        } else if (result == "green") {
            money += 50;
            updatemoney();
        } else if (result == "yellow") {
            money += 200;
            updatemoney();
        } else if (result == "blue") {
            money += 100;
            updatemoney();
        } else if (result == "black") {
            money += 1000;
            updatemoney();
        }
        spinning = false;
    });

    function spinwheel(wheel, landon, resolve) {
        let id = null;
        let id2 = null;
        let pos;
        if (wheel.style.rotate) {
            pos = -parseInt(wheel.style.rotate,10);
        } else {
            pos = 0;
        }
        clearInterval(id);
        clearInterval(id2);
        let speed = 0;
        let acc = 0.09;
        let ticks = 100;
        id = setInterval(accelerate, 5);
        function accelerate() {
            if (ticks <= 0) {
                pos = -22 - 7.2 + (landon*14.4) + 2.2 + Math.floor(Math.random()*10);
                id2 = setInterval(decelerate, 5);
                clearInterval(id);
            }
            pos += speed; 
            speed += acc;
            ticks--;
            if (pos >= 360) {
                pos = pos-360;
            }
            wheel.style.rotate = -pos + "deg";
            console.log("change");
        }
        function decelerate() {
            if (speed <= 0.01) {
                acc = 0;
                clearInterval(id2);
                resolve();
            }
            pos += speed; 
            if (pos >= 360) {
                pos = pos-360;
            }
            var decelerate = speed * 0.005;
            if (decelerate > 0.01) {
                decelerate = 0.01;
            }
            speed -= decelerate;
            wheel.style.rotate = -pos + "deg";
        }

    }
}

function updatemoney() {
    document.getElementById("money").textContent = money;
}