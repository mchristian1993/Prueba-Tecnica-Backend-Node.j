

const { Client } = require('pg')
  const connectionData = {

  user: 'postgres',

  host: '127.0.0.1',

  database: 'technical',

  password: '',

  port: 5432,

} 
 
//DATOS CONEXION A  PRODUCCION
/*  const connectionData = {

    user: 'xwvctawnaaqpff',
  
    host: 'ec2-34-225-167-77.compute-1.amazonaws.com',
  
    database: 'da0rsic6p2bknc',
  
    password: 'a8dd84d166b6f9dee5d981c125e25f5a8f21994a953fc2ee51c36f7ab1cd8a93',
  
    port: 5432,
    ssl: { rejectUnauthorized: false }
 

  
  }  */

const db= new Client(connectionData)
db.connect() 
.then(()=>{

})
.catch((err)=>{

console.log('err',err)
})

 module.exports = db;