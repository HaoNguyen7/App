const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3005

app.use(morgan('combined'))

app.get('/',(req,res)=>{
    return res.send('Hello world');
})

app.listen(port,() =>{console.log(`Server starting at port ${port}`)})