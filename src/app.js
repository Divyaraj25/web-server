const geolocation = require("./geolocation");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

console.log(__dirname); // gives the folder where this file exist
// console.log(__filename) // gives full path with filename

const app = express();
const publicDirPath = path.join(__dirname, "../public"); // Joins the public directory to the current directory
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// to set hbs dir
app.set("view engine", "hbs");
app.set("views", viewsPath);
// to set hbs partials (headers and footers)
hbs.registerPartials(partialsPath);
// app.engine('hbs', expressHbs());
// app.set("view engine", "handlebars");
// links the public folder files to this file statically
app.use(express.static(publicDirPath));

// for the root page
// html content in public
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// dynamic html content using hbs in views
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "divyaraj makwana",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "divyaraj makwana",
  });
});

// for queries passed in url, in req.query
app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "search must be provided",
    });
  }

  // default for objects used in callback, if search=(blank) then app crases, but to solve this we pass default object as "{}"
  geolocation(
    req.query.search,
    (error, { address, latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error: "data not found" });
      }
      res.send({
        address:`Location : ${address}`,
        latitude:`Latitude : ${latitude}`,
        longitude:`Longitude : ${longitude}`
      });
    }
  );
  console.log(req.query);
});

// for error, if url path not found
app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "divyaraj makwana",
    errorMsg: "404 not found",
  });
});

// for the /data endpoint
// json content
// app.get("/data", (req, res) => {
//   res.send([
//     {
//       name: "divyaraj makwana",
//       age: 54,
//       enrollment_no: "21SOEIT11020",
//     },
//   ]);
// });

// this is for serverup on port 3000
app.listen(3000, () => {
  console.log("server is up now on port 3000.");
});
