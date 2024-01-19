const checkAlbumArtistExistQuery = `
SELECT *
FROM album_artist
WHERE album_id=$1 AND artist_id = $2
`

const createAlbumArtistQuery = `INSERT INTO album_artist (album_id, artist_id) VALUES ($1,$2)`


export default {
    checkAlbumArtistExistQuery,
    createAlbumArtistQuery
}