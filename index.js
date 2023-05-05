const http =require('http');
const path = require('path');
const fs = require('fs');
const {MongoClient} = require('mongodb');
const uri ="mongodb+srv://akhila:guntupalli@cluster0.zed8ykx.mongodb.net/test";
const client = new MongoClient(uri);

const DBconnect=async()=>{
    try{
        await client.connect();
        console.log("db connected")
    
    }
    catch(e){
        console.log(e)
    }
}
DBconnect();

const server = http.createServer((req, res)=>{
    const headers =  {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  };
    console.log(req.url);
    if( req.url ==='/'){
     
        fs.readFile(path.join(__dirname,'public','index.html'),
        (err, content)=>{
            if (err) throw err;
            res.writeHead(200,{ 'Content-type': 'text/html'});
            res.end(content);

        });
    }
    
    else if(req.url =='/api'){

        fs.readFile(path.join(__dirname,'public','db.json'), 'utf-8',
        (err, content)=>{
            if(err ) throw err ;
            res.writeHead(200, headers)  
            res.end(content);
        });

    }

    else{
        res.writeHead(404, { 'Content-type': 'text/html'})  
        res.end("<h1> 404 Nothing is Here </h1>")
    }   

});

const PORT = process.env.PORT || 6363;
server.listen(PORT, ()=> console.log(" Great our server is runnning"));
