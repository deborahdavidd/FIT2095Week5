let express = require('express');
let app = express();

//setting up the view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("img"));

var filePath = __dirname + "/views/";
//db to store the tasks
let db = [];

app.get("/", function(req, res){
    let fileName = filePath + "index.html";
    res.sendFile(fileName);
});

app.get("/addTask", function(req, res){
    let fileName = filePath + "addtask.html";
    res.sendFile(fileName);
})

app.get("/listTask", function(req, res){
    //let fileName = filePath + "listtasks.html";
    //res.sendFile(fileName);
    res.render('listtasks.html', {database:db});
})

//saving the data to the database
app.post('/addNewTask', function (req, res) {
    let object = {task: req.body.taskname, date:req.body.duedate, desc: req.body.description};
    db.push(object);
    console.log(db.length);
    res.render('listtasks.html', {database:db});
})

app.listen(8080);

