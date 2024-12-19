const express = require('express');
const app = express();
let responseSent = false; // Flag to track if a response has been sent
app.get('/', (req, res) => {
  doSomethingAsync().then(() => {
    if (!responseSent) {
      res.send('Hello from Express!');
      responseSent = true; // Set the flag after sending the successful response
    }
  }).catch(error => {
    if (!responseSent) {
      console.error('Error:', error);
      res.status(500).send('Something went wrong!');
      responseSent = true; // Set the flag after sending the error response
    }
  });
});

function doSomethingAsync() {
  return new Promise((resolve, reject) => {
    const randomValue = Math.random();
    if (randomValue < 0.5) {
      reject(new Error('Something went wrong in the asynchronous operation'));
    } else {
      resolve();
    }
  });
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});