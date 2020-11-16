const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const words = require('./Words');
const { stringify } = require('querystring');


//init middleware
// app.use(logger());

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage
app.get('/', (req, res) => res.render('index', {
    title: "Spanish Flashcard App",
    words,
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/words', require('./routes/api/words'));


const port = 5000;

app.listen(port, () => {
    console.log('server started on port' + port)
})