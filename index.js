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
app.get("/api", function (req, res) {
  const unix = Date.now();
  const utcDate = new Date(unix).toUTCString();
  res.json({ unix: Date.now(), utc: utcDate });
});

app.get("/api/:unix(\\d{13})", function (req, res) {
  try {
    const { unix } = req.params;
    const myUnixTimestamp = Number(unix);
    const myDate = new Date(myUnixTimestamp);
    const utcDate = myDate.toUTCString();
    res.json({ unix: myUnixTimestamp, utc: utcDate });
  } catch (error) {
    res.json({
      error: "Invalid Date",
    });
  }
});

app.get("/api/:date", function (req, res) {
  const url = req.url;
  console.log(url);
  console.log(req.params.date);
  const myDate = new Date(req.params.date).toUTCString();
  console.log(myDate);
  if (myDate === "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: Date.parse(myDate),
      utc: myDate,
    });
  }
});



// app.get("/api/:year-:month-:day", function (req, res) {
//   console.log(req.query);
//   try {
//     let queryDate = new Date(
//       +req.params.year,
//       +req.params.month - 1,
//       +req.params.day
//     );
//     const unix = Date.parse(
//       `${req.params.year}-${req.params.month}-${req.params.day}`
//     );
//     console.log(unix);
//     if (isNaN(unix)) {
//       res.json({
//         error: "Invalid Date",
//       });
//     } else {
//       res.json({
//         unix: Number(unix),
//         utc: queryDate.toUTCString(),
//       });
//     }
//   } catch (error) {
//     res.json({
//       error: "Invalid Date",
//     });
//   }
// });

// app.get("/api/:year%20:month%20:day", function (req, res) {
//   try {
//     let queryDate = new Date(
//       +req.params.year,
//       +req.params.month - 1,
//       +req.params.day
//     );
//     const unix = Date.parse(
//       `${req.params.year}-${req.params.month}-${req.params.day}`
//     );
//     console.log(unix);
//     if (isNaN(unix)) {
//       res.json({
//         error: "Invalid Date",
//       });
//     } else {
//       res.json({
//         unix: Number(unix),
//         utc: queryDate.toUTCString(),
//       });
//     }
//   } catch (error) {
//     res.json({
//       error: "Invalid Date",
//     });
//   }
// });

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
