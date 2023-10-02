const express=require('express')
const cors=require('cors')
const stripe=require('stripe')('sk_test_51NmXVxSGMwIxeYvh1c7VgDFpPkxKAWnCiORSw33OMohZbBbaO0PvBuYTDfCxWycSMaebL0OhSxNsbb9Zr31LQaPx004DvhEtCG')
const path = require('path')

// const app = express()
// app.use(express.json())
// app.use(cors())

// app.get("/",(req,res)=>{
// res.send("Hello World")
// })
// app.post('/payment',async(req,res)=>{
//     // console.log(req.body)
//     let {userEmail,shipping,amount,description}=req.body
//     const paymentIntent=await stripe.paymentIntent.create({
// amount:amount,
// currency:"usd",
// automatic_payment_methods:{enabled:true},
// shipping:{
//     address:{
//         line1:shipping.line1,
//         line2:shipping.line2,
//         city:shipping.city,
//         state:shipping.state,
//         postal_code:shipping.pincode,
//         country:shipping.country
//     },
//     name:shipping.name,
//     phone:shipping.mobile
// },
// description:description
//     })
//     res.send({clientSecret:paymentIntent.client_secret})

// })
// const PORT = 1000
// app.listen(PORT,()=>{
//     console.log(`Server Started At http://localhost:/${PORT}`)
// })
const app=express()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'./client/build')))
//http://localhost:1000
app.get('/',(req,res)=>{
    res.send("hello from server")
})
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/bulid/index.html'));
});
app.post('/payment',async(req,res)=>{
    // console.log(req.body)
    let {userEmail,shipping,amount,description}=req.body
   const paymentIntent=await stripe.paymentIntents.create({
        amount:amount,
        currency:"usd",
        automatic_payment_methods:{enabled:true},
        shipping:{
            address:{
                line1:shipping.line1,
                line2:shipping.line2,
                city:shipping.city,
                state:shipping.state,
                postal_code:shipping.pincode,
                country:shipping.country},
            name:shipping.name,
            phone:shipping.mobile
            },
            description:description
      })
      res.send({clientSecret:paymentIntent.client_secret})
})
const PORT=1000
app.listen(PORT,()=>console.log(`server started at http://localhost:/${PORT}`))