import { GetIconByKey } from "../../icons.jsx";
import PageHeading from "../PageHeading/PageHeading.jsx";

import "./LoginUser.css";

function LoginUser() {
    const LoginIcon = GetIconByKey("login");
    return (
        <>
            <PageHeading Title="User Login" Icon={LoginIcon}>
                User Login
            </PageHeading>
            <hr />
            <form className="form">
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="UserEmail" >Enter your email</label>
                    <input type="text" id="UserEmail" className="form-input" placeholder="User's email address" />
                </div>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="UserKey" >Enter your access key</label>
                    <input type="text" id="UserKey" className="form-input" placeholder="User's access key" />
                </div>
                <div className="form-control">
                    <button type="button" className="btn-submit">Login</button>
                </div>
            </form>
        </>
    );
}

export default LoginUser;
