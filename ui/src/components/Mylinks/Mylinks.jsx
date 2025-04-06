import { LinkIcon } from "../../icons.jsx";
import "./MyLinks.css";

function MyLinks() {
    return (
        <div className="content-head">
            <div className="section">
                <div className="section-heading">
                    <LinkIcon className="svg-icon" />&nbsp;
                    <span className="section-heading-title">My Links</span>
                </div>
                <p className="section-description">
                    Easily manage all your links in one place and customize properties like expiry date, target URL, action type, and more to suit your needs.
                </p>
            </div>
            <hr />
        </div>
    );
}

export default MyLinks;
