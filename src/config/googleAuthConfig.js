const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');

// Configure Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in your database
    User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            // Create new user if not found
            user = new UserModel({
                user_id: profile.id,
                user_email: profile.emails[0].value,
            });
            user.save((err) => {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        } else {
            return done(null, user);
        }
    });
}));

// Function to generate JWT token
function generateToken(user) {
    const payload = {
        userId: user._id,
        email: user.email,
        // Add other user data as needed
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

module.exports = {
    passport,
    generateToken
};
