-- @block
INSERT INTO games (title, path, description)
VALUES 
    ("Lucky Wheel","luckywheel","");
    -- ("Game of Life","game_of_life","");

-- @block
INSERT INTO tags (name, color)
VALUES
    ("Scratch","f2a01c"),
    ("PHP","7377ad"),
    ("Casino","006300");
    -- ("Javascript","eee170");

-- @block
INSERT INTO game_tags (game_id, tag_id)
VALUES
    (7,1);
    -- (1,2),
    -- (2,2);
-- Get game id and tag id from the database using games path and tags name
INSERT INTO game_tags (game_id, tag_id) 
SELECT games.id, tags.id
FROM games, tags
WHERE games.path = "luckywheel" AND tags.name = "PHP";
WHERE games.path = "hangman" AND tags.name = "PHP";
WHERE games.path = "tictactoe" AND tags.name = "PHP";
WHERE games.path = "coin_flip" AND tags.name = "Javascript";
WHERE games.path = "slot" AND tags.name = "Javascript";
WHERE games.path = "blockman" AND tags.name = "Scratch";
WHERE games.path = "game_of_life" AND tags.name = "Javascript";
