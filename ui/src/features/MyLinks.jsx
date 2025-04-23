import PageHeading from "../components/PageHeading/PageHeading.jsx";
import { PageContent } from "./features.styles.js";

function MyLinks() {
    return (
        <PageContent>
            <PageHeading Title="My Links" ImagePath="/images/MyLinks.png">
                Manage all your active links in one place. Extend link expiry or modify link action quickly and easily.
            </PageHeading>
            <hr />
        </PageContent>
    );
}

export default MyLinks;
