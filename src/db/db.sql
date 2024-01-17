-- user table
CREATE TABLE users(
	ID SERIAL PRIMARY KEY,
	name VARCHAR(255),
	email VARCHAR(255),
	pass VARCHAR(255),
	age int
);

-- album artist
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_year int NOT NULL,
  genre VARCHAR(255) NOT NULL
);

-- artists table
CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- songs table
CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  album_id INTEGER REFERENCES albums(id) NOT NULL
);

-- album_artist (many-to-many) table
CREATE TABLE album_artist (
  album_id INTEGER REFERENCES albums(id) NOT NULL,
  artist_id INTEGER REFERENCES artists(id) NOT NULL,
  PRIMARY KEY (album_id, artist_id)
);