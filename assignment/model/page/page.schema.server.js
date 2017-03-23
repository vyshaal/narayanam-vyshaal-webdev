/**
 * Created by vyshaalnarayanam on 3/19/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentWebsite'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentWidget'}],
        dateCreated: {type: Date, default: Date.now},
        lastUpdated: {type: Date, default: Date.now}
    }, {collection: 'assignment.page'});

    return PageSchema;
};