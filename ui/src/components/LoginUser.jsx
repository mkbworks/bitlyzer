import { useState } from "react";
import PageHeading from "./PageHeading/PageHeading.jsx";
import * as validation from "../validation.js";

function LoginUser() {
    const [user, setUser] = useState({
        UserEmail: '',
        UserKey: ''
    });

    const [touched, setIsTouched] = useState({
        UserEmail: false,
        UserKey: false
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("User login details: ", user);
    };

    const handleBlur = (event) => {
        let { name } = event.target;
        setIsTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    let validityState = {
        UserEmail: validation.isValidEmail(user.UserEmail),
        UserKey: user.UserKey.trim() !== ""
    };

    return (
        <>
            <PageHeading Title="User Login" IconKey="login">
                 Use your registered email address along with your access key to authenticate your account. Once logged in, you will gain access to all available functionalities.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="UserEmail" >Enter your email</label>
                    <input type="text" id="UserEmail" name="UserEmail" className="form-input" placeholder="User's email address" value={user.UserEmail} onBlur={handleBlur} onChange={handleChange} />
                    {touched.UserEmail && !validityState.UserEmail && <p className="form-control-error">Please enter a valid email address!</p>}
                </div>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="UserKey" >Enter your access key</label>
                    <input type="password" id="UserKey" name="UserKey" className="form-input" placeholder="User's access key" value={user.UserKey} onBlur={handleBlur} onChange={handleChange} />
                    {touched.UserKey && !validityState.UserKey && <p className="form-control-error">Please enter a valid access key!</p>}
                </div>
                <div className="form-control">
                    <button type="submit" className="btn-submit" disabled={!validityState.UserEmail || !validityState.UserKey}>Login</button>
                </div>
            </form>
        </>
    );
}

export default LoginUser;
