//  Import Organizer model
const Organizer = require("../models/organizer");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all organizers.
exports.organizer_list = asyncHandler(async (req, res, next) => {
    res.render("organizers_list", { title: "Organizers" })
})

// Display detail page for a specific organizer.
exports.organizer_detail = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: organizer detail");
})

// Display organizer create form on GET.
exports.organizer_create_get = asyncHandler(async (req, res, next) => {
    res.render("organizer_form", {
        title: "Organizers",
        subTitle: "Add New Organizer "
    })
})

// Handle organizer create on POST.
exports.organizer_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: organizer create post");
})

// Display organizer delete form on GET.
exports.organizer_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: organizer delete get");
})

// Handle organizer delete on POST.
exports.organizer_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: organizer delete post");
})

// Display organizer update form on GET.
exports.organizer_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: organizer update get");
})

// Handle organizer update on POST.
exports.organizer_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented: organizer update post");
})