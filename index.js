// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:unix(\\d{13})", function (req, res) {
  const { unix } = req.params;
    const myUnixTimestamp = Number(unix); 
    const myDate = new Date(myUnixTimestamp); 
    const utcDate = myDate.toUTCString();
    res.json({ unix: Number(unix), utc: utcDate });
});

app.get("/api/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})", function (req, res) {
  let queryDate = new Date(
    +req.params.year,
    +req.params.month -1,
    +req.params.day
  );
  const unix = Date.parse(`${req.params.year}-${req.params.month - 1}-${req.params.day}`);
  res.json({
    unix : unix,
    utc: queryDate.toUTCString()
  })
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
