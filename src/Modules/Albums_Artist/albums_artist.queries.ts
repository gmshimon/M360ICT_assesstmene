const createAlbumQuery = "INSERT INTO albums (title,release_year,genre,created_by) VALUES($1,$2,$3,$4)"
const getAlbumQuery = "SELECT albums.id AS album_id,albums.title AS album_title,albums.release_year,albums.genre,jsonb_build_object('id',users.id,'name',users.name,'email',users.email) AS created_by FROM albums JOIN users ON albums.created_by = users.id"
// const getAlbumQuery = "SELECT * FROM albums JOIN users ON albums.created_by = users.id"

export default {
    createAlbumQuery,
    getAlbumQuery
}