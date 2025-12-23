const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const contactRoutes = require('./routes')
dotenv.config()
const app = express()

const PORT = process.env.PORT || 8000;
const mongoDbUrl = process.env.mongoDbUrl;

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send({
        "Message": "Contact page"
    })
})


app.use(contactRoutes)

const CreateServer = async (mongoDbUrl, PORT) => {

    try {
        let connectMongoDb = await mongoose.connect(mongoDbUrl)
        console.log("MOngoDb is Connected")

        app.listen(PORT, () => {
            console.log(`Server is Running on Port ${PORT}`)
        })
    } catch (err) {
        console.log(err.message)
    }


}

CreateServer(mongoDbUrl, PORT)