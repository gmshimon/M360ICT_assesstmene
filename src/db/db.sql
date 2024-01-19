-- create the database
CREATE DATABASE music_db

-- user table
CREATE TABLE users(
	ID SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	pass VARCHAR(255) NOT NULL,
	age int NOT NULL
);

-- album artist
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_year int NOT NULL,
  genre VARCHAR(255) NOT NULL,
  created_by int REFERENCES users(id) NOT NULL
);

-- artists table
CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_by int REFERENCES users(id) NOT NULL
);

-- songs table
CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  created_by int REFERENCES users(id) NOT NULL,
  album_id INTEGER REFERENCES albums(id) NOT NULL
);

-- album_artist (many-to-many) table
CREATE TABLE album_artist (
  id SERIAL 
  album_id INTEGER REFERENCES albums(id) NOT NULL,
  artist_id INTEGER REFERENCES artists(id) NOT NULL,
  PRIMARY KEY (id,album_id, artist_id)
);
