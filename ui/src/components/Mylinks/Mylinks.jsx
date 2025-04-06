import { LinkIcon } from "../../icons.jsx";
import PageHeading from "../PageHeading/PageHeading.jsx";
import "./MyLinks.css";

function MyLinks() {
    return (
        <>
            <PageHeading Title="My Links" Icon={LinkIcon}>
                Easily manage all your links in one place and customize properties like expiry date, target URL, action type, and more to suit your needs.
            </PageHeading>
            <hr />
        </>
    );
}

export default MyLinks;
