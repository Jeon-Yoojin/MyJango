import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

// Get reference to bundled model assets 
const modelJson = require('../assets/model/burger_not_burger.json');
const modelWeights = require('../assets/model/burger_not_burger_weights.bin');

// Use the bundleResorceIO IOHandler to load the model
const model = await tf.loadLayersModel(
  bundleResourceIO(modelJson, modelWeights));

// Load an image from the web
const uri = 'http://example.com/food.jpg';
const response = await fetch(uri, {}, { isBinary: true });
const imageData = await response.arrayBuffer();
const imageTensor = decodeJpeg(imageData);
  
const prediction = (await model.predict(imageTensor))[0];

// Use prediction in app
setState({
  prediction,
});