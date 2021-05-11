const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const port = 3005;

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
app.use(morgan('combined'));
// template engine
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    return res.render('home');
});
app.get('/news', (req, res) => {
    return res.render('news');
});
app.get('/search', (req, res) => {
    return res.render('search');
});
app.post('/search', (req, res) => {
    return res.render('');
});
app.listen(port, () => {
    console.log(`Server starting at port ${port}`);
});
