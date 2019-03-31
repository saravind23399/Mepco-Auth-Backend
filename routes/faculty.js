const express = require('express')
const router = express.Router()

router.post('/new', (req, res) => {

})

router.post('/delete', (req, res) => {

})

router.post('/train/:id', (req, res) => {

})

router.post('/attendance', (req, res) => {
    var base64Data = req.body.face
    const dir = "./images/temp/"
    require("fs").writeFile(dir + req.body.deviceId + ".jpg", base64Data, 'base64', function (err) {
        if (err) {
            res.json({
                success: false,
                message: 'Error! Try Again'
            })
        }
    });
    const fr = require('face-recognition')
    const recognizer = fr.FaceRecognizer()
    const model = require('../model')
    recognizer.load(model)
    const face = fr.loadImage('./images/' + req.body.deviceId + 'jpg')
    const predictions = recognizer.predictBest(face)
    res.json({
        success: true,
        message: 'Attendance for ' + predictions.className + ' Marked successfully!'
    })
})

router.get('/getTest', (req, res) => {
    res.json({
        success: true,
        message: 'Route Active'
    })
    res.send(dir)
})


router.post('/postTest', (req, res) => {
    var base64Data = req.body.face
    const dir = "./images/temp/"
    require("fs").writeFile(dir + req.body.deviceId + ".jpg", base64Data, 'base64', function (err) {
        if (err) {
            res.json({
                success: false,
                message: 'Error! Try Again'
            })
        } else {
            const fr = require('face-recognition')
            const recognizer = fr.FaceRecognizer()
            const model = require('../model')
            recognizer.load(model)
            const img = './images/temp/'+req.body.deviceId+'.jpg'
            const face = fr.loadImage(img)
            console.log('Image Loaded... Performing Prediction...')
            const predictions = recognizer.predictBest(face)
            console.log('Prediction Complete')
            console.log('Attendance for ' + predictions.className + ' Marked successfully!')
            res.json({
                success: true,
                message: 'Attendance for ' + predictions.className + ' Marked successfully!'
            })
        }
    });

})

module.exports = router