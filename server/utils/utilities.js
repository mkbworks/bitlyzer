import crypto from "crypto";

const Today = () => {
    let CurrentDate = new Date(Date.now());
    return CurrentDate.toISOString();
};

const GenerateRandom = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

export { Today, GenerateRandom };