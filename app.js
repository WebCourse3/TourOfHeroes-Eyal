let express = require("express");
let app = express();
let router = require('./routes/router');
let bodyParser = require('body-parser');
let http = require('http').Server(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/modules" , express.static(__dirname + '/node_modules'));

app.use('/heroes',router);


http.listen(3000, function(){
    console.log('listening on port:3000');
});