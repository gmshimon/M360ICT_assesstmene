const createAlbumQuery = "INSERT INTO artists (name,created_by) VALUES($1,$2)"

const getArtistQuery = "SELECT artists.id as id,artists.name as name,jsonb_build_object('id',users.id,'name',users.name,'email',users.email) AS created_by FROM artists JOIN users ON artists.created_by = users.id"

const getArtistQueryID = "SELECT artists.id as id,artists.name as name,jsonb_build_object('id',users.id,'name',users.name,'email',users.email) AS created_by FROM artists JOIN users ON artists.created_by = users.id WHERE artists.id = $1"

const deleteArtistQuery = "DELETE FROM artists WHERE id = $1"

const updateArtistQueryID = "UPDATE artists SET name = $1 WHERE id = $2"

export default {
    createAlbumQuery,
    getArtistQuery,
    getArtistQueryID,
    deleteArtistQuery,
    updateArtistQueryID
}