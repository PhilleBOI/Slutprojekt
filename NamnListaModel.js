const mongoose = require("mongoose");

const namnListaSchema = new mongoose.Schema({
    names: Array,
});

const NamnLista = mongoose.model("NamnLista", namnListaSchema);

exports.saveNameList = function (input) {
    var nameList = NamnLista({
        names: input,
    });

    nameList.save();
};

exports.getAllNameLists = async function () {
    return await NamnLista.find({});
};