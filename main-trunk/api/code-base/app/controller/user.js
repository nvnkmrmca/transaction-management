"use strict";

const jwt = require('jsonwebtoken');
const config = require('../config/index');
const User = require('../model/user');
const _res = require("../util/response");

// validate, verify & login user
exports.login = (req, res) => {
    // validate request
    if(!req.body.emailId || !req.body.password) {
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }
    // verify user
    User.find({
        $and: [
            {
                emailId: req.body.emailId,
                password: req.body.password,
                isActive: true
            }
        ] 
    }).then(result => {
        if(!result || result.length < 1){
            return _res.cError(res, 'User not found.');
        }
        // generate token
        let token = jwt.sign({ username: req.body.emailId },config.secret, { expiresIn: '24h' }); // expires in 24 hours
        return _res.success(res, {
            token: token,
            user: result[0]
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'User not found.');
        }
        return _res.error(res, 'Internal Server Error.');
    });
};

// create and Save a new record
exports.create = (req, res) => {
    // validate request
    if(!req.body.name || !req.body.description || !req.body.emailId || !req.body.password){
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }
    // create and save new user
    new User({
        name: req.body.name,
        description: req.body.description,
        emailId: req.body.emailId,
        password : req.body.password,
        isActive: true
    }).save().then(result => {
        if(!result || !result._id){
            return _res.cError(res, 'User not created. Some problem occurs.');
        }
        return _res.success(res, result._id);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while creating a record.');
    });
};

// retrieve and return all records from the database.
exports.findAll = (req, res) => {
    User.find({
        isActive: true
    }).then(result => {
        return _res.success(res, result);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while retrieving data.');
    });
};

// find a single record with an id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then(result => {
        if(!result) {
            return _res.cError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.success(res, result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.error(res, 'Error retrieving record with id ' + req.params.id);
    });
};

// update a record identified by id in the request
exports.update = (req, res) => {
    // validate request
    if(!req.body.name || !req.body.description || !req.body.emailId || !req.body.password){
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }
    // find record and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        emailId: req.body.emailId,
        password : req.body.password
    }, {new: true})
    .then(result => {
        if(!result || !result._id){
            return _res.cError(res, 'Error updating record with id ' + req.params.id);
        }
        return _res.success(res, result._id);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.error(res, 'Internal server error. Error updating record with id ' + req.params.id);
    });
};

// delete a record with the specified id in the request
exports.delete = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        isActive: false
    }, {new: true})
    .then(result => {
        if(!result || !result._id){
            return _res.cError(res, 'Could not delete record with id ' + req.params.id);
        }
        return _res.success(res, true, 'Record deleted successfully.');
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return _res.nError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.error(res, 'Internal server error. Could not delete record with id ' + req.params.id);
    });
};

// update as account info identified by id in the request
exports.updateAccount = (req, res) => {
    // validate request
    if(!req.body.bitcoinWalletId || !req.body.bitcoinWalletBalance || !req.body.ethereumWalletId || !req.body.ethereumWalletBalance || !req.body.maxAmountAllowed){
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }
    // find record and update account info with the request body
    User.findByIdAndUpdate(req.params.id, {
        bitcoinWalletId: req.body.bitcoinWalletId,
        bitcoinWalletBalance: req.body.bitcoinWalletBalance,
        ethereumWalletId: req.body.ethereumWalletId,
        ethereumWalletBalance : req.body.ethereumWalletBalance,
        maxAmountAllowed: req.body.maxAmountAllowed
    }, {new: true})
    .then(result => {
        if(!result || !result._id){
            return _res.cError(res, 'Error updating record with id ' + req.params.id);
        }
        return _res.success(res, result._id);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.error(res, 'Internal server error. Error updating record with id ' + req.params.id);
    });
};

// search records by text.
exports.search = (req, res) => {
    User.find({
        $and: [
            {
                $or: [
                    {
                        name: new RegExp(req.params.text, 'i'),
                        emailId: new RegExp(req.params.text, 'i')
                    }
                ],
                isActive: true
            }
        ]
    }).then(result => {
        return _res.success(res, result);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while retrieving records.');
    });
};