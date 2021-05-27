const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

exports.saveUser = function (inMail, inPassword) {
    var user = new User({
        email: inMail,
        password: inPassword,
    });

    user.save();
};

exports.getUser = async function (uEmail) {
    return await User.findOne({ email: uEmail });
};

exports.getAllUser = async function () {
    return await User.find({});
};