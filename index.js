const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./env/config')

const PORT = 3000 | process.env.PORT

const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const facultyRoute = require('./routes/faculty')
app.use('/faculty', facultyRoute)

app.get('/ping', (req, res) => {
    console.log('Pinged')
    res.json({
        success: true,
        message: 'Server Online'
    })
})


app.listen(PORT, (err) => {
    if (err) {
        console.log('Error starting server')
    } else {
        mongoose.connect(config.dbUrl, { useNewUrlParser: true }, (dbErr) => {
            if (!dbErr) {
                console.log('Server started on Port : ' + PORT)
                console.log('Connected to Database @ ' + config.dbUrl)
            } else {
                console.log(dbErr)
            }
        })
    }
})