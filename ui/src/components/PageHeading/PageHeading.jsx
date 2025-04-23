import { PageTitle, PageLogo } from "./PageHeading.styles.js";
import "./PageHeading.css";

function PageHeading({ Title, ImagePath, children }) {
    return (
        <div className="page-heading">
            <div className="page-title-section">
                <PageLogo src={ImagePath} alt={`Logo for ${Title}`} />
                <PageTitle>{Title}</PageTitle>
            </div>
            <p className="page-description">
                {children}
            </p>
        </div>
    );
}

export default PageHeading;
