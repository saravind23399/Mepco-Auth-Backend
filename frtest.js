const fr = require('face-recognition')

// Training Images
const image1 = fr.loadImage('./images/aravind1.jpg')
const image2 = fr.loadImage('./images/aravind2.jpg')

// arrays of face images, (use FaceDetector to detect and extract faces)
const inputFaces = [ image1, image2 ]
 
recognizer.addFaces(inputFaces, 'Aravind')

// Write Model File to Disk
const fs = require('fs')
const modelState = recognizer.serialize()
fs.writeFileSync('model.json', JSON.stringify(modelState))

// Load Model File from Disk
const modelState = require('model.json')
recognizer.load(modelState)