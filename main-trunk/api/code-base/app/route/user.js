'use strict';

const middleware = require('./middleware');
const _ctrl = require('../controller/user');
const route = '/user';

module.exports = (app) => {
    // Create User
    app.post(route, _ctrl.create);

    // User login
    app.post(route + '/login', _ctrl.login);

    // Retrieve all users
    app.get(route + 's', middleware.checkToken, _ctrl.findAll);

    // Retrieve user by id
    app.get(route + '/:id', middleware.checkToken, _ctrl.findOne);

    // Update user by id
    app.put(route + '/:id', middleware.checkToken, _ctrl.update);

    // Update Account & currency Info by id
    app.put(route + '/account/:id', middleware.checkToken, _ctrl.updateAccount);

    // Delete User by id
    app.delete(route + '/:id', middleware.checkToken, _ctrl.delete);

    // Search User
    app.get(route + '/search/:text', middleware.checkToken, _ctrl.search);
};