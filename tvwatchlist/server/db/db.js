let pgp = require ("pg-promise")();;
let connectionString = "postgres://localhost:5432/tvwatchlist"
let db = pgp(connectionString)

module.exports = db;