const express = require("express");
const paginate = require('jw-paginate');
const router = express.Router();
const Superhero = require("./superhero");
const fs = require('fs');

router.get("/ViewHeroes", async (req, res) => {
    try {
        const items = await Superhero.find({})
        const page = parseInt(req.query.page) || 1;
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        return res.json({ pager, pageOfItems });
    } catch (err) {
        res.send(err)
    }
})

router.get("/superheroes", async (req, res) => {
    try {
        const superhero = await Superhero.find({})
        res.send(superhero)
    } catch (err) {
        res.send(err)
    }
});
router.post("/upload", async (req, res) => {
    const Hero = req.body;
    if (req.file) {
        Hero.filename = req.file.filename
    }
    try {
        const superhero = await Superhero.create(Hero)
        res.send(superhero)
    } catch (err) {
        res.send(err)
    }
});

router.put("/upload/:id", async (req, res) => {
    const Hero = req.body;
    if (req.file) {
        Hero.filename = req.file.filename;
        try {
            const superhero = await Superhero.findById({ _id: req.params.id })
            fs.unlink(`./uploads/${superhero.filename}`)
        } catch (err) {

            res.send(err)
        }
    }
    try {
        await Superhero.findByIdAndUpdate({ _id: req.params.id }, Hero);
        const superhero = await Superhero.findOne({ _id: req.params.id });
        res.send(superhero)
    } catch (err) {
        res.send(err)
    }
});

router.delete("/upload/:id", async (req, res) => {

    try {
        fs.unlink(`./uploads/${req.body.filename}`)
    } catch (err) {
        res.send(err)
    }
    try {
        const superhero = await Superhero.deleteOne({ _id: req.params.id })
        res.send(superhero)
    } catch (err) {
        res.send(err)
    }
});

module.exports = router;