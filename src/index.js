const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const axios = require('axios');
const app = express();
const port = 3005;

const route = require('./routes');
const db = require('./config/db')

const SortMiddleware = require('./app/middlewares/sortMiddleware')
//connect to database
db.connect()

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(SortMiddleware)
app.use(express.json());
app.use(cookieParser());
// app.use(morgan('combined'));
app.use(methodOverride('_method'))
// template engine
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        helpers: require('./app/helper/handlebars')
    }),
    
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//route  init
route(app);

app.listen(port, () => {
    console.log(`Server starting at port ${port}`);
});
