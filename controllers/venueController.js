//  Import the venue model
const Venue = require('../models/venue');

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

// Display list of all venues.
exports.venue_list = asyncHandler(async (req, res, next) => {
    const allVenues = await Venue.find({}).sort({name: 1}).exec()

    res.render("venues_list", {
        title: "Venues",
        subTitle: "List of all Venues",
        venues: allVenues

    })
})

// Display detail page for a specific venue.
exports.venue_detail = asyncHandler(async (req, res, next) => {
    const venue = await Venue.findById(req.params.id).exec()

    res.render("venue_detail", {
        title: "Venues",
        venue: venue
    
    })
})

// Display venue create form on GET.
exports.venue_create_get = asyncHandler(async (req, res, next) => {
    res.render("venue_form", {
        title: "Venues",
        subTitle: "Add new Venue"
    })
})

// Handle venue create on POST.
exports.venue_create_post = [
    //  Validate and sanitize the input fields
    body("name")
    .trim()
    .isLength({min: 1})
    .withMessage("Venue name cannot be empty")
    .escape(),
    body("address")
    .trim()
    .isLength({min: 1})
    .withMessage("Venue address cannot be empty")
    .escape(),
    body("capacity")
    .trim()
    .isLength({min: 1})
    .withMessage("Venue capacity cannot be empty")
    .isNumeric()
    .withMessage("Venue capacity must be a number")
    .escape(),

    //  Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request
        const errors = validationResult(req);

        // Create a new venue object with escaped and trimmed data
        const venue = new Venue({
            name: req.body.name,
            address: req.body.address,
            capacity: req.body.capacity
        })

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages
            res.render("venue_form", {
                title: "Venues",
                subTitle: "Add new Venue",
                venue: venue,
                errors: errors.array()
            })
            return
        } else {
            // Data from form is valid. Save the venue
            await venue.save()
            res.redirect(venue.url)
        }
    }),
]

// Display venue delete form on GET.
exports.venue_delete_get = asyncHandler(async (req, res, next) => {
    const venue = await Venue.findById(req.params.id).exec()

    if (venue == null) {
        const err = new Error("Venue not found");
        err.status = 404;
        return next(err);
    }

    res.render("venue_delete", {
        title: "Venues",
        subTitle: "Delete Venue",
        venue: venue
    })
})

// Handle venue delete on POST.
exports.venue_delete_post = asyncHandler(async (req, res, next) => {
    const venue = await Venue.findById(req.params.id).exec()

    if (venue == null) {
        const err = new Error("Venue not found");
        err.status = 404;
        return next(err);
    }

    // Delete the venue
    await Venue.findByIdAndDelete(req.body.venueid)
    res.redirect("/catalog/venues")
})

// Display venue update form on GET.
exports.venue_update_get = asyncHandler(async (req, res, next) => {
    const venue = await Venue.findById(req.params.id).exec()

    if (venue == null) {
        const err = new Error("Venue not found")
        err.status = 404
        return next(err)
    }

    res.render("venue_form", {
        title: "Venues",
        subTitle: "Update Venue",
        venue: venue
    });
})

// Handle venue update on POST.
exports.venue_update_post = [
    //  Sanitize and validate the input fields
    body("name")
    .trim()
    .isLength({min: 1})
    .withMessage("Venue name cannot be empty")
    .escape(),
    body("address")
    .trim()
    .isLength({min: 1})
    .withMessage("Venue address cannot be empty")
    .escape(),
    body("capacity")
    .trim()
    .isLength({min: 1})
    .withMessage("Venue capacity cannot be empty")
    .isNumeric()
    .withMessage("Venue capacity must be a number")
    .escape(),

    //  Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        //  Extract the validation errors from a request
        const errors = validationResult(req);

        // Create a new venue object with escaped and trimmed data
        const venue = new Venue({
            name: req.body.name,
            address: req.body.address,
            capacity: req.body.capacity,
            _id: req.params.id
        })

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages
            res.render("venue_form", {
                title: "Venues",
                subTitle: "Update Venue",
                venue: venue,
                errors: errors.array()
            })
            return
        } else {
            // Data from form is valid. Update the record
            await Venue.findByIdAndUpdate(req.params.id, venue, {})
            res.redirect(venue.url)
        }
    })

]
