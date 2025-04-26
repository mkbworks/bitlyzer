import PageHeading from "../components/PageHeading/PageHeading.jsx";
import Modal from "../components/Modal/Modal.jsx";
import { PageContent, MyLinksContainer } from "./features.styles.js";
import useModal from "../hooks/useModal.jsx";
import { HzLine } from "../styles/global.styles.js";

function MyLinks() {
    const { Alert, ShowErrorAlert, HideAlert } = useModal();
    let modalData = {
        Type: Alert.type,
        Message: Alert.message,
        Code: Alert.data
    };
    return (
        <PageContent>
            <PageHeading Title="My Links" ImagePath="/images/MyLinks.png">
                Manage all your active links in one place. Extend link expiry or modify link action quickly and easily.
            </PageHeading>
            <HzLine />
            <MyLinksContainer>
                <Modal IsOpen={Alert.isOpen} onClose={HideAlert} Data={modalData}></Modal>
                <button type="button" onClick={() => ShowErrorAlert("Error message", "Some data")}>Click me to open modal</button>
            </MyLinksContainer>
        </PageContent>
    );
}

export default MyLinks;
