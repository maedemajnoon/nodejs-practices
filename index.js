//File System:
const fs = require("fs");

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
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Hello Node JS!");
  //console.log(res);
  //console.log(req);
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000...");
});
