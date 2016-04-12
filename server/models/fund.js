var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fundSchema = new schema({
	name: {type: String},
	symbol: {type: String},
	price: Number,
	assetClass: {type: String},
	beta: {type: String},
	expenseRatio: {type: String},
	loadType: {type:String, enum: ['front-end', 'back-end']},
	riskBracket: Number,
	riskPotential: Number
})

module.exports = mongoose.model('Fund', fundSchema);
