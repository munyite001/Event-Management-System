#!/usr/bin/env node

console.log("This script populates some test events, venues, organizers, and participants into your database. Specified database as argument - e.g.: node populatedb 'mongodb://localhost:27017/ems'");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Event = require("./models/event");
const Venue = require("./models/venue");
const Organizer = require("./models/organizer");
const Participant = require("./models/participant");

const events = [];
const venues = [];
const organizers = [];
const participants = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createVenues();
    await createOrganizers();
    await createParticipants();
    await createEvents();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// venue[0] will always be the Moi Stadium venue, regardless of the order
// in which the elements of promise.all's argument complete.

async function venueCreate(index, name, address, capacity) {
    const venue = new Venue({ name: name, address: address, capacity: capacity });
    await venue.save();
    venues[index] = venue;
    console.log(`Added venue: ${name}`);
}

async function organizerCreate(index, name, email, phone) {
    const organizer = new Organizer({ name: name, email: email, phone: phone });
    await organizer.save();
    organizers[index] = organizer;
    console.log(`Added organizer: ${name}`);
}

async function eventCreate(index, title, description, date, time, venue, organizer, participants) {
    const event = new Event({ title: title, description: description, date: date, time: time, venue: venue, organizer: organizer, participants: participants });
    await event.save();
    events[index] = event;
    console.log(`Added event: ${title}`);
}

async function participantCreate(index, name, email, phone) {
    const participant = new Participant({ name: name, email: email, phone: phone });
    await participant.save();
    participants[index] = participant;
    console.log(`Added participant: ${name}`);
}

async function createVenues() {
    console.log("Adding Venues. . .");
    await Promise.all([
        venueCreate(0, "Moi Stadium", "Mombasa", 2000),
        venueCreate(1, "Kasarani Stadium", "Nairobi", 5000),
        venueCreate(2, "Nyayo Stadium", "Nairobi", 3000),
        venueCreate(3, "Kenyatta Stadium", "Machakos", 1500),
        venueCreate(4, "Kipchoge Stadium", "Eldoret", 2500),
        venueCreate(5, "Kenyatta Stadium", "Kisumu", 1500),
        venueCreate(6, "Bukhungu Stadium", "Kakamega", 2500),
        venueCreate(7, "Machakos Stadium", "Machakos", 3000),
        venueCreate(8, "Afraha Stadium", "Nakuru", 2000),
        venueCreate(9, "Kisii Stadium", "Kisii", 1500)
    ]);
}

async function createOrganizers() {
    console.log("Adding Organizers. . .");
    await Promise.all([
        organizerCreate(0, "John Doe", "john@example.com", 123-456-7890),
        organizerCreate(1, "Jane Smith", "jane@example.com", 123-456-7891),
        organizerCreate(2, "Alice Johnson", "alice@example.com", 123-456-7892),
        organizerCreate(3, "Bob Brown", "bob@example.com", 123-456-7893),
        organizerCreate(4, "Charlie Davis", "charlie@example.com", 123-456-7894),
        organizerCreate(5, "Dana Wilson", "dana@example.com", 123-456-7895),
        organizerCreate(6, "Evan Lee", "evan@example.com", 123-456-7896),
        organizerCreate(7, "Fiona Green", "fiona@example.com", 123-456-7897),
        organizerCreate(8, "George Hall", "george@example.com", 123-456-7898),
        organizerCreate(9, "Hannah King", "hannah@example.com", 123-456-7899)
    ]);
}

async function createParticipants() {
    console.log("Adding Participants. . .");
    await Promise.all([
        participantCreate(0, "Liam Miller", "liam.miller@example.com", 123-456-7800),
        participantCreate(1, "Emma Garcia", "emma.garcia@example.com", 123-456-7801),
        participantCreate(2, "Noah Martinez", "noah.martinez@example.com", 123-456-7802),
        participantCreate(3, "Olivia Robinson", "olivia.robinson@example.com", 123-456-7803),
        participantCreate(4, "William Hernandez", "william.hernandez@example.com", 123-456-7804),
        participantCreate(5, "Sophia Gonzalez", "sophia.gonzalez@example.com", 123-456-7805),
        participantCreate(6, "James Lopez", "james.lopez@example.com", 123-456-7806),
        participantCreate(7, "Isabella Wilson", "isabella.wilson@example.com", 123-456-7807),
        participantCreate(8, "Benjamin Anderson", "benjamin.anderson@example.com", 123-456-7808),
        participantCreate(9, "Mia Thomas", "mia.thomas@example.com", 123-456-7809),
        participantCreate(10, "Lucas Scott", "lucas.scott@example.com", 123-456-7810),
        participantCreate(11, "Ella Harris", "ella.harris@example.com", 123-456-7811),
        participantCreate(12, "Ethan Clark", "ethan.clark@example.com", 123-456-7812)
    ]);
}

async function createEvents() {
    console.log("Adding Events. . .");
    await Promise.all([
        eventCreate(0, "Tech Conference 2024", "A conference about the latest in technology", "2024-06-15", "10:00 AM", venues[0], organizers[0], [participants[0], participants[1]]),
        eventCreate(1, "Art Expo 2024", "Exhibition showcasing contemporary art.", "2024-07-22", "11:00 AM", venues[1], organizers[1], [participants[2], participants[3]]),
        eventCreate(2, "Music Festival 2024", "Live music festival with various artists.", "2024-08-05", "02:00 PM", venues[2], organizers[2], [participants[4], participants[5]]),
        eventCreate(3, "Startup Pitch 2024", "Event for startups to pitch their ideas to investors.", "2024-09-12", "09:00 AM", venues[3], organizers[3], [participants[6], participants[7]]),
        eventCreate(4, "Book Fair 2024", "Annual book fair with author signings and talks.", "2024-10-18", "10:00 AM", venues[4], organizers[4], [participants[8], participants[9]]),
        eventCreate(5, "Health & Wellness Expo", "Expo focused on health and wellness products.", "2024-11-07", "10:00 AM", venues[5], organizers[5], [participants[10], participants[11]]),
        eventCreate(6, "Food Festival 2024", "A celebration of culinary arts and food.", "2024-12-15", "12:00 PM", venues[6], organizers[6], [participants[0], participants[2], participants[4]]),
        eventCreate(7, "Science Fair 2024", "Showcasing scientific projects and experiments.", "2024-01-25", "09:00 AM", venues[7], organizers[7], [participants[1], participants[3], participants[5]]),
        eventCreate(8, "Literature Festival 2024", "Literary discussions and book launches.", "2024-03-10", "01:00 PM", venues[8], organizers[8], [participants[6], participants[8], participants[10]]),
        eventCreate(9, "Gaming Expo 2024", "Expo featuring the latest in gaming.", "2024-05-18", "11:00 AM", venues[9], organizers[9], [participants[7], participants[9], participants[11]]),
    ]);
}
