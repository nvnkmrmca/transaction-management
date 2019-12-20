'use strict';

module.exports = (app) => {
    require('./heartbeat')(app),
    require('./user')(app),
    require('./transaction')(app)
};