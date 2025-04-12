import "./PageHeading.css";

function PageHeading({ Title, ImagePath, children }) {
    return (
        <div className="page-heading">
            <div className="page-title-section">
                <img src={ImagePath} className="page-logo" alt={`Logo for ${Title}`} />
                <p className="page-title">{Title}</p>
            </div>
            <p className="page-description">
                {children}
            </p>
        </div>
    );
}

export default PageHeading;
