const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
	name: { type: Schema.Types.String, maxLength: 512 },
	description: { type: Schema.Types.String, maxLength: 1000 },
	emailId: { type: Schema.Types.String, maxLength: 1000 },
	password: String,
	bitcoinWalletId: { type: Schema.Types.String, maxLength: 34, default: null },
	bitcoinWalletBalance: { type: Schema.Types.Number, maxLength: 1000000000, default: null },
	ethereumWalletId: { type: Schema.Types.String, maxLength: 40, default: null },
	ethereumWalletBalance: { type: Schema.Types.Number, maxLength: 1000000000, default: null },
	maxAmountAllowed: { type: Schema.Types.Number, default: null },
	isActive: Boolean,
	createdBy: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null }
}, {
	timestamps: true
});

module.exports = mongoose.model('User', UserSchema);