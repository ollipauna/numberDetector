"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express = require('express');
const app = express();
const baseUrl = "http://localhost:8080/v2/models/mnist-svm/versions/v0.1.0/infer";
app.use(express.json());
const PORT = 3003;
app.get('/', (req, res) => {
    res.send('Succesful response');
});
app.post('/api/number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const response = yield axios_1.default.post(baseUrl, inference_request);
    const result = response.data.outputs[0].data;
    console.log(result);
    res.send(result);
}));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
