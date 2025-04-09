import { GetIconByKey } from "../../icons.jsx";
import PageHeading from "../PageHeading/PageHeading.jsx";
import "./MyLinks.css";

function MyLinks() {
    const LinkIcon = GetIconByKey("Link");
    return (
        <>
            <PageHeading Title="My Links" Icon={LinkIcon}>
                Manage all your active links in one place. Extend link expiry or modify link action quickly and easily.
            </PageHeading>
            <hr />
        </>
    );
}

export default MyLinks;
