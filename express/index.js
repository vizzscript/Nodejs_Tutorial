const express = require('express');

const app = express();

const PORT = 3000;

app.get("/",function(req,res){
    res.status(200);
    res.send("Hi, I am Vizzscript!!");
});

app.listen(PORT, (err) => {
    if(!err){
        console.log("Server is listening on PORT: ", PORT);
    }
    else{
        console.log("Server is not running");
    }
})

