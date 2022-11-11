<?php


function newgame(){
    
}
function hit(){
    
}
function stand(){
    
}

$testgame = new game([],[],[]);
$testgame->newdeck(2);

var_dump($testgame);
class game
{
    public $deck = [];
    public $playercards = [];
    public $dealercards = [];

    function __construct($deck = [], $playercards = [], $dealercards = [])
    {

        $this->deck = $deck;
        $this->playercards = $playercards;
        $this->dealercards = $dealercards;
        // $this->newdeck(2);

        // var_dump($this->deck);
    }


    public function dealcards()
    {
        $randkeys = array_rand($this->deck,4);
        $this->playercards = [$randkeys[0],$randkeys[1]];
        $this->dealercards = [$randkeys[2],$randkeys[3]];
        foreach ($randkeys as $key) {
            unset($this->deck[$key]);
        }
    }
    public function newdeck($numpacks)
    {
        $deck = [];
        $pack = $this->packofcards();
        for ($i=0; $i < $numpacks; $i++) { 
            $deck = array_merge($deck,$pack);
        }
        $this->deck = $deck;
    }

    private function packofcards()
    {
        $pack = [];
        $suits = str_split("cdhs");
        $values = str_split("a234567891jqk");
        foreach ($suits as $suit) {
            foreach ($values as $val) {
                array_push($pack,$suit.$val);
            }
        }
        return $pack;
    }
}

?>