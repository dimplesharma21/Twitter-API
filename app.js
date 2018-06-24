var express=require('express');
var Twitter = require('twitter');
var bodyParser=require('body-parser');
var ejs=require('ejs');
var path = require('path');
var app=express();


 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.set('view engine','ejs');

 var client = new Twitter({
  consumer_key: 'POwyQeRq3Ye18J01ZpKXmQA23',
  consumer_secret: 'GmS0sjVqLBWIO037BPNGe0GdIkUHh0i2zYuugBB2iHrRndv4EF',
  access_token_key: '956965595873820684-GrlIpSCQpaFAhGi32sCsDZXNM9ulALR',
  access_token_secret: 'sxIegKpPgqS0l2wkbQL0kBToCciDQ7taDcAp4RU2tmbBb'
});

app.get("/",function(req,res)
       {
     res.render('index',{follow:"",
                        tweet:"",
                         recent:"",
                         username:""
                        });
    
})
 app.post("/",function(req,res){
    
     var params = {screen_name: req.body.username};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    var obj2=tweets
    
    res.render('index',{follow:obj2[0].user.followers_count,
                        tweet:obj2[0].user.statuses_count,
                         recent:obj2[0].text,
                        username:req.body.username
                        });
  }
   
});
 })


app.listen(1000,function(){
    console.log("server started at localhost 1000");
});