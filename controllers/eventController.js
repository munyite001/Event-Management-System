//  Get event Model
const Event = require("../models/event");


const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


exports.index = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: Site Home Page")
})

// Display list of all events.
exports.event_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: event list")
})

// Display detail page for a specific event.
exports.event_detail = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: event detail")
})

// Display event create form on GET.
exports.event_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: event create get")
})

// Handle event create on POST.
exports.event_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: event create post")
})

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

