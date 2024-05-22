const mongoose = require("mongoose")

const Schema = mongoose.Schema

const VenueSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    capacity: {type: Number, required: true},
})

// Virtual for venue's URL
VenueSchema.virtual('url').get(function () {
    return `/catalog/venue/${this._id}`;
})

//  Export model
module.exports = mongoose.model("Venue", VenueSchema)
