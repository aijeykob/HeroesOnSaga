const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(cors());

const multer = require("multer");

mongoose.connect("mongodb://localhost/superheroes-db", { useNewUrlParser: true });

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(express.static(__dirname));
app.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("heroImage"));
app.use(bodyParser.json());
app.use("/api", require("./api"));


const port = 4000;
app.listen(port, () => console.log('Server listening on port ' + port));