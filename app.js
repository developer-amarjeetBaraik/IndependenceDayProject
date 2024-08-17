import express from 'express'
import path from 'path'
import generatePDF from './generatePDF.js';

const app = express()

const port = 3000;
app.use(express.static('public'))

// const base64Image = file.toString('base64');

app.get('/', (req, res) => {
    res.sendFile(path.join(serveStaticFile(), 'public', 'index.html'))
})

// console.log(path.join(path.dirname(__filename), 'logo.png'))

app.post('/generatePDF', (req, res) => {
    generatePDF('Amarjeet')
    res.send('get request')
})

app.listen(port, () => {
    console.log(`Independence Day app is listening on port: ${port}`)
})