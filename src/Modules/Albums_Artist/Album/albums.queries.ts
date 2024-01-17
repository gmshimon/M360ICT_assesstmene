const createAlbumQuery = "INSERT INTO albums (title,release_year,genre,created_by) VALUES($1,$2,$3,$4)"
const getAlbumQuery = "SELECT albums.id AS id,albums.title AS album_title,albums.release_year,albums.genre,jsonb_build_object('id',users.id,'name',users.name,'email',users.email) AS created_by FROM albums JOIN users ON albums.created_by = users.id"
// const getAlbumQuery = "SELECT * FROM albums JOIN users ON albums.created_by = users.id"

const getAlbumQueryID = "SELECT albums.id AS album_id,albums.title AS album_title,albums.release_year,albums.genre,jsonb_build_object('id',users.id,'name',users.name,'email',users.email) AS created_by FROM albums JOIN users ON albums.created_by = users.id WHERE albums.id = $1"

const deleteAlbum = "DELETE FROM albums WHERE id = $1"

const updateAlbumQueryID = "UPDATE albums SET title = $1 , release_year = $2 , genre = $3 WHERE id = $4"

export default {
    createAlbumQuery,
    getAlbumQuery,
    getAlbumQueryID,
    deleteAlbum,
    updateAlbumQueryID
}