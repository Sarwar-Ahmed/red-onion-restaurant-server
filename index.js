const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ixf2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;




const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const foodCollection = client.db("redOnionDB").collection("foodMenu");
  const servicesCollection = client.db("redOnionDB").collection("services");
  
  app.get('/foodMenu', (req, res) => {
      foodCollection.find({})
      .toArray((err, documents) => {
          res.send(documents);
      })
  })
  app.get('/services', (req, res) => {
    servicesCollection.find({})
    .toArray((err, documents) => {
        res.send(documents);
    })
  })

  app.post('/addFoodMenu', (req, res) => {
      foodCollection.insertMany([])
      .then(result => {
          res.send(result.insertedCount);
        // console.log("added")
      })
  })
});


app.get('/', (req, res) => {
    res.send("Hello Server");
})

app.listen(process.env.PORT || port)