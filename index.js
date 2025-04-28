const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  // query: 'id=0',
  // pathname: '/product'
  //const pathName = req.url;
  const { pathname, query } = url.parse(req.url, true);
  //console.log(req.url);
  //console.log(url.parse(req.url));

  ////OVERVIEW:
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT-CARDS%}/g, cardHtml);
    res.end(output);
  }
  ////PRODUCTS:
  else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    // query: 'id=0',
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    //console.log(query);
    res.end(output);
  }
  ////API:
  else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }
  ////NOT FOUND:
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>NOT FOUND!</h1>");
  }
});
server.listen(3000, "127.0.0.1", () => {
  console.log("Server is runnig on port 8000...");
});
