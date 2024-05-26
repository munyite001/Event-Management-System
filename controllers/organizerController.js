//  Import Organizer model
const Organizer = require("../models/organizer");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

// Display list of all organizers.
exports.organizer_list = asyncHandler(async (req, res, next) => {
    const allOrganizers = await Organizer.find({}, "name email").exec()

    res.render("organizer_list", {
        title: "Organizers",
        subTitle: "List of Organizers",
        organizers: allOrganizers
    })
})

// Display detail page for a specific organizer.
exports.organizer_detail = asyncHandler(async (req, res, next) => {
    const organizer = await Organizer.findById(req.params.id).exec()

    if (organizer === null ) {
        const err = new Error("Organizer not found");
        err.status = 404;
        return next(err);
    }

    res.render("organizer_detail", {
        title: "Organizers",
        organizer: organizer
    })
})

// Display organizer create form on GET.
exports.organizer_create_get = asyncHandler(async (req, res, next) => {

    res.render("organizer_form", {
        title: "Organizers",
        subTitle: "Add New Organizer"
    })
})

// Handle organizer create on POST.
exports.organizer_create_post = [
    //  Validate and sanitize the input fields
    body("name")
    .trim()
    .isLength({min: 3})
    .withMessage("Organizer Name shoudl be atleast 3 characters long")
    .escape(),
    body("email")
    .trim()
    .isLength({min: 1})
    .withMessage("Email should not be empty")
    .escape(),
    body("phone")
    .trim()
    .isLength({min: 10, max: 15})
    .withMessage("Phone number should be between 10 and 15 digits")
    .isNumeric()
    .withMessage("Phone number should be numeric")
    .escape(),

    // Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);


        //  Create a new Organizer object with escaped and trimmed data
        const organizer = new Organizer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })

        //  If there are errors, render the form again with sanitized values/error messages
        if (!errors.isEmpty()) {
            res.render("organizer_form", {
                title: "Organizers",
                subTitle: "Add New Organizer",
                organizer: organizer,
                errors: errors.array()
            })
            return
        } else {
            // Data from form is valid. Save organizer
            await organizer.save()
            res.redirect(organizer.url)
        }
    })

]

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