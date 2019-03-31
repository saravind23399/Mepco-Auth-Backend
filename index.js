const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const PORT = 3000 | process.env.PORT

const app = express()
app.listen(PORT, (err) => {
    if (err) {
        console.log('Error starting server')
    } else {
        console.log('Server started on Port : ' + PORT)
    }
})