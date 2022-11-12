const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ap9xvzb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
 try{
        const serviceCollection = client.db('doctorHome').collection('services')
        app.get('/services', async(req, res) =>{
             const query = {}
             const cursor = serviceCollection.find(query).limit(3)
             const services = await cursor.toArray()
             res.send(services)
        })
        app.get('/service', async(req, res) =>{
          const query = {}
          const cursor = serviceCollection.find(query)
          const services = await cursor.toArray()
          res.send(services)
        })
        app.get('/service/:id' , async (req,res)=>{
          const id = req.params.id;
         const query = {_id: ObjectId(id)};
         const service = await serviceCollection.findOne(query);
         
         res.send(service)
        })

app.post('/service' , async(req,res)=>{
  const service = req.body;
  const result = await serviceCollection.insertOne(service)
  res.send(result)
})





 }

 




 finally{

 }
 

}
run().catch(err => console.error(err))




app.get('/' , (req,res)=>{
  res.send('doctor home is running')
})

app.listen(port, () =>{
  console.log(`doctor home server running on ${port}`);
})