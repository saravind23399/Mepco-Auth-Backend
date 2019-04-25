const fr = require('face-recognition')

const training = true;

var recognizer = fr.FaceRecognizer()

// Load Model File from Disk
var modelState = require('./model.json')
recognizer.load(modelState)

if (training) {
    //const image1 = fr.loadImage('./images/Training/AravindRaj/1.jpeg')
    const image2 = fr.loadImage('./images/temp/866021040608951.jpg')
    // arrays of face images, (use FaceDetector to detect and extract faces)
    const inputFaces = [ image2]
    // Training Images
    recognizer.addFaces(inputFaces, 'AravindRaj')
} else {
    const testImage = fr.loadImage('./images/temp/866021040608951.jpg')
    const detection = recognizer.predictBest(testImage)
    console.log(detection)
}

// Write Model File to Disk
const fs = require('fs')
modelState = recognizer.serialize()
fs.writeFileSync('./model.json', JSON.stringify(modelState))