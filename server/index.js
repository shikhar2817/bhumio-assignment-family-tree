const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Family = require("./models/family");
require("dotenv/config");

const express = require("express");
const app = express();
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    Family.find().exec((err, data) => {
        if (err) {
            return res
                .status(408)
                .json({ success: false, message: "can't get data" });
        }
        res.status(200).json(data[0]);
    });
});

app.post("/", async (req, res) => {
    try {
        const { data, id } = req.body;
        // let updatedFamily = new Family({ data, id });
        // const returnedData = await updatedFamily.save();

        const returnedData = Family.findOneAndUpdate(
            { id: id },
            { data: data },
            null,
            function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Updated : ", docs);
                    res.status(200).json({ success: true, data: data });
                }
            }
        );
    } catch (err) {
        res.status(409).json({ success: false, message: err });
    }
});

// mongooseDB connection
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error) {
        if (error) {
            console.log("Error: " + error);
        } else {
            console.log("Connected to DB Successfully");
        }
    }
);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
