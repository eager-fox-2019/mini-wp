let db_url 
if (process.env.NODE_ENV === 'production') {
    throw 'belum ada db production'
} else {
    db_url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`
}

module.exports = {
    db_url
}