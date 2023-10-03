const { Schema, model } = require('mongoose');

const readingPreferences = new Schema ({
    // the _id section could be taken out here
    _id: {
        type: String,
        required: true,
        unique: true
    },
    totalPages: {
        type: Number,
        required: true,
    },
    daysToRead: {
        type: Number,
        required: true
    },
    dailyPageGoal: {
        type: Number,
        required: true
    }
});

const ReadingPreferences = model('ReadingPreferences', readingPreferences);

module.exports = ReadingPreferences