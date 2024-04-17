const express = require("express");
const app = express();
const urlencodedParser = express.urlencoded({ extended: false });
app.set("view engine", "hbs");
const mylist = [];
let totalPrice = 0;
app.get("/", function (_, response) {
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