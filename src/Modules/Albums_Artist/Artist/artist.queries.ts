const createAlbumQuery = "INSERT INTO artists (name,created_by) VALUES($1,$2)"

const getArtistQuery = "SELECT artists.id as id,artists.name as name,jsonb_build_object('id',users.id,'name',users.name,'email',users.email) AS created_by FROM artists JOIN users ON artists.created_by = users.id"

export default {
    createAlbumQuery,
    getArtistQuery
}