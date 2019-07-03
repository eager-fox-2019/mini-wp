let db_url 
if (process.env.NODE_ENV === 'production') {
    db_url = process.env.DB_MONGO_PROD_URL
} else {
    db_url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`
}

module.exports = {
    db_url
}