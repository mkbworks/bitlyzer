import "./RegisterLink.css";

function RegisterLink() {
    return (
        <div className="register-link">
            <div id="registerLinkHeading">
                <h3>Register Link</h3>
                <p>Create a new shortened link which redirects to or masks the given long URL, as per user preference.</p>
            </div>
            <form className="form">
                <div className="form-control">
                    <label id="TargetLabel">Target</label>
                    <input type="text" name="Target" className="form-input" />
                </div>
                <div className="form-control">
                    <label id="ActionLabel">Action</label>
                    <select className="form-select" name="Action">
                        <option value="redirect">Redirect</option>
                        <option value="mask">Mask</option>
                    </select>
                </div>
                <div className="form-control">
                    <label id="AliasLabel">Alias</label>
                    <input type="text" name="Alias" className="form-input" />
                </div>
                <div className="form-control">
                    <label id="ExpiryLabel">Expiry</label>
                    <input type="number" name="Expiry" className="form-number" />
                </div>
            </form>
        </div>
    );
}

export default RegisterLink;