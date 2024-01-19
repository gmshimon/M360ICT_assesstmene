const createSongQuery = "INSERT INTO songs (title,duration,created_by,album_id) VALUES($1,$2,$3,$4)"

export default {
    createSongQuery
}