import { GetIconByKey } from "../../icons.jsx";

import "./PageHeading.css";

function PageHeading({ Title, IconKey, children }) {
    const Icon = GetIconByKey(IconKey);
    return (
        <div className="page-heading">
            <div className="page-title-section">
                <Icon className="svg-icon" />&nbsp;
                <span className="page-title">{Title}</span>
            </div>
            <p className="page-description">
                {children}
            </p>
        </div>
    );
}

export default PageHeading;
