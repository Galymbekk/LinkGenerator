const express = require('express')
const config = require('config')

const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))

PORT = config.get('port') || 8000

async function start(){
    try{
        await mongoose.connect(config.get("mongoUri"))
        .then(()=>{
            console.log('Connected to MongoDB');
        })
        .catch((e)=>{
             console.log("Failed to connect to MongoDB");
        })
        app.listen(PORT, ()=>{ console.log(`Server working in PORT: ${PORT}`) })
    }catch(e){
        console.log("Server Error", e.message);
        process.exit()
    }
}

start()