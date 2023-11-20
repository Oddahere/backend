// Import required modules
const express = require("express");
const router = express.Router();
const User = require("./models/user.model");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// Define a POST route for the '/login' endpoint
router.post("/login", async (req, res) => {
    // Destructure the username and password from the request body
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username: username });

        if (user) {
            // Compare the received plaintext password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password); // Assuming the hashed password is stored in the 'password' field

            if (isPasswordValid) {
                // If the password is valid, send a successful response with user data
                res.status(200).json({
                    isAllowed: true,
                    name: user.name,
                    role: user.role, // Include the role in the response
                });
            } else {
                // If the password is invalid, send an unauthorized response
                res.status(401).json({ isAllowed: false, message: "Invalid username or password" });
            }
        } else {
            // If the user is not found, send an unauthorized response
            res.status(401).json({ isAllowed: false, message: "Invalid username or password" });
        }
    } catch (error) {
        // If there's an error during the login process, send a server error response
        res.status(500).json({ message: "Error during login" });
    }
});

// Export the router to be used in other modules
module.exports = router;
