var spinning = false;
var rustVersionActive = true;
var BET = "yellow";
var money;
getmoney();

var isRustCookie = getCookie("isRust");
if (isRustCookie == "true") {
} else {
    window.addEventListener("DOMContentLoaded", function() {
        toggleRust();
    });
}

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
    // spinto(rustWheelResults[Math.floor(Math.random()*rustWheelResults.length)]);
    // return;
    var url;
    if (rustVersionActive) {
        url = '/games/casino.php?type=play_rustwheel&bet=' + BET;
    } else {
        url = '/games/casino.php?type=play_luckywheel';
    }
    $.ajax(
        url,
        {
            success: function(data) {
                roll = data;
                spinto(roll);
            },
            error: function() {
                alert('tell the developer his code sucks');
                spinning = false;
            }
        }
    );
}

function spinto(result) {
    
    money -= 100;
    updatemoney();
    
    const wheel = document.getElementById("wheelImg");

    var options = [];
    var wheelResults = getWheel();
    for (var i = 0; i < wheelResults.length; i++) {
        if (wheelResults[i] == result) {
            options.push(i);
        }
    }
    var landon = options[Math.floor(Math.random()*options.length)];

    var doneSpinng = new Promise((resolve, reject) => {
        spinwheel(wheel,landon, resolve);
    });
    doneSpinng.then(() => {
        console.log(result);
        spinning = false;
        if (rustVersionActive) {
            if (result != BET) {
                return;
            }
            if (result == "red") {
                money += 21 * 100;
                updatemoney();
            } else if (result == "green") {
                money += 4 * 100;
                updatemoney();
            } else if (result == "yellow") {
                money += 2 * 100;
                updatemoney();
            } else if (result == "blue") {
                money += 6 * 100;
                updatemoney();
            } else if (result == "purple") {
                money += 11 * 100;
                updatemoney();
            }
        } else {
            if (result == "red") {
                money += 250;
                updatemoney();
            } else if (result == "black") {
                money += 350;
                updatemoney();
            } else if (result == "yellow") {
                money += 100;
                updatemoney();
            } else if (result == "blue") {
            } else if (result == "green") {
            }
        }
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
                var ang = 360 / getWheel().length;
                pos = -22 + (landon*ang) + 2.2 + Math.floor(Math.random()*(ang-4.4));
                if (rustVersionActive) {
                    pos -= (ang/2);
                }
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

function bet(bet) {
    BET = bet;
    document.getElementsByClassName("chosen")[0].classList.remove("chosen");
    document.getElementById(bet).classList.add("chosen");
}

function getWheel() {
    if (rustVersionActive) {
        return rustWheelResults;
    } else {
        return wheelResults;
    }
}

function toggleRust() {
    rustVersionActive = !rustVersionActive;
    document.cookie = "isRust=" + rustVersionActive;
    if (rustVersionActive) {
        document.getElementById("wheelImg").src = "images/rust_wheel.png";
        document.getElementById("arrow").childNodes[0].src = "images/rust_arrow.png";
        document.getElementsByClassName("spinOptionsBox")[0].style.display = "block";
        document.getElementsByClassName("contain")[0].classList.add("rust");
        document.getElementById("rust_wheel_checkbox").checked = true;
    } else {
        document.getElementById("wheelImg").src = "images/base.png";
        document.getElementById("arrow").childNodes[0].src = "images/arrow.png";
        document.getElementsByClassName("spinOptionsBox")[0].style.display = "none";
        document.getElementsByClassName("contain")[0].classList.remove("rust");
        document.getElementById("rust_wheel_checkbox").checked = false;
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }