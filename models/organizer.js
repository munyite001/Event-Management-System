const mongoose = require("mongoose")

const Schema = mongoose.Schema

const OrganizerSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true}
})

//  Virtual for organizer's url
OrganizerSchema.virtual('url').get(function () {
    return `/catalog/organizer/${this._id}`;
})

module.exports = mongoose.model("Organizer", OrganizerSchema);