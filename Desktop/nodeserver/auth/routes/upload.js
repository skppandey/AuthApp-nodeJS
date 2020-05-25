const router = require('express').Router();
var fileupload = require('express-fileupload');
// const file = require('../models/File');
const upload = require('../middleware/upload');
const mongodb = require('mongodb');
const dotenv = require('dotenv');   
const mongoose = require('mongoose');
var http = require('http')

const mongoClient = mongodb.MongoClient
var fs = require('fs');

router.use(fileupload());
const binary = mongodb.Binary;

router.post('/upload', async (req,res,next) => { 
    console.log(req.body) 
  let file = {  
      email: req.body.email,
      name : req.files.photo.name,
      image : binary(req.files.photo.data) }
    insertFile(file, res)
    res.send({
        success:true,
        message:"image uploaded"
    })
    
});
async function insertFile(file, res) {
    const client =  await mongoClient.connect('mongodb://127.0.0.1:27017', 
        { useUnifiedTopology: true , useNewUrlParser: true});
  
            let db = client.db('userdetails')
              let collection = db.collection('docs');
              collection.find({email:file.email}).toArray(async (err, doc) => {
                  console.log(doc)
                if(doc.length != 0){
                    var myquery = { email:file.email };
                    var newvalues = { $set: {  
                        name : file.name,
                        image : file.image }};

                 collection.updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                    client.close();
                  });
                }else{  
                await collection.insertOne(file)
                console.log('File Inserted')
            client.close();
        }
        });
    }

router.get('/upload', async (req,res,next) => {  
    getFiles(res,req);
 });

 function getFiles(res,req) {
    mongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return err
        }
        else {
            let db = client.db('userdetails')
            let collection = db.collection('docs')
            collection.find({email:req.header('email')}).toArray((err, doc) => {
                console.log(doc.length)
                if (doc.length === 0) {
                    console.log('err in finding doc:', err)
                    res.send(400, {error: "error in finding the file"})
                }
                else {
                    let buffer = doc[0].image.buffer
                    console.log(doc[0].image.buffer)
                    fs.writeFileSync(doc[0].name, buffer)
                    const data = fs.readFileSync(doc[0].name)

                    res.writeHead(200, {'name':doc[0].name, 'Content-Type': 'image/jpeg'})
                    res.end(data);
                }
            })  
            client.close()
            // res.redirect('/')
        }

    })
}


module.exports = router;