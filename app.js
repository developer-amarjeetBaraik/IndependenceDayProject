import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 3000;
app.use(express.static('public'))

function serveStaticFile(mainFilePath){
    const __filename = fileURLToPath(import.meta.url);
    return mainFilePath = path.dirname(__filename)
  }

  console.log(path.join(serveStaticFile(), 'public', 'index.html'))
app.get('/', (req, res)=>{
    res.sendFile(path.join(serveStaticFile(), 'public', 'index.html'))
})

app.listen(port, ()=>{
    console.log(`Independence Day app is listening on port: ${port}`)
})