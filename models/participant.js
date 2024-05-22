const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ParticipantSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true}
})

//  Virtual for organizer's url
ParticipantSchema.virtual('url').get(function () {
    return `/catalog/participant/${this._id}`;
})

module.exports = mongoose.model("Participant", ParticipantSchema);