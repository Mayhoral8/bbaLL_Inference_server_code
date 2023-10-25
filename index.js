const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('build'));


app.listen(5000, ()=>{
    console.log('code running on localhost 5000')
})