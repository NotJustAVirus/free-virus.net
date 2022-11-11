var spinning = false;
var money;
getmoney();


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
    $.ajax(
        'blackjack.php?type=play_slot',
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
    
    

    if (result == 2) {
        landon1 = 3;
        landon2 = 3;
        landon3 = 3;
    }

    spinwheel(wheel1,landon1);
    setTimeout(() => {
        if (result == 2) {
            // console.log("you win!");
            money += 1000;
            updatemoney();
        } else if (result == 1) {
            money += 250;
            updatemoney();
        }
        spinning = false;
    }, 6000);
    

}

function updatemoney() {
    document.getElementById("money").textContent = money;
}