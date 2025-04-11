import { useState } from "react";
import PageHeading from "../PageHeading/PageHeading.jsx";
import * as validation from "../../validation.js";
import "./RegisterUser.css";


function RegisterUser() {
    const [user, setUser] = useState({
        FullName: '',
        UserEmail: ''
    });
    const [isTouched, setIsTouched] = useState({
        FullName: false,
        UserEmail: false
    });

    const handleChange = (event) => {
        let { name, value } = event.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (event) => {
        let { name } = event.target;
        setIsTouched(prev => ({
            ...prev,
            [name]: true
        }));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(`User details:`, user);
    };

    let fieldValidity = {
        FullName: validation.isValidName(user.FullName),
        UserEmail: validation.isValidEmail(user.UserEmail)
    };

    return (
        <>
            <PageHeading Title="User Registration" IconKey="NewUser">
                Sign up as a new user to start using the URL Shortener services. After registration, you'll receive an Access key for authentication purposes.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleFormSubmit}>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="FullName" >Enter your full name</label>
                    <input type="text" id="FullName" name="FullName" className="form-input" placeholder="User's full name" value={user.FullName} onChange={handleChange} onBlur={handleBlur} />
                    {isTouched.FullName && !fieldValidity.FullName && <p className="form-control-error">Please enter a valid display name!</p>}
                </div>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="UserEmail" >Enter your email address</label>
                    <input type="text" id="UserEmail" name="UserEmail" className="form-input" placeholder="User's email address" value={user.UserEmail} onChange={handleChange} onBlur={handleBlur} />
                    {isTouched.UserEmail && !fieldValidity.UserEmail && <p className="form-control-error">Please enter a valid email address!</p>}
                </div>
                <div className="form-control">
                    <button type="submit" className="btn-submit" disabled={!fieldValidity.FullName || !fieldValidity.UserEmail}>Register</button>
                </div>
            </form>
        </>
    );
}

export default RegisterUser;
