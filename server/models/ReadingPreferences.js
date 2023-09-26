const { Schema, model } = require('mongoose');

const readingPreferences = new Schema ({
    // the _id section could be taken out here
    _id: {
        type: String,
        required: true,
        unique: true
    },
    booksAYear: {
        type: Number,
        required: true
    },
    daysAWeek: {
        type: Number,
        required: true
    },
    dayToRead: {
        type: Text,
        required: true
    },
    hoursToRead: {
        type: Number,
        required: true
    },
    pagesToRead: {
        type: Number,
        required: false
    },
    chaptersToRead: {
        type: Number,
        required: false
    }
});

const ReadingPreferences = model('ReadingPreferences', readingPreferences);

module.exports = ReadingPreferences