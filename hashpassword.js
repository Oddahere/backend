// Import the required bcrypt library
const bcrypt = require('bcrypt');

// Define an async function to hash a given password
async function hashPassword(password) {
    // Set the number of salt rounds for bcrypt
    const saltRounds = 10;

    // Hash the provided password using bcrypt with the specified salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Log the hashed password to the console
    console.log(`Hashed password: ${hashedPassword}`);
}

// Call the hashPassword function with a sample password 
hashPassword("(password goes here)");
