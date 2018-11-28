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