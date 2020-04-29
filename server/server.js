let app = require('express')(),
server = require('http').Server(app),
bodyParser = require('body-parser')
express = require('express'),
cors = require('cors'),
http = require('http'),
path = require('path');

let documentRoute = require('./Routes/document'),
util = require('./Utilities/util');

let mongoose = require('./Utilities/mongooseConfig')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use(cors());

app.use(function(err, req, res, next) {
return res.send({ "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG });
});

app.use('/document', documentRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
next();
});

/*Code to run the angular build*/
// app.get('*', (req, res) => {
// res.sendFile(path.join(__dirname, '../server/client/dist/index.html'));
// })



server.listen(3000,function(){
console.log('app listening on port: 3000');
});
