const appRoot = require('app-root-path')
require('dotenv').config({ path: `${appRoot}/config/.env` })
const { Worker } = require('bullmq')
const connectDB = require(`${appRoot}/config/db/getMongoose`)
const sendWithdraw = require(`${appRoot}/jobs/withdraws/transaction`)

connectDB.then(() =>{
    new Worker('withdraw-requests', async (job) => {
        return await sendWithdraw(job.data)
    })
})

