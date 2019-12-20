export interface IUser{
	_id: string,
  	name: string,
	description: string,
	emailId: string,
	password: String,
	bitcoinWalletId: string,
	bitcoinWalletBalance: number,
	ethereumWalletId: string,
	ethereumWalletBalance: number,
	maxAmountAllowed: number,
	isActive: Boolean,
  	createdBy: string,
	createdAt: Date,
  	updatedBy: string,
	updatedAt: Date
};