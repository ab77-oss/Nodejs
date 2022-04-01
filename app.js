const express=require('express');
const bodyParser= require('body-parser');
const request =require('request');
const https = require('https');

const app=express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.sendFile(__dirname+ "/signup.html");
})

app.post('/', function(req,res){
    
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const data= {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/f257852619";
    options ={
        method:"POST",
        auth:"abdelouahed:6491cf6fe9435cf7c75e1074b8c43eb3-us14"

    }
    const request1 = https.request(url, options, function(response){
        if(response.statusCode===200){ 
            res.sendFile(__dirname+ "/success.html");
        }else{
            res.sendFile(__dirname+ "/failure.html");
        }
       
       
        response.on("data", function(data){
            console.log(JSON.parse(data));
            
        })
        
    })
    request1.write(jsonData);
    request1.end();

})

app.post('/failure', function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000...")
})