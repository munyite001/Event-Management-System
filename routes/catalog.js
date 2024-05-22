const express = require("express")
const router = express.Router()

// Require controller modules.
const event_controller = require("../controllers/eventController")
const participant_controller = require("../controllers/participantController")
const organizer_controller = require("../controllers/organizerController")
const venue_controller = require("../controllers/venueController")

/// EVENT ROUTES ///

//  Get Catalog Home Page  //
router.get("/", event_controller.index)

// GET request for creating Event. NOTE This must come before route that displays Event (uses id).
router.get("/event/create", event_controller.event_create_get)

// POST request for creating Event.
router.post("/event/create", event_controller.event_create_post)

// GET request to delete Event.
router.get("/event/:id/delete", event_controller.event_delete_get)

// POST request to delete Event.
router.post("/event/:id/delete", event_controller.event_delete_post)

// GET request to update Event.
router.get("/event/:id/update", event_controller.event_update_get)

// POST request to update Event.
router.post("/event/:id/update", event_controller.event_update_post)

// GET request for one Event.
router.get("/event/:id", event_controller.event_detail)

// GET request for list of all Event items.
router.get("/events", event_controller.event_list)



/// PARTICIPANT ROUTES ///
// GET request for creating Participant. NOTE This must come before route that displays Participant (uses id).
router.get("/participant/create", participant_controller.participant_create_get)

// POST request for creating Participant.
router.post("/participant/create", participant_controller.participant_create_post)

// GET request to delete Participant.
router.get("/participant/:id/delete", participant_controller.participant_delete_get)

// POST request to delete Participant.
router.post("/participant/:id/delete", participant_controller.participant_delete_post)

// GET request to update Participant.
router.get("/participant/:id/update", participant_controller.participant_update_get)

// POST request to update Participant.
router.post("/participant/:id/update", participant_controller.participant_update_post)

// GET request for one Participant.
router.get("/participant/:id", participant_controller.participant_detail)

// GET request for list of all Participant items.
router.get("/participants", participant_controller.participant_list)




/// ORGANIZER ROUTES ///

// GET request for creating Organizer. NOTE This must come before route that displays Organizer (uses id).
router.get("/organizer/create", organizer_controller.organizer_create_get)

// POST request for creating Organizer.
router.post("/organizer/create", organizer_controller.organizer_create_post)

// GET request to delete Organizer.
router.get("/organizer/:id/delete", organizer_controller.organizer_delete_get)

// POST request to delete Organizer.
router.post("/organizer/:id/delete", organizer_controller.organizer_delete_post)

// GET request to update Organizer.
router.get("/organizer/:id/update", organizer_controller.organizer_update_get)

// POST request to update Organizer.
router.post("/organizer/:id/update", organizer_controller.organizer_update_post)

// GET request for one Organizer.
router.get("/organizer/:id", organizer_controller.organizer_detail)

// GET request for list of all Organizer items.
router.get("/organizers", organizer_controller.organizer_list)



/// VENUE ROUTES ///

// GET request for creating Venue. NOTE This must come before route that displays Venue (uses id).
router.get("/venue/create", venue_controller.venue_create_get)

// POST request for creating Venue.
router.post("/venue/create", venue_controller.venue_create_post)

// GET request to delete Venue.
router.get("/venue/:id/delete", venue_controller.venue_delete_get)

// POST request to delete Venue.
router.post("/venue/:id/delete", venue_controller.venue_delete_post)

// GET request to update Venue.
router.get("/venue/:id/update", venue_controller.venue_update_get)

// POST request to update Venue.
router.post("/venue/:id/update", venue_controller.venue_update_post)

// GET request for one Venue.
router.get("/venue/:id", venue_controller.venue_detail)

// GET request for list of all Venue items.
router.get("/venues", venue_controller.venue_list)

module.exports = router
