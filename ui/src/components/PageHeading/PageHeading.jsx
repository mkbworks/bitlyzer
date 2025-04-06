import "./PageHeading.css";

function PageHeading({ Title, Icon, children }) {
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
