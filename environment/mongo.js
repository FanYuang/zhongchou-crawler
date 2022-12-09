const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');
const conn = mongoose.createConnection(

    'mongodb://localhost:27017/ra', {
      serverSelectionTimeoutMS: 60000,
    
    bufferCommands: false,

    
   
    
  }
)

conn.on('open', () => {
  console.log('mongo connected!');
})
conn.on('err', (err) => {
  console.log('err:' + err);
})
conn.on('close', () => {
  console.log('mongo disconnected!');
})
let Unischema=new mongoose.Schema({
  name:String,
  url:String,
  town:String
})

  

let Movieuser=conn.model('Movieuser',Unischema);
module.exports = {
  conn: conn,
 

};