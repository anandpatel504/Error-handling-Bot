
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser")


var d = new Date;
var dd = d.getDate;
var mm = d.getMonth;
var yy = d.getFullYear;

var todayDate = dd.toString() + "-" + mm.toString() + "-" + yy.toString();

app.use(express.json())

app.get('/all_errors', function(req, res){
    fs.readFile( __dirname + "/error_handling.json", (err, data)=>{
        if (err){
            return res.json({"errorMsg":"check your json file"})
        }else{
            var mydata = JSON.parse(data);
            // return res.json(mydata["satyam18@navgurukul.org"]["python"]) 
            // console.log(mydata)
            return res.send(mydata);
        }
    })
})


app.get('/all_errors/:language', function(req, res){
    var language = req.params.language
    // console.log(language);

    fs.readFile( __dirname  + "/error_handling.json", (err, data)=>{
        if(err){
            return res.json({"errorMsg":"check your json file"})
        }else{
            var data1 = JSON.parse(data);
            return res.json(data1[req.params.language])
        }
    })
})


app.get('/all_errors/:language/:errorname', function(req, res){
    var errorname = req.params.errorname;
    fs.readFile(__dirname + "/error_handling.json", (err, data)=>{
        console.log(req.params.errorname)
        if (err){
            return res.json({"errorMsg":"check your json file"})
        }else{
            var mydata = JSON.parse(data);
            if (mydata.errorname == mydata.python[0]){
                // console.log(mydata.python[0]);
            }
            return res.json(mydata.python[0])
        }
    })
})


app.put('/all_errors/:language/:errorname', function(req, res){
    var errorDict = req.body;
    fs.readFile(__dirname + "/error_handling.json", (err, data)=>{
        if(err){
            return res.json({"errorMsg":"check your json file"})
        }else{
            var data = JSON.parse(data);
            for (var i of data[req.params.language]){
                if(i['errorName'] == req.params.errorname){
                    if(i.hasOwnProperty('example')){
                        i['example'] = req.body['example'];
                    }
                    if(i.hasOwnProperty('url')){
                        i['url'] = req.body['url']
                }
                break
            }
        }
    }
    var mydata = JSON.stringify(data,null,2)
    fs.writeFile(__dirname + "/error_handling.json",mydata,(err, data)=>{
        return res.json(i)
        });
    });
})



app.post('/:emailid/:errName',(req,res)=>{
    var errname=req.params.errName
    var emailId=req.params.emailid
    var newuser={}
    var data=fs.readFileSync(__dirname + "/error_handling.json")
    data=data.toString();
    var course =  JSON.parse(data)
    if(course.hasOwnProperty(emailId)){
        return res.json(course[emailId]["python"][errname]["description"])
    }else{
        course[req.params.emailid]=course["satyam18@navgurukul.org"]
        console.log(course)
        fs.writeFileSync('users.json',JSON.stringify(course,null,2))
        return res.json(course[emailId]["python"][errname]["description"])
    }

});


var server = app.listen(5051, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("server is running port...")
    console.log(host,port)
})
