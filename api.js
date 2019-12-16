const express = require("express");
const paginate = require('jw-paginate');

const router = express.Router();
const Superhero = require("./superhero");
const fs = require('fs');


router.get("/ViewHeroes", (req, res) => {


    Superhero.find({})
        .then(items => {
            const page = parseInt(req.query.page) || 1;
            const pageSize = 5;
            const pager = paginate(items.length, page, pageSize);
            console.log(pager)
            const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
            return res.json({pager, pageOfItems});
        })
})

router.get("/superheroes", (req, res) => {
    Superhero.find({})
        .then(superhero => {
            res.send(superhero)
        })
});

router.post("/upload", function (req, res) {
    const Hero = req.body;
    if (req.file) {
        Hero.filename = req.file.filename

    }
    Superhero.create(Hero)
        .then(superhero => {
            res.send(superhero)
        });

});

router.put("/upload/:id", (req, res) => {

    const Hero = req.body;
    if (req.file) {
        Hero.filename = req.file.filename;
        Superhero.findById({_id: req.params.id}).then(superhero => {
            fs.unlink(`./uploads/${superhero.filename}`, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("File was Delete");
                    }
                }
            )
        })
    }

    Superhero.findByIdAndUpdate({_id: req.params.id}, Hero)
        .then(() => {

                Superhero.findOne({_id: req.params.id})
                    .then(superhero => {
                        res.send(superhero)

                    })
            }
        )
});

router.delete("/upload/:id", (req, res) => {


    fs.unlink(`./uploads/${req.body.filename}`, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("File was Delete");
        }
    });


    console.log(req.body.filename)
    Superhero.deleteOne({_id: req.params.id})
        .then(superhero => {
            res.send(superhero)
        })
});

module.exports = router;

