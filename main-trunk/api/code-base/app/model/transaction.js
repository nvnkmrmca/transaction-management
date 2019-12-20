const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TransactionSchema = mongoose.Schema({
	currencyAmount: Number,
	currencyType: String,
	sourceUserId: Schema.Types.ObjectId,
	targetUserId: Schema.Types.ObjectId,
	processedAt: Date,
	state: String,
	isActive: Boolean,
	createdBy: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null }
}, {
	timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);