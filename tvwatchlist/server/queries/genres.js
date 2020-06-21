const db = require('../db/db')


//get all genres
getAllGenres = async () => {
    try {
        let response = db.any("SELECT * from genres")
        return response
    } catch (error) {
        console.log("error", error)
    };
}

//post new genre
addNewGenre = async (genre_name) => {
    try {
    const insertQuery = `INSERT into genres(genre_name) VALUES($1)`
        let response = await db.any(insertQuery, [genre_name])
        return response
    } catch (error) {
        console.log("error", error)
    };
}


module.exports = {
    getAllGenres,
    addNewGenre
}