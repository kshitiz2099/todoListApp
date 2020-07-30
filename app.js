var express=require("express"),
    mongoose=require("mongoose"),
    bodyParser=require('body-parser'),
    app=express();

var todoRoutes= require('./routes/todos')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));
app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.sendFile('index.html')
})
app.use("/api/todos", todoRoutes);

app.listen(process.env.PORT|| 3000, function(){
    console.log("Engine, start");
})