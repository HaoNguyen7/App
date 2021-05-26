const { modelNames } = require('mongoose');
const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const authRouter = require('./auth')
const { requireAuth, checkUser } = require('../app/middlewares/authMiddleware');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me',meRouter);
    app.use('/courses',coursesRouter);
    app.use('/auth',authRouter);
    app.get('*', checkUser);
    app.use('/', siteRouter);
}

module.exports = route;
