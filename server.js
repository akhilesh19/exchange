const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ExchangeBackup = require('./models/exchangeBackup')
const Currency = require('./models/currency')
const path = require('path');
const Response = require('./responseHandler.js')
const request = require('request')
const CronJob = require('cron').CronJob;
const async = require('async')

const app = express();
app.set('port', (process.env.PORT || 5000));
// const DB_URL = 'mongodb://199.188.204.100/exchange'
const DB_URL = 'mongodb://127.0.0.1/exchange'

mongoose.connection.openUri(DB_URL);
mongoose.connection.on('connected',  ()=> {  
 console.log('success','Mongoose default connection open to ' + DB_URL);
}); 


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(express.static(path.join(__dirname, 'assest')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, browser_id");
  next();
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => res.status(200).json({
    'message': 'Server running'
}))
app.post('/login',(req,res)=>{
if(!req.body.email || ! req.body.password)
	 Response.sendResponse(res,400,"Please fill required field.")
else
if(req.body.email.toLowerCase() == 'admin@xchange.com' && password == 'privatexchange')
  Response.sendResponse(res,200,"Login successfully.")
    else
			 Response.sendResponse(res,500,"Your emailId or password is wrong.")
})
var job = new CronJob('01 * * * * 0-6', function() {
Currency.find({}).then(successed=>{
  // console.log('success currency list==>',JSON.stringify(successed))
counter = 0;
async.forEachLimit(successed[0].currencyData, 1, function(item, next) {
  console.log("currency===>>",item.currency)
  ExchangeBackup.count({currency:item.currency}).then(succ=>{
  console.log("count=====>>>",succ)
  console.log("job start.",typeof item,item)
  succ = succ?succ:1
request('https://cryptokenxchange.com:5001/exchanges/api/v1/address/getPrivateKeyBTC?currency='+item.currency+'&skip='+succ+'&phrase='+item.walletPhrase,
 function (error, response, body) {
 console.log('body:',typeof body ,body =JSON.parse(body));
  if(body.responseCode != 400)
  {

var finalData = []
for(var i=0;i<body.data.length;i++){
  delete body.data[i]._id
  delete body.data[i].name 
  delete body.data[i].country
  delete body.data[i]._id
  delete body.data[i].freezeBalance
  delete body.data[i].balance
  delete body.data[i].lastLedgerVersion
  delete body.data[i].status

  data = body.data[i],data.privateKey =body.data[i].privateKey,
    data.userId=body.data[i].userId,data,data.email = (body.data[i].email? body.data[i].email:''),
    data.identity = (body.data[i].identity? body.data[i].indentity:'') 
   delete body.data[i]
  finalData.push(data)
}

 console.log("final data ===>>>",finalData) 
ExchangeBackup.insertMany(finalData)
.then(success=>{
  console.log("successfully data saved.",success)
counter++;
if(counter<successed[0].currencyData.length)
  next();
else {
  console.log("success===1111111111111111111111111111111111111>>>")
}

})
.catch((error)=>{

counter++;
if(counter<successed[0].currencyData.length)
  next();
else {

  console.log("error===1111111111111111111111111111111111111>>>")
}

})
}
else
{
  console.log("ETHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
}
});

}).catch(err=>
{
  counter++;
if(counter<successed[0].currencyData.length)
  next();
else {

  console.log("error===1111111111111111111111111111111111111>>>")
}
// console.log("err==>",err)
})

})



})
.catch(error=>console.log("error==>",error))


  }, function () {
    console.log("job stops.")
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  'Asia/Kolkata' /* Time zone of this job. */
);

app.post('/getUserDetails',(req,res)=>{
	ExchangeBackup.find({currency:req.body.currency},(err,result)=>{
		if(err)
			 Response.sendResponse(res,500,"Somthing went wrong.")
		else
			 Response.sendResponse(res,200,"Data show successfully.",result)
	})
})

app.get('/getCurrencyList',(req,res)=>{
  Currency.find({},(err,result)=>{
    if(err)
       Response.sendResponse(res,500,"Somthing went wrong.")
    else
       Response.sendResponse(res,200,"Data show successfully.",result)
  })
})

//app.use('/api/v1/users', require('./routes/user'));
//app.use('/api/v1/buses', require('./routes/bus'));
//app.use('/api/v1/routes', require('./routes/route'));
// app.use('/api/v1/organisation',require('./routes/organisation'));

app.listen(app.get('port'), () => console.log('Server running on ' + app.get('port')));
