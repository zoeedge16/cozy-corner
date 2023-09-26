const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');


const userPreferencesSchema = new Schema ({
    // should I make this unique or not unique?
    _id: {
        type: String,
        required: true,
        unique: true
    },
    favoriteGenres: {
        type: String,
        required: true
    }
});

const UserPreferences = model('UserPreferences', userPreferencesSchema);

module.exports = UserPreferences;
