const express = require("express");
const bcrypt = require("bcryptjs");
const databaseModule = require("./databaseModule");
const NamnListaModel = require("./NamnListaModel");
const UserModel = require("./UserModel");
const app = express();
const port = 3000;
const staticDir = __dirname + "\\static\\";

app.use(express.static(__dirname + "\\static\\"));

app.use(express.urlencoded());
app.use(express.json());

app.set("view engine", "ejs");

const namn = [];

app.get('/DataInfo', (req, res) => res.render("DataInfo.ejs", { users: [] }));

app.get('/', (req, res) => res.render(staticDir + "html/Hem.ejs"))

app.get('/Kontakta', (req, res) => res.render(staticDir + "html\\Kontakta.ejs"));

app.get('/Musik', (req, res) => res.render(staticDir + "html\\Musik.ejs"));

app.get('/Registrera', (req, res) => res.render(staticDir + "html\\Registrera.ejs"));

app.get('/Spel', (req, res) => res.render(staticDir + "html\\Spel.ejs"));

app.get("/users", async (req, res) => {
    const users = await UserModel.getAllUser();
    res.render("DataInfo.ejs", {users: users });
})

app.get("/save", function (req, res) {
    NamnListaModel.saveNameList(namn);

    namn.splice(0, namn.length);
    res.redirect("/");
});

app.post("/", function (req, res) {
    namn.push(req.body.email);
    res.redirect("/");
});

app.post('/Registrera', async function (req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    UserModel.saveUser(req.body.email, hashedPassword);
  res.redirect("/Kontakta");
});

app.post("/login", async function (req, res) {
    const user = await UserModel.getUser(req.body.email);
    await bcrypt.compare(req.body.password, user.password, (err, success) => {
        if(err) {
            console.log(err);
        }

        if(success) console.log("Success");
        else console.log("Fail");
    });
    
    res.redirect("/");
});

app.listen(port, function () {
console.log(`Example app listening on port ${port}!`);
});