import crypto from "crypto";

const GenerateApiKey = (length = 32) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/`~";
    return Array.from(crypto.randomBytes(length)).map(byte => charset[byte % charset.length]).join('');
};

const Today = () => {
    let CurrentDate = new Date(Date.now());
    return CurrentDate.toISOString();
};

export { GenerateApiKey, Today };