import { CompressIcon } from "../../icons.jsx";
import PageHeading from "../PageHeading/PageHeading.jsx";

import "./ShortenUrl.css";

function ShortenUrl() {
    return (
        <>
            <PageHeading Title="Shorten Url" Icon={CompressIcon}>
                Easily convert long, cluttered URLs into clean, shareable short links with our simple URL shortener tool. Whether you're managing links for social media, marketing campaigns, or personal use, this page lets you create a custom or auto-generated short URL in seconds. Just paste your long URL into the form, customize the alias if you'd like, and click generate. It's quick, reliable, and perfect for making your links easier to share, track, and manage.
            </PageHeading>
            <hr />
            <form className="form">
                <div className="form-control">
                    <label id="TargetLabel">Paste your long  URL here!</label>
                    <input type="text" name="Target" className="form-input" placeholder="Long URL to be masked or redirected to" />
                </div>
                <div className="form-control">
                    <label id="AliasLabel">(Optional) Define a custom short URL!</label>
                    <input type="text" name="Alias" className="form-input" placeholder="Enter a short URL of your own" />
                </div>
                <div className="form-control">
                    <label id="ActionLabel">What action is to be taken when URL is requested?</label>
                    <select className="form-select" name="Action">
                        <option>Select one</option>
                        <option value="redirect">Redirect</option>
                        <option value="mask">Mask</option>
                    </select>
                </div>
                <div className="form-control">
                    <label id="ExpiryLabel">How long should the URL be valid?</label>
                    <input type="number" name="Expiry" className="form-number" placeholder="Number of days till expiry" />
                </div>
            </form>
        </>
    );
}

export default ShortenUrl;
