const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');
const conn = mongoose.createConnection(

    'mongodb://localhost:27017/zhongchou', {
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
let Proschema=new mongoose.Schema({
  
  url:String,
  title:String,
  goal:String,
  backer:String,
  percent:String,
  people:String,
  src:Array,
  
})

  

let Project=conn.model('Project',Proschema);
module.exports = {
  conn: conn,
  Project:Project
};