const fs = require("fs");
const http = require("http");
const url = require("url");

//File System:

// //Blocking/Sync Way:
// //Reading From File:
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// //Writing In File:
// const textOut = `This is a new text: ${textIn} \n Created at: ${Date.now()}`;
// fs.writeFileSync("./txt/writeFile.txt", textOut);

// //Non-blocking/Async Way:
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// console.log("Will be writing...");
// const writeFileSyncText = "This is a test...";
// fs.writeFile("./txt/writeFileAsync.txt", writeFileSyncText, "utf-8", (err) => {
//   console.log("file is ready!");
// });

// //Callback Hell:
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) {
//     return;
//     console.log(err);
//   }
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data1} \n ${data2} \n ${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("The text has been written!");
//         }
//       );
//     });
//   });
// });

//Server:
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  //res.end("Hello Node JS!");
  //console.log(res);
  //console.log(req);
  //console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is an overview.");
  } else if (pathName === "/products") {
    res.end("Products list");
  } else if (pathName === "/api") {
    //1: read the file in the path using fs
    //1.1: parse the data in file using JSON.parse, we'' need it for building our html template
    //2: send back the response as a string
    //2.1: we should tell the browser that we're sending json => res.writeHead
    //NOT 100% EFFICIENT=> each time that someone hits the api route, the file should be read and send back again=> read the file once in the beginning and each time simply send it back without having to read it
    //using async: it's ok that it blocks the execution here because the top-level code only executes once in the beginning.
    //in this situation we use the sync way for file reading because it puts the data in a variable and we can use it right away(easier to handle)
    res.writeHead(200, {
      "content-type": "application-json",
    });
    res.end(data);
  } else {
    //we can add status code to the response by using writeHead method
    //We can also send headers(piece of info about the response) as an object in writeHead method
    //sending header must always be before sending response
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world!",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000...");
});
