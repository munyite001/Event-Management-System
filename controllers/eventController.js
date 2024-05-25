//  Get event Model
const Event = require("../models/event");
const Venue = require("../models/venue");
const Organizer = require("../models/organizer");
const Participant = require("../models/participant");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const venue = require("../models/venue");


exports.index = asyncHandler(async (req, res, next) => {

    const [
        numEvents,
        numVenues,
        numOrganizers,
        numParticipants
    ] = await Promise.all([
        Event.countDocuments({}).exec(),
        Venue.countDocuments({}).exec(),
        Organizer.countDocuments({}).exec(),
        Participant.countDocuments({}).exec(),
    ])
    
    res.render("index", {
        title: "Home",
        event_count: numEvents,
        venue_count: numVenues,
        organizer_count: numOrganizers,
        participant_count: numParticipants
    })
})

// Display list of all events.
exports.event_list = asyncHandler(async (req, res, next) => {
    const allEvents = await Event.find({}, "title date").sort({title :1}).exec()

    
    res.render("events_list", 
    { 
        title: "Events",
        event_list: allEvents
    })
})

// Display detail page for a specific event.
exports.event_detail = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id).populate("venue").populate("organizer").populate("participants").exec()

    if (event == null) {
        const err = new Error("Event not found");
        err.status = 404;
        return next(err);
    }

    res.render("event_detail", {
        title: "Events",
        event: event
    })
})

// Display event create form on GET.
exports.event_create_get = asyncHandler(async (req, res, next) => {
    const [allVenues, allOrganizers, allParticipants] = await Promise.all([
        Venue.find({}).sort({title: 1}).exec(),
        Organizer.find({}).sort({name: 1}).exec(),
        Participant.find({}).sort({name: 1}).exec()
    ])
    
    res.render("event_form", {
        title: "Events",
        subTitle: "Create New Event",
        venues: allVenues,
        organizers: allOrganizers,
        participants: allParticipants
    })
})

// Handle event create on POST.
exports.event_create_post = [
    // Validate and sanitize fields
    body("title")
    .trim()
    .isLength({min: 3})
    .withMessage("Title should be atleast 3 letters")
    .escape(),
    body("description")
    .trim()
    .isLength({min: 3})
    .withMessage("Description should be at least 3 letters long")
    .escape(),
    body("date", "Invalid date").optional({checkFalsy: true}).isISO8601().toDate(),
    body("time", "Invalid time"),
    body("venue", "Venue must not be empty").trim().isLength({min: 1}).escape(),
    body("organizer", "Organizer must not be empty").trim().isLength({min: 1}).escape(),
    body("participants", "Participants must not be empty").trim().isLength({min: 1}).escape(),

    // Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request
        const errors = validationResult(req);

        // Create a Event object with escaped and trimmed data
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            venue: req.body.venue,
            organizer: req.body.organizer,
            participants: req.body.participants
        })

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages
            const [allVenues, allOrganizers, allParticipants] = await Promise.all([
                Venue.find({}).sort({title: 1}).exec(),
                Organizer.find({}).sort({name: 1}).exec(),
                Participant.find({}).sort({name: 1}).exec()
            ])

            res.render("event_form", {
                title: "Events",
                subTitle: "Create New Event",
                venues: allVenues,
                organizers: allOrganizers,
                participants: allParticipants,
                event: event,
                errors: errors.array()
            })
            return
        } else {
            // Data from form is valid. Save event
            await event.save()
            res.redirect(event.url)
        }
    })

]

// Display event delete form on GET.
exports.event_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: event delete get")
})

// Handle event delete on POST.
exports.event_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: event delete post")
})

// Display event update form on GET.
exports.event_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: event update get")
})

// Handle event update on POST.
exports.event_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: event update post")
})

