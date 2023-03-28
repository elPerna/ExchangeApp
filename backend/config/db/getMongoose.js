const connectDB = require('mongoose')
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`


module.exports = connectDB.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)