import crypto from "crypto";

/**
 * Returns the current date and time as an ISO string.
 * @returns {string} ISO string representation of today's date and time.
 */
const Today = () => {
    let CurrentDate = new Date(Date.now());
    return CurrentDate.toISOString();
};

/**
 * Generates a random string of given length and returns the generated string.
 * @param {number} length number of characters to be generated in the random string.
 * @returns {string} random string generated.
 */
const GenerateRandom = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

/**
 * Validates the given email to see if it conforms to the standard format.
 * @param {string} email email address to be validated.
 * @returns {boolean} "true" if the email is valid and "false" if it is not.
 */
const ValidateEmail = (email) => {
    const emailPattern = /^[a-z][a-z0-9\-\._]+[a-z0-9]@[a-z][a-z0-9\.\-]+[a-z0-9]$/i;
    email = email.trim();
    return emailPattern.test(email);
};

export { Today, GenerateRandom, ValidateEmail };
