"use strict";

const mongoose = require('mongoose');
const Transaction = require('../model/transaction');
const util = require("../util/index");
const _res = require("../util/response");

// create and Save a new record
exports.create = (req, res) => {
    // validate request
    if(!req.body.currencyAmount || !req.body.currencyType || !req.body.sourceUserId || !req.body.targetUserId){
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }
    // create and save new user
    new Transaction({
        currencyAmount: req.body.currencyAmount,
        currencyType: req.body.currencyType,
        sourceUserId: req.body.sourceUserId,
        targetUserId: req.body.targetUserId,
        state: 'SUCCESS',
        isActive: true
    }).save().then(result => {
        if(!result || !result._id){
            return _res.cError(res, 'Transaction not created. Some problem occurs.');
        }


    //     let query = {

    //     };
    //     if(req.body.currencyType === 'BITCOIN'){
    //         bitcoinWalletBalance: 
    //     }
    //     // Transfer 
    // User.findByIdAndUpdate(req.body.sourceUserId, {
    //     bitcoinWalletId: req.body.bitcoinWalletId,
    //     bitcoinWalletBalance: req.body.bitcoinWalletBalance,
    //     ethereumWalletId: req.body.ethereumWalletId,
    //     ethereumWalletBalance : req.body.ethereumWalletBalance,
    //     maxAmountAllowed: req.body.maxAmountAllowed
    // }, {new: true})
    // .then(result => {
    //     if(!result || !result._id){
    //         return _res.cError(res, 'Error updating record with id ' + req.params.id);
    //     }
    //     return _res.success(res, result._id);
    // }).catch(err => {
    //     if(err.kind === 'ObjectId') {
    //         return _res.nError(res, 'Record not found with id ' + req.params.id);
    //     }
    //     return _res.error(res, 'Internal server error. Error updating record with id ' + req.params.id);
    // });



        return _res.success(res, result._id);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while creating a record.');
    });
};

// retrieve and return all records from the database.
exports.findAll = (req, res) => {
    Transaction.find({
        isActive: true
    }).then(result => {
        return _res.success(res, result);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while retrieving data.');
    });
};

// retrieve and return records by user.
exports.findAllByUser = (req, res) => {
    Transaction.find({
        $and: [
            {
                $or: [
                    {
                        sourceUserId: mongoose.Types.ObjectId(req.params.id),
                        targetUserId: mongoose.Types.ObjectId(req.params.id)
                    }
                ],
                isActive: true
            }
        ]
    }).then(result => {
        return _res.success(res, result);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while retrieving data.');
    });
};

// retrieve and return records by state.
exports.findAllByStatus = (req, res) => {
    Transaction.find({
        state: req.params.status,
        isActive: true
    }).then(result => {
        return _res.success(res, result);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while retrieving data.');
    });
};

// find a single record with an id
exports.findOne = (req, res) => {
    Transaction.findById(req.params.id)
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
    if(!req.body.currencyAmount || !req.body.currencyType || !req.body.sourceUserId || !req.body.targetUserId){
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }
    // find record and update it with the request body
    Transaction.findByIdAndUpdate(req.params.id, {
        currencyAmount: req.body.currencyAmount,
        currencyType: req.body.currencyType,
        sourceUserId: req.body.sourceUserId,
        targetUserId: req.body.targetUserId,
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
    Transaction.findByIdAndUpdate(req.params.id, {
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