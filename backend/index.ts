const express = require('express')

const app = express()
app.use(express.json())

const PORT = 3000
  
app.get('/', (req, res) => {
    res.send('Succesful response')
})

app.post('/api/number', (req, res) => {
    console.log(req.body)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))