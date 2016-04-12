var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Portfolio = require('./portfolio');
var bcrypt = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');
var SALT_WORK_FACTOR = 10;

var userSchema = new schema({
	username: { type: String, required: true, index: {  sparse: true }, unique: true },
  password: { type: String, required: true, index: {  sparse: true }, minLength: 7 },
	firstName: {type: String, lowercase: true, required: true},
	lastName: {type: String, lowercase: true, required: true},
	email: {type: String, lowercase: true, required: true},
	suitabilityScore: Number,
	form: {
		question1: {type: Number, minlength: 1, maxlength: 5},
		question2: {type: Number, minlength: 1, maxlength: 5},
		question3: {type: Number, minlength: 1, maxlength: 5},
		question4: {type: Number, minlength: 1, maxlength: 5},
		question5: {type: Number, minlength: 1, maxlength: 5},
		question6: {type: Number, minlength: 1, maxlength: 5},
		question7: {type: Number, minlength: 1, maxlength: 5},
		question8: {type: Number, minlength: 1, maxlength: 5},
		question9: {type: Number, minlength: 1, maxlength: 5},
		question10: {type: Number, minlength: 1, maxlength: 5}
		},
	portfolio: {type: schema.Types.ObjectId, ref: Portfolio}
})

userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
