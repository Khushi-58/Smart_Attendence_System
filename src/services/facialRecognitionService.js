const axios = require('axios');
async function recognizeFaces(imageBase64) {
  // Call Python microservice endpoint:
  const res = await axios.post('http://localhost:5001/recognize_faces', { image: imageBase64 });
  return res.data.recognized_ids; // e.g., ['101', '102']
}
module.exports = { recognizeFaces };