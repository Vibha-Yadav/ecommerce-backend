const express = require('express');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');


const { createProduct } = require('./controller/Product');
const productsRouter=require('./routes/Products');
const categoriesRouter=require('./routes/Categories');
const brandsRouter=require('./routes/Brands');
const usersRouter=require('./routes/Users');
const authRouter=require('./routes/Auth');


//middlewares

server.use(cors(
   {
      exposedHeaders: ['X-Total-Count']
   }
));
server.use(express.json());
server.use('/products',productsRouter.router);
server.use('/categories',categoriesRouter.router);
server.use('/brands',brandsRouter.router);
server.use('/users',usersRouter.router);
server.use('/auth',authRouter.router);

main().catch(err => console.log(err)); 

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/test');
   console.log('connected to db')
}
   


server.get('/', (req, res) => { 
    res.json({status:'success'})
 })

 server.post('/products', createProduct);

 server.listen(8080,()=>{
    console.log('server started')
 })