/**
 * Created by vyshaalnarayanam on 3/19/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentWebsite'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'assignment.user'});

    return userSchema;
};