const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser')
const mssql=require('mssql');


const app = express();

app.use(cors());
// app.use(bodyParser.json())



app.listen(3000,()=>console.log('still listening at 3000'))

app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '1mb' }));

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate())
  ].join('-');
}


var config = {
  user: 'Esraa',
  password: 'P@ss#!fr@T',
  server: 'localhost', 
  database: 'Azamat' ,
  options: {
    encrypt: true,
    trustServerCertificate: true
} };

mssql.connect(config).then(pool => {
  if (pool.connecting) {
    console.log('Connecting to the database...')
  }
  if (pool.connected) {
    console.log('Connected to SQL Server')
   
  


  }
})






app.post('/api', (request, response) => {
  const data = request.body;
  console.log("DataEsraa",data.sheet_data)
  // const timestamp = Date.now();
  // console.log(data.sheet_data)
  data.sheet_data.splice(0,1)

  const postLocation =async(pam)=>{
 

    try{
        let pool=await mssql.connect(config)
        // console.log(pool)
        let lastUpdate=await pool.request().query(`select Migration_Date,Max(RecordID)
        from Location
        group by Migration_Date`)
      // let lastMigration_Date= formatDate(lastUpdate.recordset[0].Migration_Date)
     
      // if(lastMigration_Date==formatDate(new Date())){
      //   console.log("you already submit today")
      // }
     
        let locate=await pool.request().query(`iNSERT INTO location (Coordinate,N,E,Migration_Date) values ('${pam.Coordinate}',${pam.N},${pam.E},'${pam.Migration_Date}');`)
        return locate
      
    }
    catch(error){
console.log(error)
    }

}

for(let i=0;i<data.sheet_data.length;i++){
 
  let pam= new Location(data.sheet_data[i][0],data.sheet_data[i][1],data.sheet_data[i][2])
  if(pam.Migration_Date)
  postLocation(pam)
  // console.log(pam)

}
  // response.json(data);
});










app.get('/api',(request, response) =>{

  const getLocation =async()=>{
  
    try{
        let pool=await mssql.connect(config)
        // console.log(pool)
        let locate=await pool.request().query("SELECT * FROM location ")
         
        console.log("select is done !",locate)
        response.json(locate.recordset)
        return locate
        
    }
    catch(error){
console.log(error)
    }

}
getLocation()  

})


class Location{
  constructor(Coordinate,N,E){
    this.Coordinate=Coordinate,
    this.N=N,
    this.E=E
    this.Migration_Date=formatDate(new Date())
  }
}


