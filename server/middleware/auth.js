const authenticate = async (req, res, next) => {
    const InApiKey = req.get("x-apikey");
    if(!InApiKey) {
        try {
            let isValid = await req.app.locals.bal.ValidateUser(InApiKey);
            if(isValid) {
                next();
            } else {
                res.status(401);
                res.set("WWW-Authenticate", "x-apikey");
                res.end();
            }
        } catch(err) {
            console.error(`Error occurred while authenticating user: ${err}`);
            res.status(500);
            res.end();
        }
    } else {
        res.status(401);
        res.set("WWW-Authenticate", "x-apikey");
        res.end();
    }
};

export default authenticate;