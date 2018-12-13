CREATE TABLE users
(
   id SERIAL PRIMARY KEY
   , username VARCHAR(255) UNIQUE NOT NULL
   , password VARCHAR(255) NOT NULL
   , wins INT NOT NULL
   , losses INT NOT NULL
);

CREATE TABLE friends
(
   id SERIAL PRIMARY KEY
   , user_id INT NOT NULL REFERENCES users(id)
   , friend_id INT NOT NULL REFERENCES users(id)
);

CREATE TABLE games
(
   id SERIAL PRIMARY KEY
   , player1_id INT NOT NULL REFERENCES users(id)
   , player2_id INT NOT NULL REFERENCES users(id)
   , option1 CHAR NOT NULL
   , option2 CHAR NOT NULL
);

INSERT INTO users (username, password, wins, losses)
   VALUES
     ('Apple', 'apple', 5, 2)
   , ('Pear', 'pear', 2, 2)
   , ('Orange', 'orange', 0, 3);

INSERT INTO friends (user_id, friend_id)
   VALUES
     (1, 2)
   , (1, 3)
   , (2, 1)
   , (3, 1);

INSERT INTO games (player1_id, player2_id, option1, option2)
   VALUES
     (1, 2, 'n', 'n');

CREATE USER pbjuser WITH PASSWORD 'rosebud';
GRANT SELECT, INSERT, UPDATE ON users TO pbjuser;
GRANT SELECT, INSERT, UPDATE ON friends TO pbjuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON games TO pbjuser;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO pbjuser;
GRANT USAGE, SELECT ON SEQUENCE friends_id_seq TO pbjuser;
GRANT USAGE, SELECT ON SEQUENCE games_id_seq TO pbjuser;

SELECT u.username
FROM users u JOIN games g ON (g.player1_id = u.id OR g.player2_id = u.id)
WHERE (g.player1_id = 3 OR g.player2_id = 3);