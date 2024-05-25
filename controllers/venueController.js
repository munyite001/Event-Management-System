//  Import the venue model
const Venue = require('../models/venue');

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

// Display list of all venues.
exports.venue_list = asyncHandler(async (req, res, next) => {
    res.render("venues_list", {title: "Venues"})
})

// Display detail page for a specific venue.
exports.venue_detail = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: venue detail');
})

// Display venue create form on GET.
exports.venue_create_get = asyncHandler(async (req, res, next) => {
    res.render("venue_form", {
        title: "Venues",
        subTitle: "Add new Venue"
    })
})

// Handle venue create on POST.
exports.venue_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: venue create post');
})

// Display venue delete form on GET.
exports.venue_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: venue delete get');
})

// Handle venue delete on POST.
exports.venue_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: venue delete post');
})

// Display venue update form on GET.
exports.venue_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: venue update get');
})

// Handle venue update on POST.
exports.venue_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: venue update post');
})  
