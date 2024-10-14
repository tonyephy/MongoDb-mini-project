// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

// Initialize the Express app
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));

// Serve static files
app.use(express.static('public'));

// Route for serving the sign-in page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for sign up
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save();
        req.session.userId = newUser._id; // Log in the user after signup
        res.redirect('/home'); // Redirect to homepage after signup
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
});

// Route for sign in
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        // Check the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).send('Invalid username or password');
        }

        // Log the user in
        req.session.userId = user._id;
        res.redirect('/home'); // Redirect to homepage after successful login
    } catch (error) {
        res.status(500).send('Error during login: ' + error.message);
    }
});

// Route for homepage
app.get('/home', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/'); // Redirect to login if not authenticated
    }

    try {
        const user = await User.findById(req.session.userId);
        res.sendFile(path.join(__dirname, 'public', 'home.html')); // Serve the home page
    } catch (error) {
        res.status(500).send('Error loading home page: ' + error.message);
    }
});

// Route for updating user details
app.post('/update', async (req, res) => {
    const { username, email } = req.body;

    if (!req.session.userId) {
        return res.status(403).send('Unauthorized'); // User must be logged in to update
    }

    try {
        await User.findByIdAndUpdate(req.session.userId, { username, email });
        res.redirect('/home'); // Redirect to homepage after update
    } catch (error) {
        res.status(500).send('Error updating user details: ' + error.message);
    }
});

// Route for logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/home'); // If there's an error, redirect to home
        }
        res.redirect('/'); // Redirect to login after logout
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
