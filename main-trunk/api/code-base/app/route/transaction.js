'use strict';

const middleware = require('./middleware');
const _ctrl = require('../controller/transaction');
const route = '/transaction';

module.exports = (app) => {
    // Create transaction
    app.post(route, middleware.checkToken, _ctrl.create);

    // Retrieve all transactions
    app.get(route + 's', middleware.checkToken, _ctrl.findAll);

    // Retrieve all transaction by user id
    app.get(route + 's/:id', middleware.checkToken, _ctrl.findAll);

    // Retrieve all transaction by status
    app.get(route + 's/:status', middleware.checkToken, _ctrl.findAllByStatus);

    // Retrieve single transaction with id
    app.get(route + '/:id', middleware.checkToken, _ctrl.findOne);

    // Update transaction by id
    app.put(route + '/:id', middleware.checkToken, _ctrl.update);

    // Delete transaction by id
    app.delete(route + '/:id', middleware.checkToken, _ctrl.delete);
};