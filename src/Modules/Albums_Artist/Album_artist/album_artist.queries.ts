const checkAlbumArtistExistQuery = `
SELECT *
FROM album_artist
WHERE album_id=$1 AND artist_id = $2
`

const createAlbumArtistQuery = `INSERT INTO album_artist (album_id, artist_id) VALUES ($1,$2)`

const getAlbumArtistQuery = `
SELECT
    album_artist.id as id,
    json_build_object(
        'id', albums.id,
        'title', albums.title,
        'release_year', albums.release_year,
        'genre', albums.genre,
        'created_by', 
        json_build_object('id', album_creator.id, 'name', album_creator.name, 'email', album_creator.email)
    ) AS album,
    json_build_object(
        'id', artists.id,
        'name', artists.name,
        'created_by', 
        json_build_object('id', artist_creator.id, 'name', artist_creator.name, 'email', artist_creator.email)
    ) AS artist  
FROM 
    album_artist
JOIN
    albums ON album_artist.album_id = albums.id
JOIN
    artists ON album_artist.artist_id = artists.id
JOIN
    users AS artist_creator ON artists.created_by = artist_creator.id
JOIN
    users AS album_creator ON albums.created_by = album_creator.id;
`


export default {
    checkAlbumArtistExistQuery,
    createAlbumArtistQuery,
    getAlbumArtistQuery
}