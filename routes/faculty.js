const express = require('express')
const router = express.Router()

router.post('/new', (req, res)=>{
    
})

router.post('/delete', (req, res)=>{

})

router.post('/train/:id', (req, res)=>{

})

router.post('/attendance', (req, res)=>{

})

router.get('/test', (req, res)=>{
    res.json({
        success: true,
        message: 'Route Active'
    })
})

module.exports = router