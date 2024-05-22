//  Event Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    venue: {type: Schema.Types.ObjectId, ref: 'Venue', required: true},
    organizer: {type: Schema.Types.ObjectId, ref: 'Organizer', required: true},
    participants: [{type: Schema.Types.ObjectId, ref: 'Participant'}],
})

// Virtual for event's URL
EventSchema.virtual('url').get(function () {
    return `/catalog/event/${this._id}`;
})

// Export model
module.exports = mongoose.model('Event', EventSchema)