const http =require('http');
const path = require('path');
const fs = require('fs');
const {MongoClient} = require('mongodb');
const uri ="mongodb+srv://akhila:guntupalli@cluster0.zed8ykx.mongodb.net/test";
const client = new MongoClient(uri);
const server = http.createServer((req, res)=>{

    console.log(req.url);
    // / or /api /about.html
     
    if( req.url ==='/'){
     
        fs.readFile(path.join(__dirname,'public','index.html'),
        (err, content)=>{

            if (err) throw err;
            res.writeHead(200,{ 'Content-type': 'text/html'});
            res.end(content);

        });


    }
    else if(req.url ==='/about.html'){

       
        fs.readFile(path.join(__dirname,'public','about.html'),
        (err, content)=>{
            if(err ) throw err;
            res.writeHead(200, { 'Content-type': 'text/html'})
            res.end(content)
        });



    }
    else if(req.url ==='/api'){

        fs.readFile(path.join(__dirname,'public','db.json'), 'utf-8',
        (err, content)=>{

            if(err ) throw err ;
            res.writeHead(200, { 'Content-type': 'application/json'})  
            res.end(content);
        });


    }

    else{
        res.writeHead(404, { 'Content-type': 'text/html'})  
        res.end("<h1> 404 Nothing is Here </h1>")
    }   

});

server.listen(6363, ()=> console.log(" Great our server is runnning"));