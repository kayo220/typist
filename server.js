const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log("aqui")
    return res.redirect("http://localhost:3000/typist");
});
///submit-log
app.post('/submit', (req, res) => {
    // return res.redirect("http://localhost:3000/typist");
    console.log("Veaaio",req.body.log)
    return res.redirect("http://localhost:3000/");
});
app.listen(port, () => console.log(`Listening on port ${port}`));