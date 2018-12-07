const express = require('express');
const app = express();
const port = process.env.PORT || 8094;
const bodyParser = require('body-parser');


const cors = require('cors');

const routes = require('./routes/posts');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


let Routes = new routes(app);
Routes.setup();

app.listen(port);
console.log('The magic happens on port ' + port);