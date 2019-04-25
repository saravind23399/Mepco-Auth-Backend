const express = require('express')
const router = express.Router()
const attendance = require('../models/attendance')
const faculty = require('../models/faculty')

const fr = require('face-recognition')
const recognizer = fr.FaceRecognizer()
const model = require('../model')
recognizer.load(model)

router.post('/new', (req, res) => {
    const newFaculty = new faculty({
        name : req.body.name,
        idString: req.body.idString,
        department: req.body.department
    })

    newFaculty.save((err)=>{
        if(err){
            res.json({
                success: false,
                message: 'DB Error. Try Again.'
            })
        } else {
            res.json({
                success: true,
                message: 'New Faculty Added Successfully'
            })
        }
    })

})

router.post('/delete', (req, res) => {

})

router.post('/train', (req, res) => {
    faculty.find({idString: req.body.userId}).then((err, docs)=>{
        if(err){
            res.json({
                success: false,
                message: 'DB Error. Try Again'
            })
        } else {
            if(docs.length == 0){
                res.json({
                    success: false,
                    message: 'No User found with given User ID'
                })
            } else {
                var base64Data = req.body.face
                const dir = "./images/temp/training/"
                require("fs").writeFile(dir + req.body.deviceId + ".jpg", base64Data, 'base64', function (err) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Error! Try Again'
                        })
                    } else {
                        console.log(dir + req.body.deviceId + ".jpg")
                        const face = fr.loadImage(dir + req.body.deviceId + ".jpg")
                        recognizer.addFaces([face], req.body.userId)
                        modelState = recognizer.serialize()
                        require("fs").writeFile('./model.json', JSON.stringify(modelState), (err)=>{
                            console.log('Training complete')
                            res.json({
                                success: true,
                                message: 'Trainning Completed for  ' + req.body.userId + ' successfully!'
                            })
                        })
                    }
                });
            }
        }
    })
    

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
        } else {
            const fr = require('face-recognition')
            const recognizer = fr.FaceRecognizer()
            const model = require('../model')
            recognizer.load(model)
            const face = fr.loadImage(dir + req.body.deviceId + ".jpg")
            const predictions = recognizer.predictBest(face)
            const production = true;
        //     if (production) {
        //         faculty.find({ idString: predictions.className }).then((err, docs) => {
        //             if (err) {
        //                 res.json({
        //                     success: false,
        //                     message: 'DB Error. Try Again'
        //                 })
        //             } else {
                        
        //             }
        //         })
        //     } else {
        //         res.json({
        //             success: true,
        //             message: 'Attendance for ' + predictions.className + ' Marked successfully!'
        //         })
        //     }
        const newAttendance = new attendance({
            userid: req.body.deviceId
        })
        newAttendance.save((error) => {
            if (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'DB Error. Try Again'
                })
            } else {
                res.json({
                    success: true,
                    message: 'Attendance for ' + predictions.className + ' Marked successfully!'
                })
            }
        })
         }
    });



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

            const img = './images/temp/' + req.body.deviceId + '.jpg'
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