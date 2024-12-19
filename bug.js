const express = require('express');
const app = express();
app.get('/', (req, res) => {
  // Simulate an asynchronous operation that might throw an error
  doSomethingAsync().then(() => {
    res.send('Hello from Express!');
  }).catch(error => {
    // The error is caught here, but it doesn't prevent the response from being sent
    console.error('Error:', error);
    // The response is already sent, so sending another response here will throw an error
    res.status(500).send('Something went wrong!');
  });
});

function doSomethingAsync() {
  return new Promise((resolve, reject) => {
    // Simulate an error condition
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