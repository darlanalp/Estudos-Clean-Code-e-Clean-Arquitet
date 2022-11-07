const express = require('express');
const app = express();

app.get('/', function(req, res){

    res.send('Teste');
});

const sql = require('mssql');

const con = 'Server=localhost,1433;Database=VendaOnline;User Id=rm;Password=rm;Trusted_Connection=True;TrustServerCertificate=True;';

sql.connect(con, function(err){
  if(err) console.log(err);
  let sqlRequest = new sql.Request();

  sqlRequest.query('select * from item ', function(err, data){

    if(err) console.log(err);
    console.log(data);
    sql.close();
  });

});

const webservice = app.listen(2000,function(){
    console.log("Server rodando");
})