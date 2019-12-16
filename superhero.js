const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuperheroSchema = new Schema({
    nickname: String,
    real_name: String,
    origin_description: String,
    superpowers: String,
    catch_phrase: String,
    filename: String
});
const Superhero = mongoose.model("heroes", SuperheroSchema);

module.exports = Superhero;
