<!DOCTYPE html>
<html>
<head>
    <title>Tic Tac Toe</title>
    <link rel="icon" href="icon.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/style.css">
    <meta charset="utf-8">
</head>
<body>
    <ul>
        <li><a class="menu" href="/">Home</a></li>
        <li><a class="menu" href="/games">Games</a></li>
        <li><a class="menu" href="/feedback">Feedback</a></li>
        <li class="nav"><a tabindex="1" class="menu skip-nav" href="#skip">Skip to input</a></li>
    </ul>
    <div class="main">
    <?php
    include "class.php";
    
    $board = [
        [$empty,$empty,$empty],
        [$empty,$empty,$empty],
        [$empty,$empty,$empty],
    ];
    $gameend = 0;
    $player = $cross;
    $player2 = $circel;
    $fileplace = "tictactoe.txt";

    $shapes = file($fileplace);
    for ($i=0,$h=0; $i < 3; $i++) { 
        for ($j=0; $j < 3; $j++,$h++) { 
            $shape = trim($shapes[$h]);
            $board[$i][$j] = $$shape;
        }
    }

    function printboard(){
        global $board;
        $toprow = "╔══[11]══╦══[21]══╦══[31]══╗";
        $middelrow1 = "╠══[12]══╬══[22]══╬══[32]══╣";
        $middelrow2 = "╠══[13]══╬══[23]══╬══[33]══╣";
        $bottomrow = "╚════════╩════════╩════════╝";
        $side = "║";

        echo $toprow."\n";
        echo $side.$board[0][0]->firstrow.$side.$board[0][1]->firstrow.$side.$board[0][2]->firstrow.$side."\n";
        echo $side.$board[0][0]->secondrow.$side.$board[0][1]->secondrow.$side.$board[0][2]->secondrow.$side."\n";
        echo $side.$board[0][0]->thirdrow.$side.$board[0][1]->thirdrow.$side.$board[0][2]->thirdrow.$side."\n";
        echo $middelrow1."\n";
        echo $side.$board[1][0]->firstrow.$side.$board[1][1]->firstrow.$side.$board[1][2]->firstrow.$side."\n";
        echo $side.$board[1][0]->secondrow.$side.$board[1][1]->secondrow.$side.$board[1][2]->secondrow.$side."\n";
        echo $side.$board[1][0]->thirdrow.$side.$board[1][1]->thirdrow.$side.$board[1][2]->thirdrow.$side."\n";
        echo $middelrow2."\n";
        echo $side.$board[2][0]->firstrow.$side.$board[2][1]->firstrow.$side.$board[2][2]->firstrow.$side."\n";
        echo $side.$board[2][0]->secondrow.$side.$board[2][1]->secondrow.$side.$board[2][2]->secondrow.$side."\n";
        echo $side.$board[2][0]->thirdrow.$side.$board[2][1]->thirdrow.$side.$board[2][2]->thirdrow.$side."\n";
        echo $bottomrow."\n";
    }
    function place($shape,$xy){
        global $board;
        $x = substr($xy,0,1)-1;
        $y = substr($xy,1,1)-1;
        $board[$y][$x] = $shape;
    }
    function check($shape,$xy){
        global $board;
        $x = substr($xy,0,1)-1;
        $y = substr($xy,1,1)-1;
        if ($x > 2 || $y > 2) {
            return 0;
        }
        return $shape == $board[$y][$x];
    }
    function checkwin($shape){
        global $board;
        for ($i=0; $i < 3; $i++) { 
            foreach ($board[$i] as $colum) {
                if ($colum != $shape) {
                    continue 2;
                }
            }
            return 1;
        }
        for ($i=0; $i < 3; $i++) { 
            for ($j=0; $j < 3; $j++) { 
                if ($board[$j][$i] != $shape) {
                    continue 2;
                }
            }
            return 1;
        }
        for ($i=0; $i <= 3; $i++) {
            if ($i == 3) {
                return 1;
            } 
            if ($board[$i][$i] != $shape) {
                break;
            }
        }
        for ($i=0,$j=2; $i <= 3; $i++,$j--) { 
            if ($i == 3) {
                return 1;
            }
            if ($board[$i][$j] != $shape) {
                break;
            }
        }
        
    }
    function checktie($empty){
        global $board;
        for ($i=0; $i < 3; $i++) { 
            for ($j=0; $j < 3; $j++) { 
                if ($board[$i][$j] == $empty) {
                    return 0;
                }
            }
        }
        return 1;
    }
    function saveboard($board,$fileplace){
        $file = fopen($fileplace,"w");
        for ($i=0; $i < 3; $i++) { 
            for ($j=0; $j < 3; $j++) { 
                fwrite($file,$board[$i][$j]->name."\n");
            }
        }
        fclose($file);
    }
    

    if (isset($_POST["value"])) {
        $input = $_POST["value"];
        if (strlen($input) == 2) {
            if (check($empty,$input)) {
                place($player,$input);
                if (checkwin($player)) {
                    echo "You win!\n";
                    $gameend = 1;
                }
                if (checktie($empty) && $gameend == 0) {
                    echo "Nobody wins!";
                    $gameend = 1;
                }
                
                //Bots turn
                if ($gameend == 0) {
                    do {
                        $botin = random_int(1,3).random_int(1,3);
                    } while (!check($empty,$botin));
                    place($player2,$botin);
                }
                if (checkwin($player2)) {
                    echo "You lose!\n";
                    $gameend = 1;
                }
            }
        }
        saveboard($board,$fileplace);            
    }
    ?>
    <p style = "font-family:Consolas;">
    <pre><?php printboard(); ?></pre>
    </p>
    <?php
    if ($gameend == 1) {
        $board = [
            [$empty,$empty,$empty],
            [$empty,$empty,$empty],
            [$empty,$empty,$empty],
        ];
        saveboard($board,$fileplace);
        $conn->close;
    }
    ?>
<form method="post" action="">
    <input id="skip" type="text" name="value" autocomplete="off">
    <input type="submit" value="Make Move">
</form>
    </div>
</body>
</html>