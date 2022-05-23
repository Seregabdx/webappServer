// const dotenv = require("dotenv");
// dotenv.config();

// console.log(process.env.PORT);
// console.log(process.env.NODE_ENV);

//console.log(process.argv);

// if (Math.random() > 0.5) {
//   while (true) {}
// } else {
//   console.log("END");
//   process.exit();
// }

// const path = require("path");

// //console.log(path.join(__dirname, "..", ".."));
// const fullpath = path.resolve(__dirname, "first", "second");
// console.log(path.parse(fullpath));

// const siteURL = "http://localhost:8080/users?id=5123&path=123";

// const url = new URL(siteURL);

// console.log(url);

// const { rejects } = require("assert");
// const fs = require("fs");
// const path = require("path");

//fs.mkdirSync(path.resolve(__dirname, "dir1", "dir2", {recursive: true}));

// console.log("Start");
// fs.mkdir(path.resolve(__dirname, "dir", "dir1"), (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   } else console.log("Good");
// });
// console.log("END");

// fs.writeFile(path.resolve(__dirname, "test.txt"), "daf we rwe 123", (err) => {
//   //.appendFile для дозаписи
//   if (err) {
//     console.log(err);
//     return;
//   } else console.log("Good");
// });

// fs.appendFile(path.resolve(__dirname, "test.txt"), "daf we rwe 123", (err) => {
//   //.appendFile для дозаписи
//   if (err) {
//     console.log(err);
//     return;
//   } else console.log("Good");
// });

// const writeFileAsync = async (path, data) => {
//   return new Promise((resolve, reject) =>
//     fs.writeFile(path, data, (err) => {
//       if (err) {
//         return reject(err.message);
//       }
//       resolve();
//     })
//   );
// };

// const appendFileAsync = async (path, data) => {
//   return new Promise((resolve, reject) =>
//     fs.appendFile(path, data, (err) => {
//       if (err) {
//         return reject(err.message);
//       }
//       resolve();
//     })
//   );
// };

// const readFileAsync = async (path, data) => {
//   return new Promise((resolve, reject) =>
//     fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
//       if (err) {
//         return reject(err.message);
//       }
//       resolve(data);
//     })
//   );
// };

// const removeFileAsync = async (path, data) => {
//   return new Promise((resolve, reject) =>
//     fs.rm(path, (err) => {
//       if (err) {
//         return reject(err.message);
//       }
//       resolve();
//     })
//   );
// };

// writeFileAsync(path.resolve(__dirname, "test.txt"), "data")
//   .then(() => appendFileAsync(path.resolve(__dirname, "test.txt"), "123"))
//   .then(() => appendFileAsync(path.resolve(__dirname, "test.txt"), "456"))
//   .then(() => appendFileAsync(path.resolve(__dirname, "test.txt"), "789"))
//   .then(() => readFileAsync(path.resolve(__dirname, "test.txt")))
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// const http = require("http");
// var express = require("express");
// var app = express();

// const cors = require("cors");

// const PORT = process.env.PORT || 5000;

// const server = http.createServer((req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });

//   const url = new URL("http://localhost:5000" + req.url);
//   let data1 = "";
//   console.log(url);
//   if (req.url === "/specialties") {
//     fs.readFile(
//       "./lessons/speciality3.txt",
//       { encoding: "utf8" },
//       async (err, data) => {
//         if (err) {
//           console.error(err);
//           return;
//         } else {
//           data1 = data;
//         }
//       }
//     );
//     console.log(data1);
//     res.write(data1);
//     return res.end();
//     //JSON.stringify([{ id: 1, name: "Dfssdf" }]));
//   }
//   if (req.url === "/posts") {
//     return res.end("POSTS");
//   }

//   res.end(req.url);
// });

// server.listen(PORT, () => console.log("Server started"));

var express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

var app = express();
const router = new express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/specialties", function (req, res) {
  let data1 = "";
  fs.readFile(
    "./lessons/speciality2.txt",
    { encoding: "utf8" },
    async (err, data) => {
      if (err) {
        console.error(err);
        return;
      } else {
        data1 = data;
        // console.log(data1);
        res.send(data1.split("\r\n"));
      }
    }
  );
});

app.post("/specialties/:name", function (req, res) {
  const { name } = req.body;
  console.log(name);
  fs.readFile(
    `./lessons/universityJSON/${name.id.split(",")[0]}.json`,
    (err, data) => {
      if (err) {
        console.log(err);
        return console.log(err);
      }
      let university = JSON.parse(data);
      res.send(university);
    }
  );
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
