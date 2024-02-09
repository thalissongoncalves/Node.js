const express = require("express");
const bodyParser = require("body-parser");

const userRoute = require("./routes/userRoute");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false })) // habilitar o recebimento de informações através de formulários.

userRoute(app);

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'));

app.listen(port, () => console.log("API rodando na porta 3000"));