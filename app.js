//------
const express = require("express");
const mysql = require("mysql2");
//------
const app = express();
const urlencodedParser = express.urlencoded({ extended: false });
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "pk32node",
    password: "123456", 
    database: "cars"
});
//----
app.set("view engine", "hbs");
//-----
var mylist = [];
let totalPrice = 0;
//-----
app.get("/", function (_, response) {
    pool.query("SELECT `name`, `price`, `quantity` FROM `list`", function(err, results) {
        if(err) console.log(err);
        console.log(results);
        mylist = results;
        
    });
    response.render("list.hbs", {
        products: mylist,
        total: 0
    });
});
app.post("/", urlencodedParser, function (request, response) {
    mylist.push(request.body.prodName + " " + request.body.prodQuant + " " + request.body.prodPrice);
    totalPrice = totalPrice + request.body.prodQuant*request.body.prodPrice;
    response.render("list.hbs", {
        //products:["молоко","мясо",request.body.prodName+" "+request.body.prodQuant+request.body.prodPrice],
        products: mylist,
        total: totalPrice
    })
    mylist.forEach(element => {
        console.log(element);
    });
});

app.listen(8080);