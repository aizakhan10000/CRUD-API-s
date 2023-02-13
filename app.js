const express=require('express')
const mongoose=require('mongoose')
const createError =require('http-errors')
const morgan=require('morgan')
require('dotenv').config()
const user=require("./models/User.model")
const Authroute=require('./routes/Auth.route')


const url ='mongodb://127.0.0.1/aiza'
//const url1 = 'mongodb://localhost:27017'

const app=express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async(req,res,next)=>{
    res.send("Hello from express")
})

app.use('/auth',Authroute)


mongoose.connect(url)//,{userNewUrlParser:true, useUnifiedTopology: true}) 
const con= mongoose.connection
con.on('open',()=>{
    console.log('connected.....')
})

app.use(async(req,res,next)=>{
   // const error=new Error("Not found")
   // error.status=404
   // next(error)
   next(createError.NotFound())
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message: err.message,
        },
    })
})


app.use(express.json())
const alienRouter=require('./routes/aliens')
app.use('/aliens',alienRouter)
app.listen(9000,()=>{
    console.log('Server started')
})
module.exports = app;