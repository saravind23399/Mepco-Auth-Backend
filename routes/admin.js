const express = require('express')
const router = express.Router()
const admin = require('../models/admin')
const attendance = require('../models/attendance')

router.post('/auth', (req, res) => {
    console.log(req.body)
    admin.find({ username: req.body.username, password: req.body.password }, (err, docs) => {
        if (err) {
            res.json({
                success: false,
                loggedin: false,
                message: 'DB error Occured. Try again'
            })
        } else {
            if (docs.length == 0) {
                res.json({
                    success: true,
                    loggedin: false,
                    message: 'Invalid Credentials'
                })
            } else {
                res.json({
                    success: true,
                    loggedin: true,
                    message: docs[0]
                })
            }
        }
    })
})

router.post('/new', (req, res) => {
    const newAdmin = new admin({
        username: req.body.username,
        password: req.body.password
    })

    newAdmin.save((err) => {
        if (err) {
            res.json({
                success: false,
                message: 'DB error Occured. Try again'
            })
        } else {
            res.json({
                success: true,
                message: 'Admin Added'
            })
        }
    })
})

router.get('/getAttendance', (req, res) => {
    attendance.find({}).populate('userid').then((err, docs) => {
        if (err) {
            res.json({
                success: false,
                message: 'DB error Occured. Try again'
            })
        } else {
            res.json({
                success: true,
                message: docs
            })
        }
    })
})
module.exports = router