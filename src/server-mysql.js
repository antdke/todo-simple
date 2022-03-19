var express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.get("/", function (req, res) {
    res.send("hello from node express"); 
});

app.get("/users", function (req, res) {
    const cn = getSynchConn();
    console.log("get users");
    const rows = cn.query ("SELECT * FROM users");
    res.send(rows);
})
app.get("/todos", function (req, res) {
    const cn = getSynchConn();
    console.log("get todos");
    const rows = cn.query ("SELECT * FROM todos");
    res.send(rows);
})
app.post ("/todo", (req,res)=>{
    console.log(req.body);
    const text = req.body.text;
    const insert = `INSERT INTO todos (text, status) VALUES ('${text}',0)`;
    console.log(insert);
    const cn = getSynchConn();
    cn.query(insert);
    const rows = cn.query ("SELECT * FROM todos");
    //cn=null;
    res.send(rows);
})
const LocalMySQL={
    host: "localhost",
    user: "devuser",
    password: "Dev1234",
    database: "test",
    port: 3306
};
const PORT = 4000;
app.listen(PORT, () => {
    console.log("server listening on ", PORT);
});
function getSynchConn() {
    var MySql = require('sync-mysql');

    var connection = new MySql(LocalMySQL);
    return connection;
}