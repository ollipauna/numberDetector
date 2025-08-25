import axios from 'axios';

const express = require('express');

const app = express();
const baseUrl = "http://localhost:8080/v2/models/mnist-svm/versions/v0.1.0/infer";
app.use(express.json());

const PORT = 3003;   
  
app.get('/', (req, res) => {
    res.send('Succesful response');
});

app.post('/api/number', async (req, res) => {
    const data = JSON.parse(req.body['data']);
    const dimensions = [1, data.length * data[0].length];

    const inference_request = {
        inputs: [
            {
              "name": "predict",
              "shape": dimensions,
              "datatype": "FP32",
              "data": [data.flat()]
            }
        ]
    };

    console.log(inference_request);
    
    const response = await axios.post(baseUrl, inference_request);
    const result = response.data.outputs[0].data;
    console.log(result);
    res.send(result);

});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));