<?php
class shape{
    public $firstrow;
    public $secondrow;
    public $thirdrow;
    public $name;
    function __construct($firstrow,$secondrow,$thirdrow,$name){
        $this->firstrow = $firstrow;
        $this->secondrow = $secondrow;
        $this->thirdrow = $thirdrow;
        $this->name = $name;
    }
}

$empty = new shape("        ","        ","        ","empty");
$cross = new shape("  \  /  ","   )(   ","  /  \  ","cross");
$circel = new shape(" /‾‾‾‾\ ","│      │"," \____/ ","circel");
$square = new shape(" ┌────┐ "," │    │ "," └────┘ ","square");
$triangel = new shape(" ̅\̅ ̅ ̅ ̅ ̅/ ","  \  /  ","   \/   ","triangel");

$allshapes = [$empty,$cross,$circel,$square,$triangel];


?>