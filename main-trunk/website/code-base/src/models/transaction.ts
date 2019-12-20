export interface ITransaction{
	_id: string,
  	currencyAmount: number,
  	currencyType: string,
  	sourceUserId: string,
  	targetUserId: string,
  	processedAt: Date,
  	state: String,
	isActive: Boolean,
  	createdBy: string,
	createdAt: Date,
  	updatedBy: string,
	updatedAt: Date
};