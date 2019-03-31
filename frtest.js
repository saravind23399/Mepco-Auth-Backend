const fr = require('face-recognition')
const fs = require('fs')

const recognizer = fr.FaceRecognizer()
const model = require('./model.json')
recognizer.load(model)
const test = fr.loadImage('./images/test.jpg')
const predictions = recognizer.predictBest(test)
console.log(predictions)