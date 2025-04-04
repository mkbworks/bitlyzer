import "./RegisterLink.css";

function RegisterLink() {
    return (
        <div className="register-link">
            <div id="registerLinkHeading">
                <h3>Shorten URL</h3>
                <p>Create a new shortened link which redirects to or masks the given long URL, as per user preference.</p>
            </div>
            <form className="form">
                <div className="form-control">
                    <label id="TargetLabel">Paste your long  URL here!</label>
                    <input type="text" name="Target" className="form-input" />
                </div>
                <div className="form-control">
                    <label id="AliasLabel">(Optional) Define a custom short URL!</label>
                    <input type="text" name="Alias" className="form-input" />
                </div>
                <div className="form-control">
                    <label id="ActionLabel">What action is to be taken when URL is requested?</label>
                    <select className="form-select" name="Action">
                        <option value="redirect">Redirect</option>
                        <option value="mask">Mask</option>
                    </select>
                </div>
                <div className="form-control">
                    <label id="ExpiryLabel">How long should the URL be valid?</label>
                    <input type="number" name="Expiry" className="form-number" />
                </div>
            </form>
        </div>
    );
}

export default RegisterLink;