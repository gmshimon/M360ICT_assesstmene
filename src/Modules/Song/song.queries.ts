const createSongQuery = "INSERT INTO songs (title,duration,created_by,album_id) VALUES($1,$2,$3,$4)"

const getSongQuery = `
SELECT
    songs.id as id,
    songs.title as title,
    songs.duration as duration,
    json_build_object(
        'id', albums.id,
        'title', albums.title,
        'release_year', albums.release_year,
        'genre', albums.genre,
        'created_by', 
        json_build_object('id', album_creator.id, 'name', album_creator.name, 'email', album_creator.email)
    ) AS album,

    jsonb_build_object('id',users.id,'name',users.name,'email',users.email) AS created_by
FROM
    songs
JOIN 
    users ON songs.created_by = users.id
JOIN
    albums ON songs.album_id = albums.id
JOIN
    users AS album_creator ON albums.created_by = album_creator.id
`

const getSongQueryID = `
SELECT
    songs.id as id,
    songs.title as title,
    songs.duration as duration,
    json_build_object(
        'id', albums.id,
        'title', albums.title,
        'release_year', albums.release_year,
        'genre', albums.genre,
        'created_by', 
        json_build_object('id', album_creator.id, 'name', album_creator.name, 'email', album_creator.email)
    ) AS album,

    jsonb_build_object('id',users.id,'name',users.name,'email',users.email) AS created_by
FROM
    songs
JOIN 
    users ON songs.created_by = users.id
JOIN
    albums ON songs.album_id = albums.id
JOIN
    users AS album_creator ON albums.created_by = album_creator.id
WHERE songs.id = $1
`

const deleteSongsQuery = `DELETE FROM songs WHERE id = $1`
export default {
    createSongQuery,
    getSongQuery,
    getSongQueryID,
    deleteSongsQuery
}