const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {

    res.render("index", {

        title: "Jenkins Deployment",

        message: "Application deployed successfully using Jenkins + PM2"

    });

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Application running on port ${PORT}`);

});
