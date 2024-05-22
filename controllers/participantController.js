//  Import the participant model
const Participant = require('../models/participant');

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

// Display list of all participants.
exports.participant_list = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: participant list');
})

// Display detail page for a specific participant.
exports.participant_detail = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: participant detail');
})

// Display participant create form on GET.
exports.participant_create_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: participant create get');
})

// Handle participant create on POST.
exports.participant_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: participant create post');
})

// Display participant delete form on GET.
exports.participant_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: participant delete get');
})

// Handle participant delete on POST.
exports.participant_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: participant delete post');
})

// Display participant update form on GET.
exports.participant_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: participant update get');
})

// Handle participant update on POST.
exports.participant_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: participant update post');
})

