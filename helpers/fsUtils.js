// Import necessary modules
const fs = require('fs');
const util = require('util');

// Define a promisified version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Define a function to write content to a file
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

// Define a function to read and append content to a JSON file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err); // Log an error if reading the file fails
        } else {
            const parsedData = JSON.parse(data); // Parse existing JSON data from the file
            parsedData.push(content); // Append the new content to the existing data
            writeToFile(file, parsedData); // Write the appended data back to the file
        }
    });
};

// Export the functions for use in other parts of the application
module.exports = { readFromFile, writeToFile, readAndAppend };