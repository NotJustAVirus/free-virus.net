


-- @block
INSERT INTO games (title, path, description)
VALUES 
    ("Hangman","hangman",""),
    ("Tic Tac Toe","tictactoe","");

-- @block
INSERT INTO games (title, path, description)
VALUES 
    ("Traffic Jam","traffic_jam",""),
    ("Blockman PvP","Blockman PvP",""),
    ("Coin Flip","coin_flip",""),
    ("Game of Life","game_of_life","");

-- @block
INSERT INTO tags (name, color)
VALUES
    -- ("Javascript","eee170");
    -- ("PHP","525d91");
    -- ("Scratch","f8aa36");

-- @block
INSERT INTO game_tags (game_id, tag_id)
VALUES
    -- (6,1);
    -- (1,2),
    -- (2,2);
    -- (3,3);
    -- (4,3);

-- @block
SELECT * FROM games
INNER JOIN game_tags
ON game_tags.game_id = games.id;


-- @block
SELECT games.path, tags.name 
FROM ((game_tags
INNER join games on game_tags.game_id = games.id)
INNER join tags on game_tags.tag_id = tags.id);

-- @block maybe not
SELECT games.title, tags.name
FROM games INNER JOIN game_tags ON games.id = game_tags.game_id;

-- @block
SELECT tags.name, tags.color
FROM (game_tags INNER join tags on game_tags.tag_id = tags.id)
where game_id LiKE '2'


-- @block
ALTER TABLE `tags` ADD `color` VARCHAR(6) NOT NULL AFTER `name`;


-- @block 
delete from game_tags where game_id=3;
-- @block
SELECT * FROM game_tags
-- where game_id LiKE '1'