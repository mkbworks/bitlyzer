const isValidEmail = (email) => {
    const emailPattern = /^[a-z][a-z0-9\-\._]+[a-z0-9]@[a-z][a-z0-9\.\-]+[a-z0-9]$/ig;
    email = email.trim();
    return emailPattern.test(email);
};

const isValidName = (name) => {
    const namePattern = /^[a-zA-Z][a-zA-Z\s]+$/g;
    name = name.trim();
    return namePattern.test(name);
};

export { isValidEmail, isValidName };
